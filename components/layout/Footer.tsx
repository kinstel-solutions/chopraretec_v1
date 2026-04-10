import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { companyData } from "@/data/company";
import { navigationData } from "@/data/navigation";
import { AgencyCredit } from "@/components/ui/AgencyCredit";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative h-28 w-48">
                <Image
                  src="/logos/_2291947363488dark-mode-noBG.svg"
                  alt={companyData.shortName}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-xs text-white/50 uppercase tracking-widest pl-1">
                {companyData.tagline}
              </p>
            </div>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              {companyData.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {navigationData.footer.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">
              Solutions
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {navigationData.footer.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="uppercase tracking-widest text-xs font-bold mb-6 text-primary">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Corporate & Registered Office:
                  <br /> {companyData.contact.address.registered}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Manufacturing Plant:
                  <br /> {companyData.contact.address.plant}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>{companyData.contact.phone[0]}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>{companyData.contact.phone[1]}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href={`mailto:${companyData.contact.email[0]}`}
                  className="hover:text-white transition-colors">
                  {companyData.contact.email[0]}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary/90 shrink-0" />
                <a
                  href={`mailto:${companyData.contact.email[1]}`}
                  className="hover:text-white transition-colors">
                  {companyData.contact.email[1]}
                </a>
              </li>

              {/* Social Media */}
              <li className="pt-4 flex gap-4 flex-wrap">
                {companyData.social.linkedin && (
                  <Link
                    href={companyData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </Link>
                )}
                {companyData.social.facebook && (
                  <Link
                    href={companyData.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </Link>
                )}
                {companyData.social.youtube && (
                  <Link
                    href={companyData.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    aria-label="YouTube">
                    <Youtube className="w-4 h-4" />
                  </Link>
                )}
                {companyData.social.x && (
                  <Link
                    href={companyData.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    aria-label="X (Twitter)">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="w-4 h-4 fill-current">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </Link>
                )}
                {companyData.social.instagram && (
                  <Link
                    href={companyData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white transition-all"
                    aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </Link>
                )}
                {companyData.social.whatsapp && (
                  <Link
                    href={companyData.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                    aria-label="WhatsApp">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {currentYear} {companyData.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <AgencyCredit />
          </div>
        </div>
      </div>
    </footer>
  );
}

{
  /* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center mb-6 md:mb-8 gap-x-3 gap-y-2 text-sm md:text-lg lg:text-xl font-medium text-gray-100/90 tracking-wide"
          >
            {['Automotive', 'Industrial', 'Healthcare', 'Defense', 'Material Handling'].map((industry) => (
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
          </motion.p> */
}
