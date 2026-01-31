'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProductModal } from '@/components/home/ProductModal';

interface ShowcaseItem {
  src: string;
  title: string;
  description: string;
}

interface ProductShowcaseProps {
  items: ShowcaseItem[];
  productTitle: string;
}

export function ProductShowcase({ items, productTitle }: ProductShowcaseProps) {
  const [selectedProductForModal, setSelectedProductForModal] = useState<any>(null);

  const openGallery = (index: number) => {
    // Construct a mock product object that the ProductModal can understand
    // forcing layout='gallery' and passing the clicked image as the main one,
    // (The ProductModal logic might need a tweak if we want to start at a specific index, 
    // but for now it starts at 0. We can just pass the clicked image as the 'image' prop
    // so it shows up first, or we can rely on the user navigating.)
    // Actually, let's create a temporary product object where 'image' is the clicked one.
    
    // Better yet, let's just make the modal work nicely. 
    // We'll pass the whole mock product but with layout='gallery'. 
    // Since ProductModal logic currently uses `product.image` as the first one, 
    // let's pass the clicked item's src as product.image.
    
    setSelectedProductForModal({
      title: items[index].title,
      description: items[index].description,
      image: items[index].src,
      layout: 'gallery'
    });
  };

  return (
    <section className="py-20 md:py-32 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold mb-4">Visual Gallery</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relaltive">
           {/* Decorative Elements */}
           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -z-10" />
           <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className={`group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg border border-black/5
                ${index === 0 ? 'md:col-span-2 md:aspect-[2/1]' : 'aspect-square'}
              `}
              onClick={() => openGallery(index)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full">
                    <Plus className="w-8 h-8 text-white" />
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

       <ProductModal
        product={selectedProductForModal!}
        isOpen={!!selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </section>
  );
}
