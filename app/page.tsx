import { Hero } from '@/components/home/Hero';
import { Industries } from '@/components/home/Industries';
import { Products } from '@/components/home/Products';
import { Capabilities } from '@/components/home/Capabilities';
import { Awards } from '@/components/home/Awards';
import { Quality } from '@/components/home/Quality';
import { GlobalReach } from '@/components/home/GlobalReach';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Industries />
      <Products />
      <Capabilities />
      <Awards />
      <Quality />
      <GlobalReach />
      <CTASection />
    </div>
  );
}

