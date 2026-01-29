import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Facebook } from 'lucide-react';
import { companyData } from '@/data/company';
import { navigationData } from '@/data/navigation';

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
                  alt={companyData.shortName}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-xs text-white/50 uppercase tracking-widest pl-1">{companyData.tagline}</p>
            </div>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              {companyData.description}
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
              <Link href={companyData.social.linkedin} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href={companyData.social.facebook} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">Company</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {navigationData.footer.company.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">Solutions</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {navigationData.footer.solutions.map((link) => (
                <li key={link.label}><Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">Get In Touch</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Corporate & Registered Office:<br /> {companyData.contact.address.registered}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>               
                   Manufacturing Plant:<br /> {companyData.contact.address.plant}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>{companyData.contact.phone[0]}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${companyData.contact.email[0]}`} className="hover:text-white transition-colors">
                   {companyData.contact.email[0]}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary/90 shrink-0" />
                <a href={`mailto:${companyData.contact.email[1]}`} className="hover:text-white transition-colors">
                   {companyData.contact.email[1]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>
            © {currentYear} {companyData.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
             {navigationData.footer.legal.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
              ))}
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