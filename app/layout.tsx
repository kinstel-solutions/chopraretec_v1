import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'Chopra Retec | Precision Molded Rubber & Rubber-to-Metal Components',
  description: 'Versatile manufacturing solutions for Automotive, Industrial, Defence, Aerospace, Material Handling and Healthcare applications. 30+ years of excellence.',
  keywords: ['Rubber Components', 'Rubber-to-Metal Bonding', 'Automotive Rubber', 'Industrial Rubber', 'Chopra Retec', 'Precision Molding'],
  openGraph: {
    title: 'Chopra Retec | Precision Molded Rubber & Rubber-to-Metal Components',
    description: 'Versatile manufacturing solutions for Automotive, Industrial, Defence, Aerospace, Material Handling and Healthcare applications.',
    url: 'https://chopraretec.com', // Placeholder URL
    siteName: 'Chopra Retec',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(nunitoSans.variable)}>
      <body className="font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
