import { MetadataRoute } from 'next';
import { homeData } from '@/data/home';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = homeData.products.items
    .filter((p: any) => p.slug)
    .map((product: any) => ({
      url: `https://chopraretec.com/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  const staticPages = [
    {
      url: 'https://chopraretec.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://chopraretec.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://chopraretec.com/our-facility',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://chopraretec.com/certifications',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://chopraretec.com/awards-media',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://chopraretec.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [...staticPages, ...products];
}
