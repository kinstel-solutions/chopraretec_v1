'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
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
            About Chopra Retec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Chopra Retec Rubber Products Limited is a reputed manufacturer of molded rubber and rubber-to-metal bonded components, serving customers across multiple industries and global markets.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            With a modern manufacturing facility in Lucknow, India, we combine engineering capability, process reliability and export experience to deliver components that perform consistently in challenging environments.
          </motion.p>
        </section>

        {/* Separator */}
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />

        {/* What We Stand For */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">What We Stand For</h2>
            <ul className="space-y-4">
              {[
                "Precision manufacturing and repeatability",
                "Performance-focused product design",
                "Strong quality culture and compliance mindset",
                "Long-term partnerships with customers",
                "Reliable exports and international servicing"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-lg text-gray-700"
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="bg-secondary/10 p-8 rounded-2xl border border-secondary/20">
             {/* Placeholder for an image or graphic */}
             <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold">
                Company Values / Facility Image
             </div>
          </div>
        </section>

        {/* Our Strengths */}
        <section className="bg-primary text-white p-10 md:p-16 rounded-3xl shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Strengths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "30+ years of manufacturing experience",
              "Exports to 30+ countries",
              "Capable across automotive and non-automotive sectors",
              "High-mix and repeat-volume supply capability",
              "Strong expertise in rubber-to-metal bonding applications"
            ].map((strength, index) => (
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
