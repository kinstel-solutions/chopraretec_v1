'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { homeData } from '@/data/home';
import { useState } from 'react';
import { ProductModal } from './ProductModal';

export function Products() {
  const { products } = homeData;
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden" id="products">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg uppercase tracking-[0.2em] text-primary/80 font-semibold"
          >
            {products.subHeading}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-serif text-3xl text-black md:text-4xl font-bold"
          >
            {products.heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            {products.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.items.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
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
      <ProductModal
        product={selectedProduct!}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
