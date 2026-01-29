'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const capabilities = [
  "Real-Time, Top Notch Communication",
  "Comprehensive Range of Products",
  "100% Fill Rates",
  "On-Time Deliveries, Always",
  "In-House Capability of Research, Design & Development, sets us apart from our others",
  "Customised Packaging",
  "Competitive Pricing",
];

export function Why_Us() {
  return (
    <section id="capabilities" className="py-20 md:py-32 bg-secondary/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
         

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
                Why Choose Us
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-foreground">
               The Chopra Retec Advantage
              </h2>
            </div>

            {/* <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                From compound selection to molding, bonding and validation — we offer end-to-end rubber component manufacturing capabilities.
              </p>
            </div> */}

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
                <Link href="/contact" className="flex items-center gap-2">
                  Get in Touch <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

           {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            {/* <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg bg-stone-100 shadow-2xl">
               <video
                 autoPlay
                 muted
                 loop
                 playsInline
                 preload="none"
                 className="object-cover w-full h-full"
               >
                 <source src="/videos/industrial-components.mp4" type="video/mp4" />
               </video>
            </div> */}
            <Image
              src="/images/facility/facility-side-view-1200w.webp"
              alt="Chopra Retec Facility"
              width={800}
              height={1000}
              className="object-cover w-full h-full"
            />
            {/* Decorative Frame */}
            <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 w-full h-full border-2 border-primary/20 -z-10 rounded-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}



