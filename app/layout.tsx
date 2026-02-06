import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { StructuredData } from '@/components/seo/StructuredData';
import { Analytics } from "@vercel/analytics/next"

import { Loader } from '@/components/ui/Loader';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chopraretec.com'),
  title: {
    default: 'Chopra Retec | Precision Molded Rubber & Rubber-to-Metal Components',
    template: '%s | Chopra Retec'
  },
  description: 'Versatile manufacturing solutions for Automotive, Industrial, Defense, Aerospace, Material Handling and Healthcare applications. 30+ years of excellence.',
  keywords: ['Rubber Components', 'Rubber-to-Metal Bonding', 'Automotive Rubber', 'Industrial Rubber', 'Chopra Retec', 'Precision Molding', 'India Manufacturing'],
  authors: [{ name: 'Chopra Retec' }],
  creator: 'Chopra Retec',
  openGraph: {
    title: 'Chopra Retec | Precision Molded Rubber & Rubber-to-Metal Components',
    description: 'Versatile manufacturing solutions for Automotive, Industrial, Defense, Aerospace, Material Handling and Healthcare applications.',
    url: 'https://chopraretec.com',
    siteName: 'Chopra Retec',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logos/GroupNo-text-light-mode-noBG.svg',
    shortcut: '/logos/GroupNo-text-light-mode-noBG.svg',
    apple: '/logos/GroupNo-text-light-mode-noBG.svg',
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(roboto.variable)} suppressHydrationWarning>
      <body className="font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-white">
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            forcedTheme="light"
            disableTransitionOnChange
          >
          <Loader />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Analytics />
          <StructuredData />
        </ThemeProvider>
      </body>
    </html>
  );
}
