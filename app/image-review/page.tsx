import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Review | Internal',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

const NEW_PICS_DIR = path.join(process.cwd(), 'public/new-pics-2');
const REAL_ASSETS_DIR = path.join(process.cwd(), 'public/real-assets');

function getImages(dir: string, category: string) {
  try {
    if (!fs.existsSync(dir)) {
      console.error(`Directory not found: ${dir}`);
      return { images: [], error: `Directory not found: ${dir}` };
    }
    const images = fs.readdirSync(dir)
      .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map(file => ({
        src: path.join('/', category, file).replace(/\\/g, '/'),
        name: file,
        category
      }));
    return { images, error: null };
  } catch (error: any) {
    console.error(`Error reading directory ${dir}:`, error);
    return { images: [], error: `Error reading ${dir}: ${error.message}` };
  }
}

export default function ImageReviewPage() {
  const { images: newPics, error: newPicsError } = getImages(NEW_PICS_DIR, 'new-pics-2');
  const { images: realAssets, error: realAssetsError } = getImages(REAL_ASSETS_DIR, 'real-assets');
  
  const allImages = [...newPics, ...realAssets];
  const errors = [newPicsError, realAssetsError].filter(Boolean);

  return (
    <div className="p-8 min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-center">Image Review</h1>
      <div className="h-1 bg-primary mx-auto rounded-full w-20 mb-8" />
      
      {errors.length > 0 && (
        <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-bold mb-2">Errors:</h2>
          <ul className="list-disc pl-5">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-600">CWD: {process.cwd()}</p>
        </div>
      )}

      {allImages.length === 0 && errors.length === 0 ? (
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
