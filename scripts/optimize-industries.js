const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../original-assets/industries-imgs');
const DEST_DIR = path.join(__dirname, '../public/images/industries');

// Configuration
const CONFIG = {
  quality: 80,
  width: 800, // Reasonable width for card images, or we can keep original if they are not too huge. Dictionary earlier showed ~8MB pngs, so resizing is good.
              // The industries component shows them in 300x400 cards roughly, but they are also used elsewhere maybe?
              // The user said "optimize industries images for webp like done previously".
              // Previous optimization (optimize-assets.js) used [1280, 640] for hero, [1200, 800, 400] for products.
              // Let's generate a single good resolution for now, maybe 800px width is enough for the cards, or 1200px to be safe.
              // The cards are 300px wide but scale up on hover. 800w seems safe.
  format: 'webp'
};

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

async function processImages() {
  console.log('Processing industries images...');
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    return;
  }

  const files = fs.readdirSync(SOURCE_DIR);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(SOURCE_DIR, file);
      const outputFilename = path.parse(file).name + '.webp';
      const outputPath = path.join(DEST_DIR, outputFilename);

      try {
        const stats = fs.statSync(inputPath);
        console.log(`Optimizing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

        await sharp(inputPath)
          .resize(800, null, { // Resize to width 800, maintain aspect ratio
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: CONFIG.quality })
          .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        console.log(`  -> Saved to ${outputFilename} (${(newStats.size / 1024).toFixed(2)} KB)`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
  console.log('Done.');
}

processImages();
