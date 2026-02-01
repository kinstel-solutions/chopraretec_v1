'use client';

import { motion } from 'framer-motion';
import { Car, Factory, Shield, Plane, Package, Activity, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { homeData } from '@/data/home';

export function Industries() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { industries } = homeData;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let resetThreshold = 0;
    let resetTo = 0;

    // Cache dimensions to avoid layout thrashing in the loop
    const updateDimensions = () => {
      if (scrollContainer) {
        // We are scrolling a container that has 3 sets of items.
        // We reset when we reach the end of the first set (1/3 of total width)
        const partWidth = scrollContainer.scrollWidth / 3;
        resetThreshold = partWidth * 2;
        resetTo = partWidth;
      }
    };

    // Initial measurement
    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(scrollContainer);
    
    // Auto-scroll loop
    const scroll = () => {
      if (!isPaused && resetThreshold > 0) {
        scrollContainer.scrollLeft += 1; // Adjust speed here (1px per frame)
        
        // Check for seamless loop reset using cached values
        if (scrollContainer.scrollLeft >= resetThreshold) {
            scrollContainer.scrollLeft = resetTo;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isPaused]);

  return (
    <section id="industries" className="py-20 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg uppercase tracking-[0.2em] text-primary/80 font-semibold"
          >
            {industries.subHeading}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-serif text-3xl md:text-4xl font-bold text-foreground"
          >
            {industries.heading}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.1 }}
             className="text-muted-foreground max-w-2xl mx-auto pt-4 text-lg"
          >
            {industries.description}
          </motion.p>
        </div>

        <div className="w-full relative">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {/* Tripled list for infinite scroll feeling */}
                {[...industries.items, ...industries.items, ...industries.items].map((item, index) => (
                    <motion.div
                    key={`${item.slug}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative flex-shrink-0 w-[300px] h-[400px] rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
                    >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        loading="lazy"
                        className="object-cover scale-100 -translate-y-16 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-16"
                    />
                    
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white bg-black/65 backdrop-blur-sm">
                        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                    </div>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="px-8 font-bold tracking-widest text-sm uppercase">
            <Link href="/contact" className="flex items-center gap-2">
              Request a Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

