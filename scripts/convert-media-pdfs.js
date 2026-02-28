const path = require("path");
const fs = require("fs");
const pdf = require("pdf-poppler");
const sharp = require("sharp");

const ROOT_DIR = path.join(__dirname, "..");
const INPUT_DIR = path.join(
  ROOT_DIR,
  "original-assets/certificates/new-certs/CRRPL Media Coverage Files",
);
const OUTPUT_DIR = path.join(ROOT_DIR, "public/media-coverage");
const TMP_DIR = path.join(ROOT_DIR, "tmp/pdf-images");

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

async function convertPdfs() {
  try {
    const files = fs
      .readdirSync(INPUT_DIR)
      .filter((f) => f.toLowerCase().endsWith(".pdf"));
    console.log(`Found ${files.length} PDF files in ${INPUT_DIR}`);

    for (const file of files) {
      console.log(`\nProcessing: ${file}`);
      const inputPath = path.join(INPUT_DIR, file);
      const baseName = path.parse(file).name;

      const opts = {
        format: "jpeg",
        out_dir: TMP_DIR,
        out_prefix: baseName,
        page: 1,
      };

      try {
        // pdf-poppler generates files with specific names: prefix-page_number.format
        await pdf.info(inputPath); // just to verify it's a valid pdf
        await pdf.convert(inputPath, opts);

        console.log(`Converted ${file} to JPEG.`);

        // Find the generated image file (could be -1.jpg or -01.jpg etc)
        const tmpFiles = fs.readdirSync(TMP_DIR);
        const generatedImage = tmpFiles.find(
          (f) => f.startsWith(baseName) && f.endsWith(".jpg"),
        );

        if (generatedImage) {
          const imagePath = path.join(TMP_DIR, generatedImage);
          const finalOutputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

          await sharp(imagePath).webp({ quality: 85 }).toFile(finalOutputPath);

          console.log(`Optimized and saved to: ${finalOutputPath}`);

          // clean up tmp file
          fs.unlinkSync(imagePath);
        } else {
          console.error(`Could not find generated image for ${file}`);
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  } catch (error) {
    console.error("Fatal error: ", error);
  }
}

convertPdfs().then(() => {
  console.log("\nFinished PDF to Image conversion.");
});
