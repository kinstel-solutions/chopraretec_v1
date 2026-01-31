
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = 'original-assets/New-photos-2';
const DEST_DIR = 'public/new-pics-2';

async function convertImages() {
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  try {
    const files = fs.readdirSync(SOURCE_DIR);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const inputPath = path.join(SOURCE_DIR, file);
        const outputFilename = path.basename(file, ext) + '.webp';
        const outputPath = path.join(DEST_DIR, outputFilename);

        console.log(`Converting ${file} to ${outputFilename}...`);
        
        try {
            await sharp(inputPath)
              .webp({ quality: 80 })
              .toFile(outputPath);
            console.log(`Saved to ${outputPath}`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
      }
    }
    console.log('Conversion complete!');
  } catch (err) {
    console.error('Error reading source directory:', err);
  }
}

convertImages();
