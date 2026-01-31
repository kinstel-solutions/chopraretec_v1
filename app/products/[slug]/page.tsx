import { ProductHero } from '@/components/products/ProductHero';
import { ProductShowcase } from '@/components/products/ProductShowcase';
import { homeData } from '@/data/home';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';

export function generateStaticParams() {
  return homeData.products.items
    .filter((p: any) => p.layout === 'page' && p.slug)
    .map((p: any) => ({
      slug: p.slug,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = homeData.products.items.find(
    (p: any) => p.slug === slug
  );

  if (!product || !product.details) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <ProductHero
        image={product.image}
        title={product.title}
        tagline={product.details.tagline}
      />

      <section className="py-20 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            {product.details.subHeading}
          </h2>
          <p className="text-xl text-zinc-600 leading-relaxed">
            {product.details.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 text-left">
             {product.details.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-6 bg-zinc-50 rounded-lg border border-zinc-100">
                   <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0" />
                   <p className="font-medium text-zinc-800">{feature}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      <ProductShowcase 
        items={product.details.showcase} 
        productTitle={product.title} 
      />
    </main>
  );
}
