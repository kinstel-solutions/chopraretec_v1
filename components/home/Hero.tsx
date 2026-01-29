'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative h-[100dvh] w-full flex items-center overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay  
          muted
          loop
          playsInline
          preload="none"
          className="object-cover object-center w-full h-full"
        >
          <source src="/videos/seal-release.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-4xl space-y-6 md:space-y-0 text-left">
            
            {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-4xl text-gray-200 font-thin leading-relaxed"
          >
          | Chopra Retec: Trusted for Reliability
          </motion.p>


          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 md:mb-0 drop-shadow-lg leading-tight text-white">
             Precision Molded Rubber & Rubber-to-Metal Bonded Components
            </h1>
          </motion.div>

          {/* Hero Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center mb-8 gap-2 text-2xl font-bold text-gray-300"
          >
             <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
             Automotive  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
             Industrial  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
             Healthcare  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
             Defence  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
             Material Handling
          </motion.div>
        
          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-start pt-4 md:pt-8"
          >
            <Button asChild className="h-auto w-auto py-4 px-8 border-2 border-primary bg-transparent text-white hover:bg-secondary-foreground hover:text-white rounded-none tracking-[0.1em] font-bold text-xs md:text-sm uppercase">
              <Link href="/contact" className="flex items-center gap-2">
                Request a Quote <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
            </Button>
            {/* <Button asChild variant="outline" className="h-auto py-4 px-8 border-2 border-white/30 bg-transparent text-white hover:bg-white hover:text-black rounded-none tracking-[0.1em] font-medium text-sm uppercase backdrop-blur-sm">
              <Link href="#capabilities">
                Explore Capabilities
              </Link>
            </Button> */}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="/#industries"
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}

