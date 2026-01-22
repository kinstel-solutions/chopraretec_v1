'use client';

import { motion } from 'framer-motion';

const capabilities = [
  {
    title: "Precision Rubber Moulding",
    description: "We manufacture molded rubber components using stable processes designed for durability, dimensional accuracy and repeat performance."
  },
  {
    title: "Rubber-to-Metal Bonding",
    description: "We specialise in rubber-to-metal bonded parts engineered for vibration isolation, structural integrity and long service life."
  },
  {
    title: "Tooling & Development Support",
    description: "We support new part development through tooling coordination, feasibility support and process optimization for repeat manufacturing."
  },
  {
    title: "Materials & Compounds",
    description: "We work with a wide range of rubber materials and blends to meet application needs such as: Oil resistance, Heat and aging resistance, Vibration damping, Strength and durability."
  },
  {
    title: "Testing & Quality Assurance",
    description: "Quality is supported through inspection processes and validation methods designed to ensure consistent product performance and compliance."
  },
  {
    title: "Export & Packaging Readiness",
    description: "With long-standing export capability, we provide: Global packing standards, Labelling and documentation support, Reliable dispatch planning, International customer servicing."
  }
];

export default function CapabilitiesPage() {
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
            Capabilities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            At Chopra Retec, our capabilities are built to support customers from development stage to high-volume repeat production — with consistent output, reliable lead times and quality confidence.
          </motion.p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {capabilities.map((cap, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{cap.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg pl-14">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-secondary/20 p-10 rounded-2xl"
        >
          <p className="text-xl font-bold text-primary mb-6">
             For RFQs, send drawings / samples / specifications to our team.
          </p>
          <a href="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
            Contact Us
          </a>
        </motion.div>

      </div>
    </div>
  );
}
