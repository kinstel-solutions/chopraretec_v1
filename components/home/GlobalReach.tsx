'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BookOpen, Truck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlobalReachMap } from './GlobalReachMap';
import { CompanyTimeline } from './CompanyTimeline';
import { homeData } from '@/data/home';

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
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
  const { globalReach } = homeData;

  return (
    <section className="py-20 md:py-0 bg-black text-white relative overflow-hidden" id="global">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #8B0000 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left/Top Content Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-red-500 font-bold mb-4">{globalReach.subHeading}</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">{globalReach.heading}</h2>
            <p className="text-gray-300 text-lg max-w-xl leading-relaxed mb-8">
              {globalReach.description}
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
               {globalReach.stats.map((stat, index) => (
                <div key={stat.label}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="text-sm font-bold mt-2 text-white">{stat.label}</p>
                </div>
               ))}
            </div>

            <Button asChild size="lg" className="px-8 border-2 border-red-800 bg-transparent text-white font-bold tracking-widest text-sm uppercase hover:bg-red-800 hover:text-white">
                <Link href="/contact" className="flex items-center gap-2">
                    Start Your Project <ArrowUpRight className="w-4 h-4" />
                </Link>
            </Button>
          </motion.div>
        </div>

        {/* Right/Bottom Map Section */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative order-1 lg:order-2 bg-gradient-to-b from-black/0 via-red-950/10 to-black/0">
            <GlobalReachMap />
        </div>
      </div>

      {/* Timeline Section */}
      {/* <div className="container mx-auto px-4 pb-20">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8"
        >
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Our Evolution</h3>
            <div className="w-20 h-1 bg-red-600 mb-8" />
        </motion.div>
        <CompanyTimeline />
      </div> */}

    </section>
  );
}
