'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { pagesData } from '@/data/pages';

export default function CertificationsPage() {
  const { certifications } = pagesData;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
             src={certifications.heroImage || ''}
             alt="Certifications & Standards"
             fill
             className="object-cover brightness-[0.4]"
             priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {certifications.heading}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg mt-4 md:text-2xl text-gray-200"
          >
             {certifications.description}
          </motion.p>
        </div>
      </section>

      <div className="py-20 container mx-auto px-4 md:px-8 space-y-16">

          <div className="flex flex-col gap-24 max-w-6xl mx-auto">
            {certifications.items.map((cert, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Certificate Image */}
                <div className="flex-1 w-full">
                    <div className={`relative w-full ${cert.title.includes('D&B') ? 'aspect-[1.414/1]' : 'aspect-[1/1.414]'} bg-white shadow-2xl overflow-hidden rounded-sm border border-gray-200`}>
                        {cert.thumbnail ? (
                           <Image 
                              src={cert.thumbnail} 
                              alt={cert.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                           />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-muted-foreground">
                            <ShieldCheck className="w-16 h-16 opacity-20 mb-4" />
                            <p className="font-medium">Certificate Preview</p>
                          </div>
                        )}
                         {/* Glossy overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/20 pointer-events-none" />
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">{cert.title}</h3>
                   </div>
                   <p className="text-xl text-muted-foreground leading-relaxed">{cert.description}</p>
                </div>

              </div>
            ))}
          </div>

      </div>
    </div>
  );
}
