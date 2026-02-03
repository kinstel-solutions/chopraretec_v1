import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chopra Retec Rubber Products',
    short_name: 'Chopra Retec',
    description: 'Precision Molded Rubber & Rubber-to-Metal Components Manufacturer',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/logos/GroupNo-text-light-mode-noBG.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
