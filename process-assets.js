const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_SRC = path.join(__dirname, 'original-assets/latest-cr-images');
const CERTS_SRC = path.join(__dirname, 'original-assets/certificates');
const DEST_BASE = path.join(__dirname, 'public/real-assets');
const IMAGES_DEST = DEST_BASE;
const CERTS_DEST = path.join(DEST_BASE, 'certs');

// Ensure destination directories exist
if (!fs.existsSync(DEST_BASE)) fs.mkdirSync(DEST_BASE, { recursive: true });
if (!fs.existsSync(CERTS_DEST)) fs.mkdirSync(CERTS_DEST, { recursive: true });

async function processImages() {
  console.log('Processing images...');
  const files = fs.readdirSync(IMAGES_SRC);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(IMAGES_SRC, file);
      const outputFilename = path.parse(file).name + '.webp';
      const outputPath = path.join(IMAGES_DEST, outputFilename);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Converted: ${file} -> ${outputFilename}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

async function processCerts() {
  console.log('Processing certificates...');
  const files = fs.readdirSync(CERTS_SRC);
  
  for (const file of files) {
    const inputPath = path.join(CERTS_SRC, file);
    const outputPath = path.join(CERTS_DEST, file);
    
    // For PDFs and other cert files, we just copy them for now
    // as optimizing PDFs requires different tools (like ghostscript)
    // which might not be available or safe to run.
    fs.copyFileSync(inputPath, outputPath);
    console.log(`Copied: ${file}`);
  }
}

async function main() {
  await processImages();
  await processCerts();
  console.log('Done!');
}

main();
