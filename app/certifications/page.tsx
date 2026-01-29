'use client';

import { motion } from 'framer-motion';
import { FileText, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IllustrationWrapper } from '@/components/ui/IllustrationWrapper';
import { pagesData } from '@/data/pages';

export default function CertificationsPage() {
  const { certifications } = pagesData;

  return (
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
              <div className="flex-1 w-full">
                <IllustrationWrapper align={index % 2 === 1 ? 'left' : 'right'} aspectRatio="aspect-[1.414/1]">
                   <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-muted-foreground">
                      <ShieldCheck className="w-16 h-16 opacity-20 mb-4" />
                      <p className="font-medium">Certificate Preview</p>
                      <p className="text-xs opacity-60">(Click View Full PDF)</p>
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
                 <a href={cert.file} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 group mt-4">
                      <FileText className="w-5 h-5 group-hover:text-white transition-colors" />
                      View Full PDF
                    </Button>
                 </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
