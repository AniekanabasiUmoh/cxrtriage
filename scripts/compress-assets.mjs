/**
 * Dev-only asset compression. Reads selected illustrations from the design
 * handoff and writes width-capped WebP into public/assets/ for the app to use.
 *
 * Run once locally:  node scripts/compress-assets.mjs
 * (Not part of the Vercel build — the committed WebPs in public/ are shipped.)
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "africxr-design-handoff", "assets");
const OUT = path.join(ROOT, "public", "assets");

// [source PNG, output name, max width]
const JOBS = [
  ["homepage/batch-04/04-rural-clinic-illustration.png", "rural-clinic.webp", 560],
  ["upload-ui/batch-02/04-clinic-footer-illustration.png", "clinic-footer.webp", 720],
  ["homepage/batch-01/01-xray-collage-result-card.png", "xray-collage.webp", 560],
  ["upload-ui/batch-02/02-xray-polaroid-preview.png", "xray-polaroid.webp", 480],
  // Section infographics (baked text — used as-is per design)
  ["homepage/batch-02/03-triage-flow-infographic.png", "triage-flow.webp", 1400],
  ["homepage/batch-02/04-model-progression-cnn-mobilenet-medsiglip.png", "model-progression.webp", 1400],
  ["homepage/batch-02/02-cta-banner-early-insight-human-judgment.png", "cta-banner.webp", 1400],
  // Atmosphere assets
  ["upload-ui/batch-02/01-paper-background-texture.png", "paper-texture.webp", 900],
  ["homepage/batch-01/03-brush-disclaimer-banner.png", "brush-disclaimer.webp", 700],
  ["upload-ui/batch-04/03-non-diagnostic-banner.png", "non-diagnostic-banner.webp", 1000],
];

await mkdir(OUT, { recursive: true });

for (const [rel, outName, width] of JOBS) {
  const inPath = path.join(SRC, rel);
  const outPath = path.join(OUT, outName);
  try {
    const info = await sharp(inPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outPath);
    const kb = (info.size / 1024).toFixed(0);
    console.log(`✓ ${outName.padEnd(22)} ${kb} KB  (${info.width}x${info.height})`);
  } catch (err) {
    console.error(`✗ ${outName}: ${err.message}`);
  }
}

console.log("\nDone. Assets in public/assets/");
