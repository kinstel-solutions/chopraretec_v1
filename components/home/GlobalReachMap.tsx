'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';


export function GlobalReachMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

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
      markers: [
        // Lucknow (approx)
        { location: [26.8467, 80.9462], size: 0.1 },
        // USA (East Coast)
        { location: [40.7128, -74.0060], size: 0.05 },
        // Europe (Germany)
        { location: [51.1657, 10.4515], size: 0.05 },
        // UK
        { location: [55.3781, -3.4360], size: 0.05 },
        // Middle East (Dubai)
        { location: [25.2048, 55.2708], size: 0.05 },
        // Asia (Japan)
        { location: [36.2048, 138.2529], size: 0.05 },
      ],
      onRender: (state) => {
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
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        <canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: '1' }}
            className="opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-grab active:cursor-grabbing"
            onPointerEnter={() => (isHovering.current = true)}
            onPointerLeave={() => (isHovering.current = false)}
        />
        <div className="absolute bottom-4 left-4 md:left-8 pointer-events-none">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                <span className="text-white text-sm font-bold tracking-wider">LUCKNOW HQ</span>
            </div>
            <p className="text-xs text-gray-400">Connecting strictly controlled aerospace supply chains.</p>
        </div>
    </div>
  );
}
