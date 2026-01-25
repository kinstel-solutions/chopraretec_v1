'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const capabilities = [
  "Precision Rubber Moulding",
  "Rubber-to-Metal Bonding",
  "Tooling Support & Development",
  "Material & Compound Expertise",
  "In-house Testing & Quality Assurance",
  "Export Packaging & Global Logistics Support"
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-20 md:py-32 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg bg-stone-100 shadow-2xl">
               <video
                 autoPlay
                 muted
                 loop
                 playsInline
                 className="object-cover w-full h-full"
               >
                 <source src="/videos/industrial-components.mp4" type="video/mp4" />
               </video>
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 w-full h-full border-2 border-primary/20 -z-10 rounded-lg" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
                Manufacturing Capabilities
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-foreground">
                End-to-End Manufacturing Support
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                From compound selection to molding, bonding and validation — we offer end-to-end rubber component manufacturing support.
              </p>
            </div>

            <ul className="space-y-4">
              {capabilities.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <Button asChild size="lg" className="px-8 font-bold tracking-widest text-sm uppercase">
                <Link href="/capabilities" className="flex items-center gap-2">
                  View Full Capabilities <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
