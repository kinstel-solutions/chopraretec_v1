'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Factory, Globe, Cpu, Plane } from 'lucide-react';

const milestones = [
  {
    year: '1990s',
    title: 'Local Roots',
    description: 'Started as a modest manufacturing unit in Lucknow, focusing on quality basics.',
    icon: Factory,
  },
  {
    year: '2000s',
    title: 'Global Expansion',
    description: 'Broke into international markets, establishing trust in Europe and the Americas.',
    icon: Globe,
  },
  {
    year: '2010s',
    title: 'Modernization',
    description: 'Invested heavily in automation and CNC machining to ensure zero-defect production.',
    icon: Cpu,
  },
  {
    year: '2020s',
    title: 'Aerospace Precision',
    description: 'Achieved certification for aerospace components, marking a new era of precision.',
    icon: Plane,
  },
];

export function CompanyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full py-12 relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-900/30 -translate-y-1/2 z-0" />
      
      <motion.div 
        ref={containerRef}
        className="flex gap-8 overflow-x-auto pb-8 hide-scrollbar px-4 md:px-8 cursor-grab active:cursor-grabbing"
        whileTap={{ cursor: "grabbing" }}
      >
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            className="flex-shrink-0 w-80 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-black/80 border border-red-900/30 p-6 rounded-lg backdrop-blur-sm hover:border-red-500/50 transition-colors h-full flex flex-col">
              <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-4 text-red-500">
                <milestone.icon className="w-6 h-6" />
              </div>
              <span className="text-4xl font-serif font-bold text-white mb-2 block">{milestone.year}</span>
              <h3 className="text-xl font-bold text-red-500 mb-2">{milestone.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
            </div>
            {/* Dot on the line */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-600 rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block border-4 border-black" style={{ marginTop: '-4rem' }} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
