import dynamic from 'next/dynamic';
import { Hero } from '@/components/home/Hero';
import { Industries } from '@/components/home/Industries';
import { Why_Us } from '@/components/home/Why_Us';

// Lazy load below-fold components for better performance
const Products = dynamic(() => import('@/components/home/Products').then(mod => ({ default: mod.Products })), {
  loading: () => <div className="py-20 md:py-32 bg-white" />
});

const Capabilities = dynamic(() => import('@/components/home/Capabilities').then(mod => ({ default: mod.Capabilities })), {
  loading: () => <div className="py-20 md:py-32 bg-secondary/10" />
});

const Awards = dynamic(() => import('@/components/home/Awards').then(mod => ({ default: mod.Awards })), {
  loading: () => <div className="py-16 bg-stone-50" />
});

const Quality = dynamic(() => import('@/components/home/Quality').then(mod => ({ default: mod.Quality })), {
  loading: () => <div className="py-20 md:py-32" />
});

const GlobalReach = dynamic(() => import('@/components/home/GlobalReach').then(mod => ({ default: mod.GlobalReach })), {
  loading: () => <div className="py-20 md:py-32 bg-secondary/10" />
});

const CTASection = dynamic(() => import('@/components/home/CTASection').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 bg-primary" />
});

const WhyUs = dynamic(() => import('@/components/home/WhyUs').then(mod => ({ default: mod.WhyUs })), {
  loading: () => <div className="py-20 md:py-32 bg-stone-50" />
});

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Industries />
      <Products />
      <Why_Us />
      <Capabilities />
      <Awards />
      <Quality />
      {/* <WhyUs /> */}
      <GlobalReach />
      <CTASection />
    </div>
  );
}

