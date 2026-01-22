'use client';

import { motion } from 'framer-motion';
import { Car, Factory, Shield, Plane, Package, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    title: 'Automotive',
    slug: 'automotive',
    icon: <Car className="w-6 h-6" />,
    description: 'High-performance rubber components for passenger and commercial vehicles.'
  },
  {
    title: 'Engineering & Industrial',
    slug: 'engineering-industrial',
    icon: <Factory className="w-6 h-6" />,
    description: 'Durable solutions for heavy machinery and industrial applications.'
  },
  {
    title: 'Defence',
    slug: 'defence',
    icon: <Shield className="w-6 h-6" />,
    description: 'Mission-critical components meeting strict military standards.'
  },
  {
    title: 'Aerospace',
    slug: 'aerospace',
    icon: <Plane className="w-6 h-6" />,
    description: 'Precision engineered parts for aircraft and aviation support.'
  },
  {
    title: 'Material Handling',
    slug: 'material-handling',
    icon: <Package className="w-6 h-6" />,
    description: 'Robust components for logistics and material transport equipment.'
  },
  {
    title: 'Healthcare & Medical',
    slug: 'healthcare-medical',
    icon: <Activity className="w-6 h-6" />,
    description: 'Hygienic and precision molded parts for medical devices.'
  }
];

export function Industries() {
  return (
    <section id="industries" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-primary/80 font-bold"
          >
            Industries We Serve
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold text-foreground"
          >
            Engineered for Multiple Industries
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-muted-foreground max-w-2xl mx-auto pt-4 text-lg"
          >
            Chopra Retec partners with customers across diverse sectors, delivering engineered rubber components designed for demanding working conditions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group cursor-pointer"
            >
              <div className="bg-primary/10 text-primary w-14 h-14 flex items-center justify-center rounded-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-serif font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{item.description}</p>
              
              <div className="flex items-center text-xs font-bold uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                 Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="#contact" className="inline-block px-8 py-4 bg-transparent border-2 border-primary text-primary font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-colors rounded">
            View All Industries
          </Link>
        </div>
      </div>
    </section>
  );
}

