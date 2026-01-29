'use client';

import { motion } from 'framer-motion';
import { Globe, Cpu, Award, Wrench, Clock, Leaf } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Delivering world-class solutions across borders.',
  },
  {
    icon: Cpu,
    title: 'Advanced Technology',
    description: 'Utilizing state-of-the-art machinery for precision.',
  },
  {
    icon: Award,
    title: 'ISO Certified',
    description: 'Ensuring zero-defect quality standards.',
  },
  {
    icon: Wrench,
    title: 'Custom Solutions',
    description: 'Tailored engineering for specific client needs.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Optimized supply chain for punctual completion.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Sustainable manufacturing practices.',
  },
];

export function WhyUs() {
  return (
    <section className="py-20 md:py-32 bg-stone-50" id="why-us">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            The Chopra Retec Advantage
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
