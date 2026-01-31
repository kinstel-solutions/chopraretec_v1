'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductHeroProps {
  image: string;
  title: string;
  tagline: string;
}

export function ProductHero({ image, title, tagline }: ProductHeroProps) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 w-full container mx-auto px-4 md:px-8 text-center text-white">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="absolute top-4 left-4 md:top-8 md:left-8"
        >
             <Button
              asChild
              variant="outline"
              size="sm"
              className="text-white border-white/20 hover:bg-white/20 bg-transparent"
             >
                <Link href="/#products" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Products
                </Link>
             </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-medium tracking-[0.3em] uppercase mb-4 text-red-500"
        >
          {tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
