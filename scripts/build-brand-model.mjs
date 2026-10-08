import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DOMParser } from "@xmldom/xmldom";
import { ExtrudeGeometry, Box2, Vector2 } from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";

class SourceParser extends DOMParser {
  parseFromString(...args) {
    const document = super.parseFromString(...args);
    // xmldom implements XML traversal, not CSS selectors. SVGLoader's single
    // document selector only enumerates these tags (the source has no gradients).
    document.querySelectorAll = selector => selector.split(",").flatMap(tag => {
      if (!/^[a-zA-Z]+$/.test(tag.trim())) throw new Error("Unsupported source selector");
      return Array.from(document.getElementsByTagName(tag.trim()));
    });
    return document;
  }
}
globalThis.DOMParser = SourceParser;
export const depth = 34;

export function containsPoint(points, point) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if ((a.y > point.y) !== (b.y > point.y) &&
      point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

// SVGLoader does not implement SVG masks. Parse the official outer path and
// its translated subtractive mask separately, then attach the hole to P.
export function buildBrandModel(svg) {
  const xml = new DOMParser().parseFromString(svg, "image/svg+xml");
  const allPaths = [...Array.from(xml.getElementsByTagName("path"))];
  const outer = allPaths.find(node => node.parentNode.nodeName === "svg");
  const cutout = allPaths.find(node => node.parentNode.nodeName === "mask");
  if (!outer || !cutout) throw new Error("Missing official outer path or p-hole mask");
  const loader = new SVGLoader();
  const wrap = node => '<svg xmlns="http://www.w3.org/2000/svg">' + node + "</svg>";
  const outline = outer.cloneNode(true);
  outline.removeAttribute("mask");
  const shapes = loader.parse(wrap(outline.toString())).paths.flatMap(path => path.toShapes());
  const holes = loader.parse(wrap(cutout.toString())).paths.flatMap(path => path.toShapes());
  for (const hole of holes) {
    const center = new Box2().setFromPoints(hole.getPoints(12)).getCenter(new Vector2());
    const owner = shapes.find(shape => containsPoint(shape.getPoints(12), center));
    if (!owner) throw new Error("Official mask falls outside the logo");
    owner.holes.push(hole);
  }
  if (shapes.length !== 2 || shapes.filter(shape => shape.holes.length === 1).length !== 1)
    throw new Error("Expected both P and C, with one P counter");
  const bounds = new Box2().setFromPoints(shapes.flatMap(shape => shape.getPoints(16)));
  const center = bounds.getCenter(new Vector2());
  const scale = 2.4 / (bounds.max.y - bounds.min.y);
  const raw = new ExtrudeGeometry(shapes, { depth, curveSegments: 8, steps: 1, bevelEnabled: false });
  raw.deleteAttribute("uv");
  raw.rotateX(Math.PI);
  raw.translate(-center.x, center.y, depth / 2);
  raw.scale(scale, scale, scale);
  const geometry = mergeVertices(raw);
  raw.dispose();
  return { shapes, bounds, geometry, scale };
}

function curvePath(shape) {
  let d = "";
  for (const curve of shape.curves) {
    const start = curve.getPoint(0);
    if (!d) d = `M${start.x} ${start.y}`;
    if (curve.isLineCurve) d += `L${curve.v2.x} ${curve.v2.y}`;
    else if (curve.isCubicBezierCurve)
      d += `C${curve.v1.x} ${curve.v1.y} ${curve.v2.x} ${curve.v2.y} ${curve.v3.x} ${curve.v3.y}`;
    else if (curve.isQuadraticBezierCurve)
      d += `Q${curve.v1.x} ${curve.v1.y} ${curve.v2.x} ${curve.v2.y}`;
    else throw new Error("Unhandled official curve type");
  }
  return d + "Z";
}

export function generate(root) {
  const svg = fs.readFileSync(path.join(root, "public/img/logo.svg"), "utf8");
  const { shapes, geometry, bounds } = buildBrandModel(svg);
  const positions = geometry.getAttribute("position").array;
  const normals = geometry.getAttribute("normal").array;
  const index = new Uint32Array(geometry.index.array);
  const buffer = Buffer.concat([
    Buffer.from(positions.buffer, positions.byteOffset, positions.byteLength),
    Buffer.from(normals.buffer, normals.byteOffset, normals.byteLength),
    Buffer.from(index.buffer, index.byteOffset, index.byteLength),
  ]);
  const metadata = {
    source: "/img/logo.svg", sha256: crypto.createHash("sha256").update(svg).digest("hex"),
    pieces: shapes.length, holes: shapes.map(shape => shape.holes.length), depth,
    vertices: positions.length / 3, indices: index.length,
    groups: geometry.groups, bytes: buffer.length,
  };
  fs.mkdirSync(path.join(root, "public/img/brand"), { recursive: true });
  fs.writeFileSync(path.join(root, "public/img/brand/pc-model.bin"), buffer);
  fs.writeFileSync(path.join(root, "src/components/home/brand-model.json"), JSON.stringify(metadata));
  // Exact cubic curves, including mask translation, normalized without SVG masks.
  const width = bounds.max.x - bounds.min.x, height = bounds.max.y - bounds.min.y;
  const fallback = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${bounds.min.x} ${bounds.min.y} ${width} ${height}">${shapes.map(shape => `<path fill="#fff" fill-rule="evenodd" d="${curvePath(shape)}${shape.holes.map(curvePath).join("")}"/>`).join("")}</svg>`;
  fs.writeFileSync(path.join(root, "public/img/pc-mark.svg"), fallback);
  geometry.dispose();
  return metadata;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  console.log(JSON.stringify(generate(path.resolve(fileURLToPath(new URL("..", import.meta.url))))));
