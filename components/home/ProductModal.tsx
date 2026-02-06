'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Mock additional images for gallery since we don't have real per-product arrays yet
// const MOCK_IMAGES = [];

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

  // Use product images if available, otherwise just use the main image.
  // We mock a gallery if only one image exists to make it look nicer? 
  // No, user wants specific images. If only 1 image, gallery length is 1.
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

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
            className="w-full h-full max-w-7xl overflow-hidden rounded-sm bg-zinc-900 text-white shadow-2xl relative flex flex-col"
          >
             {/* Main Gallery Area */}
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
             
             {/* Details & Thumbnails */}
             <div className="h-[30vh] md:h-[25vh] bg-zinc-900 border-t border-zinc-800 p-6 flex flex-col md:flex-row gap-8 items-center justify-between shrink-0">
                 <div className="text-center md:text-left overflow-y-auto max-h-full">
                    <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                    <p className="text-zinc-400 max-w-xl text-sm md:text-base">{product.description}</p>
                 </div>
                 <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 shrink-0">
                    {galleryImages.map((img: string, idx: number) => (
                       <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative w-20 h-16 rounded-sm overflow-hidden flex-shrink-0 transition-all ${currentImageIndex === idx ? 'ring-2 ring-red-500 scale-105' : 'opacity-50 hover:opacity-100'}`}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
