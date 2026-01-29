'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { pagesData } from '@/data/pages';

export default function AboutPage() {
  const { about } = pagesData;

  return (
    <div className="pt-24 pb-20 mt-18">
      <div className="container mx-auto px-4 md:px-8 space-y-20">
        
        {/* Intro Section */}
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary"
          >
            {about.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {about.intro[0]}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {about.intro[1]}
          </motion.p>
        </section>

        {/* Separator */}
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />

        {/* Our Strengths */}
        <section className="bg-primary text-white p-10 md:p-16 rounded-3xl shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Strengths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.strengths.map((strength, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white/10 p-6 rounded-xl backdrop-blur-sm"
              >
                <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                <p className="text-lg font-medium">{strength}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
