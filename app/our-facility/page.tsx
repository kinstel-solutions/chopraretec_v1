'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { IllustrationWrapper } from '@/components/ui/IllustrationWrapper';

export default function OurFacilityPage() {
  const sections = [
    {
      title: 'Advanced Manufacturing Hub',
      description: 'Our Lucknow facility is equipped with modern compression and injection molding machines, ensuring high-volume repeatability and precision.',
      image: '/real-assets/moulding-1.webp',
      align: 'right' as const
    },
    {
      title: 'In-House Tool Room',
      description: 'Speed to market is critical. Our dedicated tool room with VMC and CNC capabilities allows us to design, fabricate, and maintain molds internally, reducing lead times significantly.',
      image: '/real-assets/tool-making-3.webp',
      align: 'left' as const
    },
    {
      title: 'Rubber Compounding & Prep',
      description: 'Quality starts at the mix. We use automated batch weighing systems to ensure every rubber compound meets exact specifications before it even reaches the mold.',
      image: '/real-assets/automated-batch-weighing.webp',
      align: 'right' as const
    },
    {
      title: 'Quality Assurance Lab',
      description: 'Our onsite lab features rheometers, tensile testers, and other critical testing equipment to validate material properties and finished part performance.',
      image: '/real-assets/test-lab.webp',
      align: 'left' as const
    },
    {
      title: 'Foundational Strength',
      description: 'From raw material storage to final dispatch, our shop floor is organized for efficiency, safety, and scalability.',
      image: '/real-assets/shop-floor.webp',
      align: 'right' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
             src="/real-assets/DSC_4040-Edit-2.webp"
             alt="Chopra Retec Facility"
             fill
             className="object-cover brightness-[0.4]"
             priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            World-Class Infrastructure
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200"
          >
            Merging decades of expertise with modern technology in Lucknow, India.
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="py-20 container mx-auto px-4 md:px-8 space-y-32">
        {sections.map((section, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${section.align === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}
          >
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{section.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            </div>
            <div className="flex-1 w-full max-w-xl mx-auto lg:max-w-none">
               <IllustrationWrapper align={section.align}>
                 <Image 
                   src={section.image}
                   alt={section.title}
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-110"
                 />
               </IllustrationWrapper>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
