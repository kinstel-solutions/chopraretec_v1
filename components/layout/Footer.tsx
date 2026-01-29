import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative h-48 w-48">
                <Image 
                  src="/logos/_2291947363488dark-mode-noBG.svg"
                  alt="Chopra Retec"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-xs text-white/50 uppercase tracking-widest pl-1">Rubber Technology Excellence</p>
            </div>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              Manufacturing precision molded rubber and rubber-to-metal bonded components for valued customers worldwide, since 1996.
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
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#capabilities" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link href="/#quality" className="hover:text-white transition-colors">Quality & Standards</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">Solutions</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/#industries" className="hover:text-white transition-colors">Industries Served</Link></li>
              <li><Link href="/#products" className="hover:text-white transition-colors">Product Range</Link></li>
              <li><Link href="/#products" className="hover:text-white transition-colors">Custom Molding</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Request Quote</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">Get In Touch</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Corporate & Registered Office:<br /> 6-B, Way Road, Lucknow-226001 (U.P.) India.
                 
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>               
Manufacturing Plant:<br /> Plot No. 544A/ 544B, Dewa Chinhat Road, Lucknow-227105 (U.P.) India.
                 
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 9839014750  </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:chopra@chopraretec.com" className="hover:text-white transition-colors">
                   chopra@chopraretec.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary/90 shrink-0" />
                <a href="mailto:anurag@chopraretec.com" className="hover:text-white transition-colors">
                   anurag@chopraretec.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
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

{/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center mb-6 md:mb-8 gap-x-3 gap-y-2 text-sm md:text-lg lg:text-xl font-medium text-gray-100/90 tracking-wide"
          >
            {['Automotive', 'Industrial', 'Healthcare', 'Defence', 'Material Handling'].map((industry) => (
              <div key={industry} className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                 {industry}
              </div>
            ))}
          </motion.div>

        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 md:mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-2xl leading-[1.1] text-white">
             Precision Molded Rubber & <br className="hidden md:block" />
             Rubber-to-Metal Bonded Components
            </h1>
          </motion.div>

     
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-3xl text-gray-200 font-light leading-relaxed tracking-wide drop-shadow-lg flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-red-500 inline-block" /> 
            Chopra Retec: Trusted for Reliability
          </motion.p> */}