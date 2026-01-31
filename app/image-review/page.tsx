
import fs from 'fs';
import path from 'path';
import Image from 'next/image';

const NEW_PICS_DIR = path.join(process.cwd(), 'public/new-pics-2');
const REAL_ASSETS_DIR = path.join(process.cwd(), 'public/real-assets');

function getImages(dir: string, category: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
    .map(file => ({
      src: path.join('/', category, file).replace(/\\/g, '/'),
      name: file,
      category
    }));
}

export default function ImageReviewPage() {
  const newPics = getImages(NEW_PICS_DIR, 'new-pics-2');
  const realAssets = getImages(REAL_ASSETS_DIR, 'real-assets');
  const allImages = [...newPics, ...realAssets];

  return (
    <div className="p-8 min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center">Image Review</h1>
      
      {allImages.length === 0 ? (
        <p className="text-center text-lg">No images found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {allImages.map((img, index) => (
            <div key={`${img.category}-${img.name}-${index}`} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
              <span className="mb-2 font-mono text-sm break-all font-semibold text-gray-700">{img.name}</span>
              <div className="w-full relative">
                {/* 
                  Using a standard img tag or Next.js Image with 'style={{ width: "100%", height: "auto" }}' 
                  to ensure the full image is visible without cropping.
                */}
                <img 
                  src={img.src} 
                  alt={img.name}
                  className="w-full h-auto rounded"
                  loading="lazy"
                />
              </div>
              <span className="mt-2 text-xs text-gray-500 uppercase tracking-wide">{img.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
