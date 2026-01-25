const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ORIGINAL_ASSETS = path.join(__dirname, '..', 'original-assets');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Configuration for different image categories
const IMAGE_CONFIGS = {
  hero: {
    quality: 90,
    sizes: [1920, 1280, 640],
    format: 'webp'
  },
  product: {
    quality: 85,
    sizes: [1200, 800, 400],
    format: 'webp'
  },
  award: {
    quality: 100,
    sizes: null, // Keep original size
    format: 'png'
  },
  layer3d: {
    quality: 85,
    sizes: [1200],
    format: 'webp'
  }
};

// Create directory structure
const DIRS = [
  'images/hero',
  'images/products',
  'images/industries',
  'images/bonding-process',
  'images/facility',
  'images/awards',
  'images/3d-layers',
  'videos',
  'metadata'
];

function createDirectories() {
  console.log('Creating directory structure...');
  DIRS.forEach(dir => {
    const fullPath = path.join(PUBLIC_DIR, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`  ✓ Created ${dir}`);
    }
  });
}

async function optimizeImage(inputPath, outputDir, baseName, config) {
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;
  console.log(`\nProcessing: ${baseName}`);
  console.log(`  Original size: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);

  let totalSaved = 0;

  if (config.sizes) {
    // Generate multiple sizes
    for (const width of config.sizes) {
      const outputName = `${baseName}-${width}w.${config.format}`;
      const outputPath = path.join(outputDir, outputName);

      await sharp(inputPath)
        .resize(width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        [config.format]({ quality: config.quality })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSize = newStats.size;
      totalSaved += originalSize - newSize;
      console.log(`  ✓ ${width}w: ${(newSize / 1024 / 1024).toFixed(2)}MB`);
    }
  } else {
    // Keep original size
    const outputName = `${baseName}.${config.format}`;
    const outputPath = path.join(outputDir, outputName);

    if (config.format === 'png') {
      await sharp(inputPath)
        .png({ 
          quality: config.quality,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
    } else {
      await sharp(inputPath)
        [config.format]({ quality: config.quality })
        .toFile(outputPath);
    }

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    totalSaved = originalSize - newSize;
    console.log(`  ✓ Optimized: ${(newSize / 1024 / 1024).toFixed(2)}MB`);
  }

  const savings = ((totalSaved / originalSize) * 100).toFixed(1);
  console.log(`  💾 Saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB (${savings}%)`);
  
  return totalSaved;
}

function copyVideo(inputPath, outputDir, fileName) {
  const stats = fs.statSync(inputPath);
  const size = stats.size;
  console.log(`\nCopying video: ${fileName}`);
  console.log(`  Size: ${(size / 1024 / 1024).toFixed(2)}MB`);
  
  const outputPath = path.join(outputDir, fileName);
  fs.copyFileSync(inputPath, outputPath);
  console.log(`  ✓ Copied to videos/`);
}

async function processAllAssets() {
  console.log('🚀 Starting Asset Optimization\n');
  console.log('='.repeat(50));
  
  createDirectories();
  
  let totalSaved = 0;
  const videosDir = path.join(PUBLIC_DIR, 'videos');
  
  // Process hero background
  console.log('\n📸 HERO IMAGES');
  console.log('='.repeat(50));
  const heroBg = path.join(ORIGINAL_ASSETS, 'Dummy-Hero_BgImg.jpg');
  if (fs.existsSync(heroBg)) {
    totalSaved += await optimizeImage(
      heroBg,
      path.join(PUBLIC_DIR, 'images/hero'),
      'hero-bg',
      IMAGE_CONFIGS.hero
    );
  }
  
  // Process created-assets (products, industries, facility, bonding process)
  console.log('\n📦 PRODUCT & FACILITY IMAGES');
  console.log('='.repeat(50));
  const createdAssetsDir = path.join(ORIGINAL_ASSETS, 'created-assets');
  
  const productMappings = [
    { 
      pattern: /^Group-of-rubber-to-metal-components-v(\d+)\.png$/,
      outputDir: 'images/products',
      baseName: (match) => `rubber-metal-components-v${match[1]}`
    },
    { 
      pattern: /^rubber-to-metal-bonded-engine-mount-v(\d+)\.png$/,
      outputDir: 'images/products',
      baseName: (match) => `engine-mount-v${match[1]}`
    },
    { 
      pattern: /^custom-molded-rubber-grommet\.png$/,
      outputDir: 'images/products',
      baseName: () => 'rubber-grommet'
    },
    { 
      pattern: /^Rubber-to-Metal-Bonding-stage(\d+)\.png$/,
      outputDir: 'images/bonding-process',
      baseName: (match) => `bonding-stage${match[1]}`
    },
    { 
      pattern: /^industries-served-(advanced|basic)\.png$/,
      outputDir: 'images/industries',
      baseName: (match) => `industries-${match[1]}`
    },
    { 
      pattern: /^rubber-injection-molding-facility-(front|side)-view\.png$/,
      outputDir: 'images/facility',
      baseName: (match) => `facility-${match[1]}-view`
    }
  ];
  
  if (fs.existsSync(createdAssetsDir)) {
    const files = fs.readdirSync(createdAssetsDir);
    
    for (const file of files) {
      const filePath = path.join(createdAssetsDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile() && /\.(png|jpg|jpeg)$/i.test(file)) {
        let processed = false;
        
        for (const mapping of productMappings) {
          const match = file.match(mapping.pattern);
          if (match) {
            const outputDir = path.join(PUBLIC_DIR, mapping.outputDir);
            const baseName = mapping.baseName(match);
            totalSaved += await optimizeImage(
              filePath,
              outputDir,
              baseName,
              IMAGE_CONFIGS.product
            );
            processed = true;
            break;
          }
        }
        
        if (!processed) {
          console.log(`⚠️  Skipped: ${file} (no mapping found)`);
        }
      }
    }
  }
  
  // Process AI-generated image from assets folder
  console.log('\n🎨 AI-GENERATED ASSETS');
  console.log('='.repeat(50));
  const assetsDir = path.join(ORIGINAL_ASSETS, 'assets');
  const aiGenImage = path.join(assetsDir, 'AI-gen_Rubber-Metal.png');
  if (fs.existsSync(aiGenImage)) {
    totalSaved += await optimizeImage(
      aiGenImage,
      path.join(PUBLIC_DIR, 'images/products'),
      'rubber-metal-ai-gen',
      IMAGE_CONFIGS.product
    );
  }
  
  // Process 3D layers
  console.log('\n🎭 3D LAYER IMAGES');
  console.log('='.repeat(50));
  const layers3dDir = path.join(ORIGINAL_ASSETS, 'layers3d');
  if (fs.existsSync(layers3dDir)) {
    for (let i = 1; i <= 3; i++) {
      const layerPath = path.join(layers3dDir, `layer${i}.png`);
      if (fs.existsSync(layerPath)) {
        totalSaved += await optimizeImage(
          layerPath,
          path.join(PUBLIC_DIR, 'images/3d-layers'),
          `layer${i}`,
          IMAGE_CONFIGS.layer3d
        );
      }
    }
  }
  
  // Process award icons
  console.log('\n🏆 AWARD ICONS');
  console.log('='.repeat(50));
  const awardIconsDir = path.join(ORIGINAL_ASSETS, 'award-Icons');
  if (fs.existsSync(awardIconsDir)) {
    const awardFiles = fs.readdirSync(awardIconsDir);
    for (const file of awardFiles) {
      if (/\.(png|jpg|jpeg)$/i.test(file)) {
        const inputPath = path.join(awardIconsDir, file);
        const baseName = path.parse(file).name;
        totalSaved += await optimizeImage(
          inputPath,
          path.join(PUBLIC_DIR, 'images/awards'),
          baseName,
          IMAGE_CONFIGS.award
        );
      }
    }
  }
  
  // Copy videos
  console.log('\n🎬 VIDEOS');
  console.log('='.repeat(50));
  const videoMappings = [
    {
      source: path.join(createdAssetsDir, 'Industrial_Video_of_ready_Rubber_Components.mp4'),
      output: 'industrial-components.mp4'
    },
    {
      source: path.join(createdAssetsDir, 'Video_Ready_After_Seal_Release.mp4'),
      output: 'seal-release.mp4'
    },
    {
      source: path.join(createdAssetsDir, 'Video_rubber-molding-process—slow-motion.mp4'),
      output: 'molding-process.mp4'
    }
  ];
  
  for (const video of videoMappings) {
    if (fs.existsSync(video.source)) {
      copyVideo(video.source, videosDir, video.output);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('✅ OPTIMIZATION COMPLETE!');
  console.log('='.repeat(50));
  console.log(`💾 Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📁 Assets organized in: ${PUBLIC_DIR}`);
  console.log('\nNext steps:');
  console.log('  1. Run: npm run dev');
  console.log('  2. Check image quality in browser');
  console.log('  3. Update image references in components');
}

// Run the optimization
processAllAssets().catch(error => {
  console.error('❌ Error during optimization:', error);
  process.exit(1);
});
