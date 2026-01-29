'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { pagesData } from '@/data/pages';

export default function AwardsMediaPage() {
  const { awards } = pagesData;

  return (
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
        
        {/* Featured Image - Manual addition since we don't have a generic awards hero, using the bronze medal or similar if visually appealing, else skip hero image */}
        {/* <div className="flex justify-center">
             <div className="relative w-64 h-64">
                <Image src="/real-assets/awards/bronze-medal.jpg" alt="Bronze Medal" fill className="object-contain" />
             </div>
        </div> */}

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
                    className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="space-y-4 mb-6">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold leading-tight mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    
                    <a href={item.file} target="_blank" rel="noopener noreferrer" className="mt-auto">
                        <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-secondary/20">
                           <span>View Award</span>
                           <Award className="w-4 h-4" />
                        </Button>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
