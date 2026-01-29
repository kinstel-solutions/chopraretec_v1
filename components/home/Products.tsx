'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 'exhaust',
    title: 'Exhaust Suspension Components',
    description: 'High Performance hangers and mounts.',
    image: '/images/products/engine-mount-v2-1200w.webp',
  },
   {
    id: 'bushes',
    title: 'Ride Control Parts',
    description: 'Suspension & steering parts including stabiliser bar bushes, trailer arm bushes, control arm bushings, End links, bellows, strut mount kits & chassis parts.',
    image: '/images/products/rubber-metal-components-v2-1200w.webp',
  },
  {
    id: 'anti-vibration',
    title: 'Anti-Vibration Mounts',
    description: 'Controll Arm Bushing, Trailer Arm Bushings, Silent Block.',
    image: '/images/products/rubber-metal-components-v1-1200w.webp',
  },
  {
    id: 'bonded',
    title: 'Rubber-to-Metal Bonded Components',
    description: 'Designed for structural integrity.',
    image: '/images/bonding-process/bonding-stage3-1200w.webp',
  },
 
  
  {
    id: 'custom',
    title: 'Custom-Designed Components',
    description: 'End-to-End Bespoke solutions. From conceptualising to design, mould making, moulding and processing to meet customer needs.',
    image: '/images/industries/industries-basic-1200w.webp',
  },
  
];

export function Products() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden" id="products">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-primary/80 font-bold"
          >
            Products Snapshot
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl text-black md:text-4xl font-bold"
          >
            Components That Perform Under Adverse Conditions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            We manufacture a wide range of molded rubber and rubber-to-metal bonded components, engineered for consistent performance and long service life with focus on Noise, Vibration and Harshness (NVH).
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary rounded-lg mb-6">
                <div className="absolute inset-0 bg-secondary flex items-center justify-center text-muted-foreground/30 font-bold text-xl uppercase tracking-widest">
                   {/* Placeholder visual if image missing */}
                   Product Image
                </div>
                
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
               
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-muted-foreground text-sm">{product.description}</p>
                <span 
                  className="inline-flex items-center mt-2 text-xs font-bold tracking-widest uppercase text-primary border-b border-primary/20 pb-1 group-hover:border-primary transition-all"
                >
                  View Details <ArrowRight className="w-3 h-3 ml-2" />
                </span>
              </div>
            </motion.div>
          ))}
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
