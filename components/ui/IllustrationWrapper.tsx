'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IllustrationWrapperProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
  aspectRatio?: string;
}

export function IllustrationWrapper({ children, className, align = 'right', aspectRatio = "aspect-video" }: IllustrationWrapperProps) {
  // Decorative Dot Pattern SVG
  const DotPattern = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
      <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill="currentColor" />
      </pattern>
      <rect width="100" height="100" fill="url(#dot-pattern)" />
    </svg>
  );

  return (
    <div className={cn("relative w-full", aspectRatio, className)}>
      
      {/* 1. Offset Solid Frame (Behind) */}
      <motion.div 
        initial={{ opacity: 0, x: align === 'right' ? 20 : -20, y: 20 }}
        whileInView={{ opacity: 1, x: align === 'right' ? 30 : -30, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 border-2 border-primary/20 rounded-2xl z-0"
      />

      {/* 2. Floating Circle Decoration */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={cn(
          "absolute w-32 h-32 rounded-full bg-primary/5 blur-2xl z-0",
          align === 'right' ? "-top-10 -right-10" : "-bottom-10 -left-10"
        )}
      />

      {/* 3. Dot Pattern Accent */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={cn(
            "absolute text-primary z-0",
            align === 'right' ? "-bottom-12 -left-12" : "-top-12 -right-12"
        )}
      >
        <DotPattern />
      </motion.div>

      {/* 4. Main Content Container */}
      <motion.div
        className="relative z-10 w-full h-full overflow-hidden rounded-2xl shadow-xl group border border-white/10 bg-white"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {children}
        
        {/* Inner Glare/Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
      </motion.div>

      {/* 5. Corner Accent (Technical look) */}
      <motion.div 
        className={cn(
            "absolute w-12 h-12 border-t-4 border-r-4 border-primary z-20",
            align === 'right' ? "-top-2 -right-2" : "-top-2 -left-2 rotate-[-90deg]"
        )}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      />
      <motion.div 
        className={cn(
            "absolute w-12 h-12 border-b-4 border-l-4 border-primary z-20",
            align === 'right' ? "-bottom-2 -left-2" : "-bottom-2 -right-2 rotate-[-90deg]"
        )}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      />

    </div>
  );
}
