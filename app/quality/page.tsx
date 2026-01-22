'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function QualityPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 space-y-20">
        
        {/* Intro */}
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary"
          >
            Quality & Compliance
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            We believe quality is not only inspection — it is process discipline, consistency and customer trust.
          </motion.p>
        </section>

        {/* Systems Structure */}
        <section className="bg-stone-50 p-12 rounded-3xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-bold mb-6">Our systems are structured to support:</h2>
                 <ul className="space-y-4">
                   {["Consistent repeat production", "Traceability and process controls", "Inspection and validation methods", "Continuous improvement culture"].map((item, index) => (
                     <li key={index} className="flex items-center gap-3 text-lg text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {item}
                     </li>
                   ))}
                 </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
                  <h3 className="text-2xl font-bold text-primary mb-6">Our Quality Focus</h3>
                  <ul className="space-y-4">
                    {[
                      "Dimensional and functional consistency",
                      "Robust manufacturing controls",
                      "Performance-based approach to production",
                      "Commitment to customer satisfaction"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                         <div className="bg-green-100 p-1 rounded-full text-green-600 mt-1">
                           <Check className="w-4 h-4" />
                         </div>
                         <span className="text-lg font-medium text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
              </div>
           </div>
        </section>
        
        {/* Certifications Placeholder */}
        <section className="text-center">
           <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-8">Certifications</h2>
           <div className="flex flex-wrap justify-center gap-8">
              {/* Add ISO/IATF badges here later */}
              <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-300">
                 ISO 9001
              </div>
              <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-300">
                 IATF 16949
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
