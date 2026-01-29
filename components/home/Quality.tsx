'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Ruler, Activity, RefreshCw, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: RefreshCw,
    title: 'Robust Process Controls',
    description: 'Our systems are designed for repeatability, ensuring consistent quality output for every batch.',
  },
  {
    icon: Ruler,
    title: 'Inspection & Validation',
    description: 'Rigorous validation standards and dimensional checks at every stage of production.',
  },
  {
    icon: Activity,
    title: 'Durability & Performance',
    description: 'We focus on creating parts that withstand stress, heat, and vibration over long service lives.',
  },
  {
    icon: ShieldCheck,
    title: 'Continuous Improvement',
    description: 'A commitment to refining our processes and adopting best practices for global supply requirements.',
  },
];

export function Quality() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden" id="quality">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80 font-bold">
            Quality & Reliability
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Quality You Can Depend On
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 rounded-xl bg-secondary/5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="font-serif text-lg font-bold mb-3 text-black">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <Button asChild size="lg" className="px-8 font-bold tracking-widest text-sm uppercase">
                <Link href="/certifications" className="flex items-center gap-2">
                    Quality & Certifications <ArrowUpRight className="w-4 h-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
