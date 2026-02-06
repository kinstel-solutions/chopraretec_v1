'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, Play } from 'lucide-react';
import { pagesData } from '@/data/pages';

export default function AboutPage() {
  const { about } = pagesData;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Video Hero Section */}
      <section className="relative w-full aspect-video max-h-screen bg-black overflow-hidden group">
        <video
          ref={videoRef}
          src={about.videoSource}
          className="w-full h-full object-cover"
          poster={about.videoThumbnail || about.heroImage}
          controls={isPlaying}
          playsInline
          onEnded={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom Overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-black/50"
              onClick={handlePlay}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto hover:scale-110 transition-transform duration-300 border-2 border-white/50">
                  <span className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-none ml-2 relative z-10" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide mb-6">
                  Our Journey and Our Vision
                </h2>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="h-1 bg-primary mx-auto rounded-full"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="py-20 container mx-auto px-4 md:px-8 space-y-20">
        
        {/* Corporate Video */}
        <section className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{about.videoTitle}</h2>
            <p className="text-lg text-muted-foreground mt-4">{about.videoSubtitle}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-sm overflow-hidden shadow-2xl border bg-black/5"
          >
            <video
              src={about.videoSource}
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
              playsInline
              poster={about.videoThumbnail || about.heroImage} // Fallback to hero image if no specific thumbnail
            >
              {about.heading}
            </motion.h1>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-2xl text-muted-foreground leading-relaxed"
            >
               {about.intro[0]}
            </motion.p>
        </div>

        {/* Intro Continuation */}
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {about.intro[1]}
          </motion.p>
        </section>

        {/* Separator */}
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />

        {/* Our Strengths */}
        <section className="bg-primary text-white p-10 md:p-16 rounded-sm shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Strengths</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.strengths.map((strength, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white/10 p-6 rounded-sm backdrop-blur-sm"
              >
                <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                <p className="text-lg font-medium">{strength}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Separator */}
        <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />

        {/* Factory Building */}
        <section className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Plant</h2>
            <p className="text-lg text-muted-foreground mt-4">Located in Lucknow, India</p>
          </div>
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative rounded-sm overflow-hidden shadow-2xl border"
          >
            <Image
              src={about.factoryImage}
              alt="Chopra Retec Factory Building"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              className="object-cover"
            />
          </motion.div>
        </section>

      </div>
    </div>
  );
}
