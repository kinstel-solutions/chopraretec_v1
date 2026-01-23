'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden pt-0">

      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover object-center w-full h-full"
        >
          <source src="/assets/Video_Ready_After_Seal_Release.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      

      {/* Content */}
      <div className="relative z-10 text-center text-white space-y-6 md:space-y-8 max-w-5xl px-4 mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
           className="mb-0"
        >
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 md:mb-4 drop-shadow-lg leading-tight">
            Engineered Rubber Solutions. Manufactured for the World

            {/* <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
              Rubber-to-Metal Bonded Components
            </span> */}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-4xl text-gray-200 max-w-3xl mx-auto font-medium leading-relaxed"
        >
         Chopra Retec manufactures precision molded rubber and rubber-to-metal bonded components for high-performance applications across industries.
        </motion.p>

        {/* Hero Highlights */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row gap-2 md:gap-8 justify-center items-center text-xs md:text-md font-bold text-gray-300"
        >
           <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              30+ years excellence
           </div>
           <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Exporting to 30+ countries
           </div>
           <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Trusted Quality
           </div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 md:pt-8"
        >
          <Button asChild className="h-auto py-4 px-8 border-2 border-primary bg-transparent text-white hover:bg-secondary-foreground hover:text-white rounded-none tracking-[0.1em] font-bold text-sm uppercase">
            <Link href="#contact">
              Request a Quote (RFQ)
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 px-8 border-2 border-white/30 bg-transparent text-white hover:bg-white hover:text-black rounded-none tracking-[0.1em] font-medium text-sm uppercase backdrop-blur-sm">
            <Link href="#capabilities">
              Explore Capabilities
            </Link>
          </Button>
        </motion.div>
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

