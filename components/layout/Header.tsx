'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/about', label: 'ABOUT US' },
    { href: '/#industries', label: 'INDUSTRIES' },
    { href: '/#products', label: 'PRODUCTS' },
    { href: '/#capabilities', label: 'CAPABILITIES' },
    { href: '/#quality', label: 'QUALITY' },
    { href: '/#contact', label: 'CONTACT' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300 border-transparent',
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md border-border py-4 shadow-sm text-black'
            : 'bg-gradient-to-b  from-black/50 to-transparent py-6 text-white'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
         
          {/* Logo */}
          <Link 
            href="/" 
            className="group relative z-10 block" 
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative h-12 w-48 md:h-16 md:w-64 transition-all duration-300">
               <Image 
                 src="/chopra-OG-logo.png" 
                 alt="Chopra Retec" 
                 fill
                 className="object-contain object-left"
                 priority
               />
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {/* Desktop Nav */}
            <nav className={cn(
              "hidden lg:flex items-center gap-8 text-sm font-medium tracking-widest transition-colors duration-300",
               isScrolled ? "text-secondary-foreground" : "text-white"
            )}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:opacity-70 transition-opacity">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("lg:hidden relative z-10", !isScrolled && !isMobileMenuOpen && "hover:bg-white/10 hover:text-white")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
            

          </div>



          {/* CTA Button
          <div className="flex items-center gap-2">
             <Link href="/contact">
              <Button size="sm" className={cn("hidden md:inline-flex transition-colors text-xs font-bold tracking-widest", !isScrolled && !isMobileMenuOpen && "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 text-white")}>
                REQUEST QUOTE
              </Button>
            </Link>
          </div> */}
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 overflow-y-auto"
          >
            <nav className="flex flex-col items-center space-y-8 mt-12 pb-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-xl font-serif font-medium tracking-wide text-black hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/#contact" 
                className="mt-8 bg-primary text-white px-8 py-3 text-sm font-bold tracking-[0.15em] uppercase w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

