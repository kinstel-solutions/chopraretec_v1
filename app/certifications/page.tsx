'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IllustrationWrapper } from '@/components/ui/IllustrationWrapper';
import { PdfModal } from '@/components/ui/PdfModal';
import { pagesData } from '@/data/pages';

export default function CertificationsPage() {
  const { certifications } = pagesData;
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  return (
    <>
      <div className="pt-24 pb-20 min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 md:px-8 space-y-16">
          
          <section className="max-w-4xl mx-auto text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-primary"
            >
              {certifications.heading}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {certifications.description}
            </motion.p>
          </section>

          <div className="flex flex-col gap-20 max-w-5xl mx-auto">
            {certifications.items.map((cert, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Certificate Preview */}
                <div className="flex-1 w-full group cursor-pointer" onClick={() => setSelectedCert({ url: cert.file, title: cert.title })}>
                  <IllustrationWrapper align={index % 2 === 1 ? 'left' : 'right'} aspectRatio="aspect-[1.414/1]">
                     <div className="relative w-full h-full bg-white shadow-sm overflow-hidden rounded-lg border border-gray-100 transition-transform duration-300 group-hover:scale-[1.02]">
                        {cert.thumbnail ? (
                          <>
                           <Image 
                              src={cert.thumbnail} 
                              alt={cert.title}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 768px) 100vw, 50vw"
                           />
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                <ZoomIn className="w-5 h-5 text-primary" />
                              </div>
                           </div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-muted-foreground">
                            <ShieldCheck className="w-16 h-16 opacity-20 mb-4" />
                            <p className="font-medium">Certificate Preview</p>
                          </div>
                        )}
                     </div>
                  </IllustrationWrapper>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{cert.title}</h3>
                   </div>
                   <p className="text-lg text-muted-foreground leading-relaxed">{cert.description}</p>
                   <Button 
                      size="lg" 
                      className="gap-2 group mt-4"
                      onClick={() => setSelectedCert({ url: cert.file, title: cert.title })}
                    >
                      <FileText className="w-5 h-5 group-hover:text-white transition-colors" />
                      View Certificate
                   </Button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      <PdfModal 
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        pdfUrl={selectedCert?.url || ''}
        title={selectedCert?.title || ''}
      />
    </>
  );
}
