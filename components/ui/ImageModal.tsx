'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export function ImageModal({ isOpen, onClose, imageUrl, title }: ImageModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-auto max-h-[90vh] flex flex-col pointer-events-auto"
            >
             
               {/* Controls */}
              <div className="absolute top-2 right-2 z-50 flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    onClick={onClose} 
                    className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
              </div>

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                 {imageUrl && (
                    <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center">
                        <Image
                        src={imageUrl}
                        alt={title}
                        width={1200}
                        height={800}
                        className="object-contain max-h-[85vh] w-auto h-auto rounded-lg shadow-2xl"
                        priority
                        />
                    </div>
                 )}
                  <div className="absolute bottom-4 left-0 right-0 text-center px-4 pointer-events-none">
                      <p className="text-white/90 text-lg font-medium drop-shadow-md bg-black/30 w-fit mx-auto px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        {title}
                      </p>
                  </div>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
