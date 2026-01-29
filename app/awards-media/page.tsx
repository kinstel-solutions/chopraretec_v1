'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PdfModal } from '@/components/ui/PdfModal';
import { pagesData } from '@/data/pages';

export default function AwardsMediaPage() {
  const { awards } = pagesData;
  const [selectedAward, setSelectedAward] = useState<{ url: string; title: string } | null>(null);

  return (
    <>
      <div className="pt-24 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-8 space-y-20">
          
          <section className="max-w-4xl mx-auto text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-primary"
            >
              {awards.heading}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {awards.description}
            </motion.p>
          </section>
          
          <div className="space-y-16">
            {awards.categories.map((section, sIndex) => (
              <div key={sIndex} className="space-y-8">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold border-l-4 border-primary pl-4"
                >
                  {section.category}
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group h-full"
                    >
                      {/* Thumbnail Section */}
                      <div 
                        className="relative h-56 w-full bg-gray-100 cursor-pointer overflow-hidden" 
                        onClick={() => setSelectedAward({ url: item.file, title: item.title })}
                      >
                         {item.thumbnail ? (
                           <>
                             <Image 
                               src={item.thumbnail} 
                               alt={item.title} 
                               fill 
                               className="object-cover transition-transform duration-500 group-hover:scale-110" 
                             />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                  <ZoomIn className="w-5 h-5 text-primary" />
                                </div>
                             </div>
                           </>
                         ) : (
                           <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <Trophy className="w-12 h-12 text-gray-300" />
                           </div>
                         )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="space-y-4 mb-6">
                          <div className="flex items-start justify-between">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                              <Trophy className="w-5 h-5 text-yellow-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-between hover:bg-secondary/20 group/btn"
                              onClick={() => setSelectedAward({ url: item.file, title: item.title })}
                            >
                               <span>View Award</span>
                               <Award className="w-4 h-4 group-hover/btn:text-primary transition-colors" />
                            </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <PdfModal 
        isOpen={!!selectedAward}
        onClose={() => setSelectedAward(null)}
        pdfUrl={selectedAward?.url || ''}
        title={selectedAward?.title || ''}
      />
    </>
  );
}
