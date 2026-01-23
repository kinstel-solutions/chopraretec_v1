'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Globe, BookOpen, Clock, Truck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Clock, value: 30, suffix: '+', label: 'Years Experience', description: 'Manufacturing excellence' },
  { icon: Globe, value: 30, suffix: '+', label: 'Countries Exported', description: 'Global customer base' },
  { icon: Truck, value: 98, suffix: '%', label: 'On-Time Delivery', description: 'Reliable logistics' },
  { icon: BookOpen, value: 5000, suffix: '+', label: 'Parts Developed', description: 'Extensive product portfolio' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      
      const updateCounter = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(easeOutQuart * value));
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">
      {displayValue}{suffix}
    </span>
  );
}

export function GlobalReach() {
  return (
    <section className="py-20 md:py-28 bg-black text-white relative overflow-hidden" id="global">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #8B0000 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-red-500 font-bold mb-4">Global Presence</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Trusted by Customers Worldwide</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">With decades of export experience, Chopra Retec supports global customers with reliable delivery, documentation and professional packaging standards.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center group-hover:bg-red-900/40 transition-colors">
                <stat.icon className="w-8 h-8 text-red-500" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-base font-bold mt-2">{stat.label}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
            <Button asChild size="lg" className="px-8 border-2 border-red-800 bg-transparent text-white font-bold tracking-widest text-sm uppercase hover:bg-red-800 hover:text-white">
                <Link href="/contact">
                    Global Reach
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
