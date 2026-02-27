"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useInView } from "framer-motion";

import { origin, destinationCountries } from "../../data/country-data";

export function GlobalReachMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHovering = useRef(false);
  const isInView = useInView(canvasRef, { once: false, amount: 0.1 });

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

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
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.8, 0.1, 0.1], // Red glow
      glowColor: [0.5, 0, 0], // Dark red glow
      markers: markers.map((m) => ({
        location: m.location as [number, number],
        size: m.size,
      })),
      onRender: (state) => {
        // Only update if in view
        if (!isInView) return;

        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        // Default slow speed: 0.003
        // Hover even slower: 0.001
        phi += isHovering.current ? 0.001 : 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [isInView]);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: "1" }}
        className="opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-grab active:cursor-grabbing"
        onPointerEnter={() => (isHovering.current = true)}
        onPointerLeave={() => (isHovering.current = false)}
      />
      {/* <div className="absolute bottom-4 left-4 md:left-8 pointer-events-none">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                <span className="text-white text-sm font-bold tracking-wider">LUCKNOW HQ</span>
            </div>
            <p className="text-xs text-gray-300">Connecting strictly controlled aerospace supply chains.</p>
        </div> */}
    </div>
  );
}
