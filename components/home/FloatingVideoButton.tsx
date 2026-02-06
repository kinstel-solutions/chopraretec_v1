'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { VideoModal } from '@/components/ui/VideoModal';

export function FloatingVideoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 group flex items-center justify-center w-16 h-16 bg-transparent border-2 border-primary text-primary rounded-full shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <Play className="w-8 h-8 text-primary fill-primary ml-1 relative z-10" />
        <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
      </motion.button>

      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoSrc="/videos/our-journey.mp4"
      />
    </>
  );
}
