'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const awards = [
  '/images/awards/ecovadis.png',
  '/images/awards/nqa-logo.png',
  '/images/awards/ic1.png',
  '/images/awards/ic2.png',
  '/images/awards/ic3.png',
  '/images/awards/ic4.png',
  '/images/awards/ic5.png',
];

export function Awards() {
  return (
    <section className="py-16 bg-stone-50 border-y border-stone-200" id="awards">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <p className="text-lg uppercase tracking-[0.2em] text-primary/80 font-semibold mb-2">
            Recognitions & Certifications
          </p>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
             Certified Excellence
          </h3>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* First Row - Top */}
          <div className="flex justify-center items-center gap-6 md:gap-12 mb-4">
            {awards.slice(0, 4).map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative w-20 h-20 md:w-28 md:h-28 bg-white rounded-lg flex items-center justify-center p-3 shadow-sm border border-stone-100 hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                  index % 2 === 0 ? 'mt-0' : 'mt-6 md:mt-8'
                }`}
              >
                <Image
                  src={src}
                  alt={`Award ${index + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </motion.div>
            ))}
          </div>

          {/* Second Row - Bottom */}
          <div className="flex justify-center items-center gap-6 md:gap-12">
            {awards.slice(4).map((src, index) => (
              <motion.div
                key={index + 4}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 4) * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative w-20 h-20 md:w-28 md:h-28 bg-white rounded-lg flex items-center justify-center p-3 shadow-sm border border-stone-100 hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                  index % 2 === 0 ? 'mb-6 md:mb-8' : 'mb-0'
                }`}
              >
                <Image
                  src={src}
                  alt={`Award ${index + 5}`}
                  fill
                  className="object-contain p-2"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
