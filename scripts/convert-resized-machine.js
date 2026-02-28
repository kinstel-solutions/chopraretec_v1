const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const INPUT_FILE = path.join(
  ROOT_DIR,
  "original-assets/cam/QC-machine-ODR_resize.png",
);
const OUTPUT_DIR = path.join(ROOT_DIR, "public/cam-kinstel");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "QC-machine-ODR_resize.webp");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function convertImage() {
  try {
    console.log(`Processing: ${INPUT_FILE}`);
    await sharp(INPUT_FILE).webp({ quality: 85 }).toFile(OUTPUT_FILE);
    console.log(`Optimized and saved to: ${OUTPUT_FILE}`);
  } catch (err) {
    console.error(`Error processing image:`, err);
  }
}

convertImage();
