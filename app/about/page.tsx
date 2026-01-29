'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { pagesData } from '@/data/pages';

export default function AboutPage() {
  const { about } = pagesData;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
             src={about.heroImage || ''} // Fallback if undefined, though we just added it
             alt="About Chopra Retec"
             fill
             className="object-cover brightness-[0.4]"
             priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {about.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200"
          >
             {about.intro[0]}
          </motion.p>
        </div>
      </section>

      <div className="py-20 container mx-auto px-4 md:px-8 space-y-20">
        
        {/* Intro Continuation */}
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {about.intro[1]}
          </motion.p>
        </section>


        {/* Corporate Video */}
        <section className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border bg-black/5"
          >
            <iframe
              src="https://www.youtube.com/embed/IJRFXwprUqo?rel=0"
              title="Chopra Retec Corporate Video"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
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
