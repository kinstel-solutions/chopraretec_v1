'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { homeData } from '@/data/home';

export function Hero() {
  const { hero } = homeData;

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
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 h-full flex flex-col justify-end pb-24 md:pb-12">
        <div className="max-w-4xl min-h-[75%] space-y-6 md:space-y-0 text-left">
            
           

          {/* Hero Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center mb-8 gap-x-4 gap-y-4 text-sm sm:text-base md:text-xl font-medium text-gray-100 tracking-wide"
          >
            {hero.industries.map((industry) => (
              <div key={industry} className="flex items-center gap-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                 {industry.toUpperCase()}
              </div>
            ))}
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 md:mb-0 drop-shadow-lg leading-tight text-white">
             {hero.heading}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-4xl text-white font-light leading-relaxed tracking-tight drop-shadow-lg mt-2 flex items-center gap-2"
          >
           <span className="text-primary">Chopra</span> Retec : Trusted for Reliability
          </motion.p>
        
          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-start pt-4 md:pt-8"
          >
            <Button asChild className="h-auto w-3/4 md:w-auto py-4 px-8 border-2 border-primary bg-transparent text-white hover:bg-secondary-foreground hover:text-white rounded-none tracking-[0.1em] font-bold text-xs md:text-sm uppercase">
              <Link href="/contact" className="flex items-center gap-2">
                {hero.cta} <ArrowUpRight className="w-4 h-4 shrink-0" />
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

      {/* Scroll Mouse Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="/#industries"
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2 group-hover:border-white transition-colors duration-300">
            <motion.div 
              animate={{ 
                y: [0, 8, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

