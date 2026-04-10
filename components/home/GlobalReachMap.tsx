"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useInView } from "framer-motion";

import { origin, destinationCountries } from "../../data/country-data";

export function GlobalReachMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHovering = useRef(false);
  const isInViewRef = useRef(false);
  
  // High performance visibility tracking
  const isInView = useInView(canvasRef, { once: false, amount: 0.1 });
  
  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    // Mobile optimization: Adjust size and sampling
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const size = isMobile ? 400 : 600;
    const samples = isMobile ? 8000 : 12000;

    const markers = [
      // Origin
      { location: [origin.coordinates[1], origin.coordinates[0]], size: 0.1 },
      // Destinations
      ...destinationCountries.map((country) => ({
        location: [country.coordinates[1], country.coordinates[0]],
        size: 0.05,
      })),
    ];

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: size * Math.min(window.devicePixelRatio, 2),
      height: size * Math.min(window.devicePixelRatio, 2),
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: samples,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.8, 0.1, 0.1], // Red glow
      glowColor: [0.5, 0, 0], // Dark red glow
      markers: markers.map((m) => ({
        location: m.location as [number, number],
        size: m.size,
      })),
      onRender: (state) => {
        // Optimization: Skip all math and GL updates if not in view
        if (!isInViewRef.current) return;

        state.phi = phi;
        phi += isHovering.current ? 0.001 : 0.005;
      },
    });

    // Fade in after initialization for premium feel
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "0.8";
    }, 100);

    return () => {
      globe.destroy();
    };
  }, []); // Initialize only ONCE on mount

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ 
          width: 600, 
          height: 600, 
          maxWidth: "100%", 
          aspectRatio: "1",
          opacity: 0,
          transition: 'opacity 1s ease'
        }}
        className="hover:opacity-100 transition-opacity duration-500 cursor-grab active:cursor-grabbing"
        onPointerEnter={() => (isHovering.current = true)}
        onPointerLeave={() => (isHovering.current = false)}
      />
    </div>
  );
}
