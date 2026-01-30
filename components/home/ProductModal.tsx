'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Mock additional images for gallery/collage since we don't have real per-product arrays yet
const MOCK_IMAGES = [
  '/real-assets/exhaust-parts.webp',
  '/real-assets/suspension-parts.webp',
  '/real-assets/moulding-2.webp',
  '/real-assets/steel-stamping.webp',
  '/real-assets/Designing.webp',
  '/real-assets/shop-floor.webp',
];

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);

  if (!product) return null;

  // Combine product main image with mock images for gallery/collage
  const galleryImages = [product.image, ...MOCK_IMAGES.filter(img => img !== product.image)].slice(0, 6);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={onClose}
        >
          {/* Controls */}
          <div className="absolute top-4 left-4 z-50 md:top-8 md:left-8">
             <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-white/20 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="absolute top-4 right-4 z-50 md:top-8 md:right-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border-white/20 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full max-w-7xl overflow-y-auto overflow-x-hidden rounded-2xl bg-zinc-900 text-white shadow-2xl relative"
          >
             {/* Layouts */}
             {product.layout === 'simple' && (
                <div className="h-full flex flex-col md:flex-row">
                   <div className="relative w-full md:w-2/3 h-[50vh] md:h-full">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                   </div>
                   <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center space-y-6">
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                        {product.title}
                      </h2>
                      <div className="w-20 h-1 bg-red-600" />
                      <p className="text-zinc-300 text-lg leading-relaxed">
                        {product.description}
                      </p>
                      <div className="pt-8">
                         <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">Key Specifications</h4>
                         <ul className="text-zinc-400 space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                               <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                               Premium Grade Rubber
                            </li>
                            <li className="flex items-center gap-2">
                               <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                               High Durability
                            </li>
                             <li className="flex items-center gap-2">
                               <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                               Custom Dimensions Available
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>
             )}

             {product.layout === 'gallery' && (
                <div className="h-full flex flex-col">
                   <div className="flex-1 relative bg-black flex items-center justify-center p-4">
                      <div className="relative w-full h-full max-h-[70vh] aspect-video">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentImageIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="relative w-full h-full"
                            >
                               <Image
                                  src={galleryImages[currentImageIndex]}
                                  alt={`${product.title} view ${currentImageIndex + 1}`}
                                  fill
                                  className="object-contain"
                               />
                            </motion.div>
                          </AnimatePresence>
                          
                          {/* Nav Buttons */}
                          <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={prevImage}
                                className="pointer-events-auto bg-black/50 text-white hover:bg-black/70 rounded-full w-12 h-12"
                              >
                                <ChevronLeft className="w-8 h-8" />
                              </Button>
                               <Button
                                variant="ghost"
                                size="icon"
                                onClick={nextImage}
                                className="pointer-events-auto bg-black/50 text-white hover:bg-black/70 rounded-full w-12 h-12"
                              >
                                <ChevronRight className="w-8 h-8" />
                              </Button>
                          </div>
                      </div>
                   </div>
                   
                   <div className="h-[30vh] md:h-[25vh] bg-zinc-900 border-t border-zinc-800 p-6 flex flex-col md:flex-row gap-8 items-center justify-between">
                       <div className="text-center md:text-left">
                          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                          <p className="text-zinc-400 max-w-xl text-sm md:text-base">{product.description}</p>
                       </div>
                       <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
                          {galleryImages.map((img, idx) => (
                             <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all ${currentImageIndex === idx ? 'ring-2 ring-red-500 scale-105' : 'opacity-50 hover:opacity-100'}`}
                             >
                                <Image
                                  src={img}
                                  alt={`Thumbnail ${idx}`}
                                  fill
                                  className="object-cover"
                                />
                             </button>
                          ))}
                       </div>
                   </div>
                </div>
             )}

             {product.layout === 'collage' && (
                <div className="h-full overflow-y-auto p-4 md:p-12">
                   <div className="max-w-6xl mx-auto space-y-12">
                      <div className="text-center space-y-4">
                          <h2 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter text-white">
                            {product.title}
                          </h2>
                          <p className="text-zinc-400 text-xl max-w-2xl mx-auto border-t border-b border-zinc-800 py-4">
                             {product.description}
                          </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 h-auto md:h-[800px]">
                          {/* Large Hero Item */}
                          <div className="lg:col-span-8 lg:row-span-2 relative group rounded-2xl overflow-hidden min-h-[300px]">
                              <Image 
                                src={galleryImages[0]} 
                                alt="Main view" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                              />
                               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                          </div>

                          {/* Secondary Stack */}
                          <div className="lg:col-span-4 lg:row-span-1 relative group rounded-2xl overflow-hidden min-h-[200px]">
                              <Image 
                                src={galleryImages[1]} 
                                alt="Detail view" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                              />
                          </div>

                          <div className="lg:col-span-4 lg:row-span-1 relative group rounded-2xl overflow-hidden min-h-[200px] bg-zinc-800 p-8 flex flex-col justify-center items-center text-center">
                              <Expand className="w-12 h-12 text-red-500 mb-4" />
                              <h4 className="text-xl font-bold">Premium Quality</h4>
                              <p className="text-zinc-400 text-sm mt-2">Engineered for perfection and durability.</p>
                          </div>
                          
                           {/* Bottom Row */}
                          <div className="lg:col-span-4 relative group rounded-2xl overflow-hidden min-h-[200px]">
                               <Image 
                                src={galleryImages[2]} 
                                alt="Angle view" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                              />
                          </div>
                          
                          <div className="lg:col-span-8 relative group rounded-2xl overflow-hidden min-h-[200px]">
                               <Image 
                                src={galleryImages[3]} 
                                alt="Wide view" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                              />
                          </div>
                      </div>
                   </div>
                </div>
             )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
