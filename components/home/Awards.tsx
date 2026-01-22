'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const awards = [
  '/award-Icons/ecovadis.png',
  '/award-Icons/nqa-logo.png',
  '/award-Icons/ic1.png',
  '/award-Icons/ic2.jpg',
  '/award-Icons/ic3.jpg',
  '/award-Icons/ic4.png',
  '/award-Icons/ic5.png',
];

export function Awards() {
  return (
    <section className="py-16 bg-stone-50 border-y border-stone-200" id="awards">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80 font-bold mb-2">
            Recognitions & Certifications
          </p>
          <h3 className="font-serif text-2xl font-bold text-gray-900">
             Certified Excellence
          </h3>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500">
          {awards.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center p-4 shadow-sm border border-stone-100"
            >
              <Image
                src={src}
                alt={`Award ${index + 1}`}
                fill
                className="object-contain p-4"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
