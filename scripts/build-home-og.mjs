import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Use the same exact PC contours as the static and 3D Home branding.
const logo = await sharp(path.join(root, "public/img/pc-mark.svg"))
  .resize({ width: 350, height: 390, fit: "inside" }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#0c0b0e" } })
  .composite([{ input: logo, gravity: "centre" }])
  .png().toFile(path.join(root, "public/img/og-image.png"));
console.log("Home sharing image: 1200 × 630, exact official PC silhouette.");
