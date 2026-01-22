import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <h2 className="font-serif text-2xl">Massey Production</h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Where moments become timeless memories. We're passionate about capturing the emotions, 
              the laughter, and the love that make your story uniquely beautiful.
            </p>
            {/* Social Media */}
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold mb-6 text-gray-400">Quick Links</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/#about" className="hover:text-gray-300 transition-colors">About Us</Link></li>
              <li><Link href="/#portfolio" className="hover:text-gray-300 transition-colors">Portfolio</Link></li>
              <li><Link href="/#services" className="hover:text-gray-300 transition-colors">Services</Link></li>
              <li><Link href="/#process" className="hover:text-gray-300 transition-colors">Our Process</Link></li>
              <li><Link href="/#contact" className="hover:text-gray-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold mb-6 text-gray-400">Services</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/services/wedding-events" className="hover:text-gray-300 transition-colors">Weddings & Events</Link></li>
              <li><Link href="/services/commercial-corporate" className="hover:text-gray-300 transition-colors">Commercial & Corporate</Link></li>
              <li><Link href="/services/fashion-portfolios" className="hover:text-gray-300 transition-colors">Fashion & Portfolios</Link></li>
              <li><Link href="/#contact" className="hover:text-gray-300 transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold mb-6 text-gray-400">Contact Us</h3>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Hazratganj, Lucknow<br />Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hello@masseyproduction.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-light">
            © {new Date().getFullYear()} Massey Production. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-xs font-light">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

