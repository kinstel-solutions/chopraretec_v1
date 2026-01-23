

'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6">
                Looking for a reliable rubber components manufacturing partner?
             </h2>
             <p className="text-white/80 text-xl font-light mb-10">
                Partner with us for precision engineering, global standards, and consistent quality.
             </p>

             <Link 
               href="/contact"
               className="inline-flex items-center gap-2 bg-white text-primary px-10 py-5 text-base font-bold tracking-widest uppercase hover:bg-white/90 transition-all rounded shadow-xl"
             >
                Send Your RFQ / Drawing <ArrowRight className="w-5 h-5" />
             </Link>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
