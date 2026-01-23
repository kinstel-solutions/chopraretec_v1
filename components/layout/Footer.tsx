import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold uppercase tracking-wider">Chopra Retec</h2>
              <p className="text-xs text-white/50 mt-2 uppercase tracking-widest">Rubber Technology Excellence</p>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Manufacturing precision molded rubber and rubber-to-metal bonded components for global industries since 1990.
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link href="/#quality" className="hover:text-white transition-colors">Quality & Standards</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">Solutions</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/#industries" className="hover:text-white transition-colors">Industries Served</Link></li>
              <li><Link href="/#products" className="hover:text-white transition-colors">Product Range</Link></li>
              <li><Link href="/#products" className="hover:text-white transition-colors">Custom Molding</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Request Quote</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">Get In Touch</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Plot No. 123, Industrial Area,<br />
                  Chennai, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@chopraretec.com" className="hover:text-white transition-colors">
                  info@chopraretec.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {currentYear} Chopra Retec Rubber Products. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

