'use client';

import { motion } from 'framer-motion';
import { Car, Factory, Shield, Plane, Package, Activity, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const industries = [
  {
    title: 'Automotive',
    slug: 'automotive',
    // icon: <Car className="w-6 h-6" />,
    description: 'High-performance rubber components for passenger and commercial vehicles.',
    image: '/images/industries/industries-basic-1200w.webp'
  },
  
  {
    title: 'Defence',
    slug: 'defence',
    // icon: <Shield className="w-6 h-6" />,
    description: 'Mission-critical components meeting global standards.',
    image: '/images/facility/facility-side-view-1200w.webp'
  },
  {
    title: 'Engineering & Industrial',
    slug: 'engineering-industrial',
    // icon: <Factory className="w-6 h-6" />,
    description: 'Durable solutions for machinery, engineering and industrial applications.',
    image: '/images/industries/industries-advanced-1200w.webp'
  },
  {
    title: 'Material Handling',
    slug: 'material-handling',
    // icon: <Package className="w-6 h-6" />,
    description: 'Robust components for logistics and material transport equipment.',
    image: '/images/facility/facility-side-view-1200w.webp'
  },
  {
    title: 'Healthcare & Medical',
    slug: 'healthcare-medical',
    // icon: <Activity className="w-6 h-6" />,
    description: 'Hygienic and precision molded parts for medical and healthcare applications.',
    image: '/images/facility/facility-side-view-1200w.webp'
  }
];


export function Industries() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    
    // Auto-scroll loop
    const scroll = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += 1; // Adjust speed here (1px per frame)
        
        // Check for seamless loop reset
        // We are scrolling a container that has 3 sets of items.
        // We reset when we reach the end of the first set (1/3 of total width)
        // However, calculating exact width can be tricky with gaps.
        // Simplified approach: Scroll until near end, then jump back.
        // Better approach for seamlessness:
        // If scrollLeft >= (scrollWidth / 3) * 2, reset to (scrollWidth / 3)
        // This ensures we are always in the middle "safe" zone.
        
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 3) * 2) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <section id="industries" className="py-20 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-primary/80 font-bold"
          >
            Industries We Serve
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold text-foreground"
          >
            Engineered for Multiple Industries & Applications
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-muted-foreground max-w-2xl mx-auto pt-4 text-lg"
          >
            Chopra Retec partners with customers across diverse sectors, delivering engineered rubber and rubber-to-metal bonded components designed for extreme conditions.
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
                {[...industries, ...industries, ...industries].map((item, index) => (
                    <motion.div
                    key={`${item.slug}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative flex-shrink-0 w-[300px] h-[400px] rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
                    >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white bg-black/65 backdrop-blur-sm">
                        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                        <div className="flex items-center text-xs font-bold uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                        Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
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

