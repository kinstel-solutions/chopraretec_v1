'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin, FileDown } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { companyData } from '@/data/company';
import { pagesData } from '@/data/pages';

export default function ContactPage() {
  const { contact } = pagesData;
  const { contact: companyContact } = companyData;
  const { address } = companyContact;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
             src={contact.heroImage || ''}
             alt="Contact Us"
             fill
             className="object-cover brightness-[0.4]"
             priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {contact.heading}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-1 bg-primary mx-auto rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg mt-4 md:text-2xl text-gray-200"
          >
             {contact.description}
          </motion.p>
        </div>
      </section>

      <div className="py-20 container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-8">Request a Quote (RFQ)</h2>
            <ContactForm />
          </div>


          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >

            <div className="space-y-8 bg-stone-50 p-8 rounded-sm">
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{companyData.name}</h3>
                    <div className="text-gray-600">
                      <span className='text-primary'>Corporate & Registered Office:</span>
                       <br />
                       
                        {address.registered}
                       <br />
                       {/* <div className='h-0.5 w-30 bg-primary/50'></div> */}
                       <div className='h-2'></div>
                       <span className='text-primary'>               
                         Manufacturing Plant:</span>

                      <br /> {address.plant}
                 

                    </div>
                 </div>
              </div>

              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                        {companyContact.phone.map((phone) => (
                          <span key={phone} className="block">{phone}</span>
                        ))}
                    </p>
                 </div>
              </div>

              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                        {companyContact.email.map((email) => (
                          <span key={email} className="block">{email}</span>
                        ))}
                    </p>
                 </div>
              </div>
            </div>
            
            {/* <div className="pt-4">
              <Button size="lg" className="h-14 w-full md:w-auto bg-black text-white px-8 text-lg font-bold group">
                 <FileDown className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" /> Download Company Profile
              </Button>
            </div> */}

          </motion.div>

          
        </div>

      </div>
    </div>
  );
}
