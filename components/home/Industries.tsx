'use client';

import { motion } from 'framer-motion';
import { Car, Factory, Shield, Plane, Package, Activity, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const industries = [
  {
    title: 'Automotive',
    slug: 'automotive',
    // icon: <Car className="w-6 h-6" />,
    description: 'High-performance rubber components for passenger and commercial vehicles.',
    image: '/created-assets/industries-served-basic.png'
  },
  
  {
    title: 'Defence',
    slug: 'defence',
    // icon: <Shield className="w-6 h-6" />,
    description: 'Mission-critical components meeting strict military standards.',
    image: '/created-assets/rubber-injection-molding-facility-side-view.png'
  },
  {
    title: 'Aerospace',
    slug: 'aerospace',
    // icon: <Plane className="w-6 h-6" />,
    description: 'Precision engineered parts for aircraft and aviation support.',
    image: '/created-assets/rubber-injection-molding-facility-front-view.png'
  },
  {
    title: 'Engineering & Industrial',
    slug: 'engineering-industrial',
    // icon: <Factory className="w-6 h-6" />,
    description: 'Durable solutions for heavy machinery and industrial applications.',
    image: '/created-assets/industries-served-advanced.png'
  },
  {
    title: 'Material Handling',
    slug: 'material-handling',
    // icon: <Package className="w-6 h-6" />,
    description: 'Robust components for logistics and material transport equipment.',
    image: '/created-assets/rubber-injection-molding-facility-side-view.png'
  },
  {
    title: 'Healthcare & Medical',
    slug: 'healthcare-medical',
    // icon: <Activity className="w-6 h-6" />,
    description: 'Hygienic and precision molded parts for medical devices.',
    image: '/created-assets/rubber-injection-molding-facility-side-view.png'
  }
];

export function Industries() {
  return (
    <section id="industries" className="py-20 md:py-32 bg-secondary/30 overflow-hidden">
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

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
          {industries.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-shrink-0 w-[300px] h-[400px] rounded-xl overflow-hidden group cursor-pointer snap-center shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-x-0 bottom-0 p-6 text-white bg-black/65 backdrop-blur-sm">
                <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                 <div className="flex items-center text-xs font-bold uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                   Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="px-8 font-bold tracking-widest text-sm uppercase">
            <Link href="/industries" className="flex items-center gap-2">
              View All Industries <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

