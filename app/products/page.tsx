'use client';

import { motion } from 'framer-motion';

const products = [
  {
    title: "Anti-Vibration & Mounting Components",
    description: "Engineered for vibration isolation and noise reduction in machinery and vehicles."
  },
  {
    title: "Exhaust Suspension Components",
    description: "Proven products for automotive aftermarket and industrial exhaust support applications."
  },
  {
    title: "Rubber-to-Metal Bonded Parts",
    description: "Bonded assemblies designed for high strength, repeat performance and service durability."
  },
  {
    title: "Ride Control & Bush Components",
    description: "Durable rubber parts supporting suspension and mechanical motion applications."
  },
  {
    title: "Buffers, Grommets & General Moldings",
    description: "General-purpose molded rubber components manufactured to customer-specific sizes and performance needs."
  },
  {
    title: "Custom Engineered Parts",
    description: "We specialise in customer-specific development based on drawings, samples or application requirements."
  }
];

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary"
          >
            Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Chopra Retec manufactures a wide portfolio of molded rubber and rubber-to-metal bonded components. To ensure clarity and ease of selection, our products are organized into major categories:
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((prod, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">{prod.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {prod.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-black text-white p-8 rounded-2xl max-w-2xl w-full relative overflow-hidden">
             <div className="relative z-10 space-y-4">
               <p className="text-2xl font-bold">
                 Send your RFQ to receive product feasibility, pricing and lead times.
               </p>
               <a href="/contact" className="inline-block px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-gray-100 transition-colors mt-4">
                 Get Started
               </a>
             </div>
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl -mr-10 -mt-10" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -ml-10 -mb-10" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
