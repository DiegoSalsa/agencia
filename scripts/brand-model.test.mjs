import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { buildBrandModel, depth } from "./build-brand-model.mjs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const official = fs.readFileSync(new URL("public/img/logo.svg", root), "utf8");
const model = buildBrandModel(official);
test("P and C remain independent contours; P retains the official masked counter", () => {
  assert.equal(model.shapes.length, 2);
  assert.deepEqual(model.shapes.map(shape => shape.holes.length).sort(), [0, 1]);
});
test("frontal triangulation keeps the P hole and C opening empty", () => {
  const position = model.geometry.getAttribute("position");
  const index = model.geometry.index;
  const cx = (model.bounds.max.x + model.bounds.min.x) / 2;
  const cy = (model.bounds.max.y + model.bounds.min.y) / 2;
  function covered(x, y) {
    const px = (x - cx) * model.scale, py = (cy - y) * model.scale;
    for (let i = 0; i < index.count; i += 3) {
      const ids = [index.getX(i), index.getX(i + 1), index.getX(i + 2)];
      if (ids.some(id => Math.abs(position.getZ(id) - depth * model.scale / 2) > 1e-5)) continue;
      const vertices = ids.map(id => [position.getX(id), position.getY(id)]);
      const cross = (a, b) => (b[0] - a[0]) * (py - a[1]) - (b[1] - a[1]) * (px - a[0]);
      const signs = vertices.map((a, j) => cross(a, vertices[(j + 1) % 3]));
      if (signs.every(value => value >= -1e-7) || signs.every(value => value <= 1e-7)) return true;
    }
    return false;
  }
  // Fixed points in the official branding catch a missing C, filled P counter,
  // or accidental bridging across C's open right side.
  assert.equal(covered(111, 153), true, "P left stroke");
  assert.equal(covered(334, 153), true, "C upper right stroke");
  assert.equal(covered(334, 245), true, "C lower right stroke");
  assert.equal(covered(159, 150), false, "P counter");
  assert.equal(covered(334, 199), false, "C open side");
});
test("static fallback preserves both exact source curves and holes", () => {
  const svg = fs.readFileSync(new URL("public/img/pc-mark.svg", root), "utf8");
  const fallback = new SVGLoader().parse(svg).paths.flatMap(path => path.toShapes());
  assert.equal(fallback.length, 2);
  const signature = shape => [...shape.getPoints(16), ...shape.holes.flatMap(hole => hole.getPoints(16))]
    .map(point => [point.x, point.y].map(value => value.toFixed(7)).join(",")).sort();
  const original = model.shapes.map(signature).sort((a,b) => a.length - b.length);
  const normalized = fallback.map(signature).sort((a,b) => a.length - b.length);
  assert.deepEqual(normalized, original);
});
test("baked model matches the current official source and binary buffer", () => {
  const metadata = JSON.parse(fs.readFileSync(new URL("src/components/home/brand-model.json", root)));
  const buffer = fs.readFileSync(new URL("public/img/brand/pc-model.bin", root));
  assert.equal(metadata.sha256, crypto.createHash("sha256").update(official).digest("hex"));
  assert.equal(buffer.length, metadata.bytes);
  assert.equal(metadata.bytes, metadata.vertices * 24 + metadata.indices * 4);
  assert.ok(metadata.bytes < 250_000);
});
test.after(() => model.geometry.dispose());
