

'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
           >
             <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6">
                Looking for a reliable rubber components manufacturing partner?
             </h2>
             <p className="text-white/80 text-xl font-light mb-10">
                Partner with us for precision engineering, global standards, and consistent quality.
             </p>

             <Button asChild size="lg" className="h-auto py-5 px-10 bg-white text-primary font-bold tracking-widest text-base uppercase hover:bg-secondary-foreground/80 shadow-none">
               <Link href="/contact">
                  Send Your RFQ / Drawing <ArrowUpRight className="w-5 h-5 ml-2" />
               </Link>
             </Button>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
