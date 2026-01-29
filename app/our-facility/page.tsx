'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';


import { pagesData } from '@/data/pages';

export default function OurFacilityPage() {
  const { facility } = pagesData;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
             src={facility.heroImage}
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
            {facility.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200"
          >
            {facility.subHeading}
          </motion.p>
        </div>
      </section>

      {/* Process Story Sections */}
      <div className="py-20 container mx-auto px-4 md:px-8 space-y-32">
        {facility.processSteps.map((step, stepIndex) => (
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-10"
          >
            {/* Section Header */}
            <div className={`flex flex-col ${stepIndex % 2 === 0 ? 'lg:items-start text-left' : 'lg:items-end text-right'} space-y-4`}>
              <div className="flex items-center gap-4">
                <span className="text-6xl font-black text-gray-200 dark:text-gray-800 select-none">
                  0{stepIndex + 1}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground">{step.title}</h2>
              </div>
              <p className="text-lg text-muted-foreground w-full max-w-2xl leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Custom Grid Layouts based on Step Index - NO CROPPING */ }
            <div className="w-full">
              {/* Engineering (Index 0): First image full width, others 2x2 grid */}
              {stepIndex === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Image - Full Width */}
                  {step.images[0] && (
                    <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-lg group bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={step.images[0].src}
                        alt={step.images[0].alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-2xl font-bold">{step.images[0].alt}</p>
                      </div>
                    </div>
                  )}
                  {/* Remaining Images - 2x2 Grid */}
                  {step.images.slice(1).map((img, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden shadow-md group border bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <p className="text-white font-medium text-center">{img.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Production (Index 1): 3-Column Layout */}
              {stepIndex === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                  {/* Column 1: Image 1 */}
                  <div className="flex flex-col gap-6">
                    {step.images[0] && (
                      <div className="relative rounded-2xl overflow-hidden shadow-lg group bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={step.images[0].src}
                          alt={step.images[0].alt}
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ width: '100%', height: 'auto' }}
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xl font-bold">{step.images[0].alt}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Column 2: Stack of Image 2 & 3 */}
                  <div className="flex flex-col gap-6">
                    {step.images.slice(1, 3).map((img, i) => (
                      <div key={i} className="relative rounded-2xl overflow-hidden shadow-md group bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ width: '100%', height: 'auto' }}
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white font-medium">{img.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Column 3: Stack of Image 4 & 5 */}
                  <div className="flex flex-col gap-6">
                    {step.images.slice(3, 5).map((img, i) => (
                      <div key={i} className="relative rounded-2xl overflow-hidden shadow-md group bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ width: '100%', height: 'auto' }}
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white font-medium">{img.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality (Index 2): 2 Full Width Rows + 1 Split Row */}
              {stepIndex === 2 && (
                <div className="space-y-6">
                  {/* Row 1: Image 1 Full Width */}
                  {step.images[0] && (
                    <div className="relative rounded-3xl overflow-hidden shadow-lg group bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={step.images[0].src}
                        alt={step.images[0].alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xl font-bold">{step.images[0].alt}</p>
                      </div>
                    </div>
                  )}
                  {/* Row 2: Image 2 Full Width */}
                  {step.images[1] && (
                    <div className="relative rounded-3xl overflow-hidden shadow-lg group bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={step.images[1].src}
                        alt={step.images[1].alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xl font-bold">{step.images[1].alt}</p>
                      </div>
                    </div>
                  )}
                  {/* Row 3: Split Row (Image 3 & 4) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {step.images.slice(2).map((img, i) => (
                      <div key={i} className="relative rounded-2xl overflow-hidden shadow-md group bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ width: '100%', height: 'auto' }}
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white font-medium">{img.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Packaging (Index 3): Single Column Stack */}
              {stepIndex === 3 && (
                <div className="space-y-8 w-full">
                  {step.images.map((img, i) => (
                    <div key={i} className="relative rounded-3xl overflow-hidden shadow-lg group border bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-2xl font-bold">{img.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
