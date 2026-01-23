'use client';

import { motion } from 'framer-motion';

const industries = [
  {
    title: "Automotive",
    description: "Parts designed for vibration control, ride comfort and durability across road conditions and temperatures."
  },
  {
    title: "Engineering & Industrial",
    description: "Rubber components engineered for mechanical strength, fatigue resistance and long working life."
  },
  {
    title: "Defence",
    description: "Reliable rubber and bonded components designed for rugged environments, reliability and high stress conditions."
  },
  {
    title: "Aerospace",
    description: "Precision-oriented components developed with focus on performance consistency and application suitability."
  },
  {
    title: "Material Handling Equipment",
    description: "Components for forklifts and heavy-duty equipment requiring repeat reliability under load, vibration and wear."
  },
  {
    title: "Healthcare & Medical",
    description: "Clean, precise rubber components developed for specialised applications requiring consistency and trust."
  }
];

export default function IndustriesPage() {
  return (
    <div className="pt-24 pb-20 mt-18">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary"
          >
            Industries We Serve
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Our strength lies in manufacturing high-performance rubber components that operate in demanding mechanical and environmental conditions.
          </motion.p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-stone-50 p-8 rounded-xl border border-stone-100 hover:shadow-lg hover:bg-white transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">{ind.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {ind.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
