'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin, FileDown } from 'lucide-react';
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
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {contact.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200"
          >
             {contact.description}
          </motion.p>
        </div>
      </section>

      <div className="py-20 container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >

            <div className="space-y-8 bg-stone-50 p-8 rounded-2xl">
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
            
            <div className="pt-4">
              <Button size="lg" className="h-14 w-full md:w-auto bg-black text-white px-8 text-lg font-bold group">
                 <FileDown className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" /> Download Company Profile
              </Button>
            </div>

          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl font-bold mb-8">Request a Quote (RFQ)</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                 <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Part Drawing / Image</label>
                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="text-gray-500">Click to upload file</p>
                 </div>
              </div>

              <div className="space-y-2">
                 <label htmlFor="material" className="text-sm font-bold uppercase tracking-widest text-gray-500">Material Requirement</label>
                 <input type="text" id="material" className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="Start typing..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label htmlFor="quantity" className="text-sm font-bold uppercase tracking-widest text-gray-500">Quantity / Volume</label>
                    <input type="text" id="quantity" className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="Annual volume" />
                 </div>
                 <div className="space-y-2">
                    <label htmlFor="orderType" className="text-sm font-bold uppercase tracking-widest text-gray-500">Order Frequency</label>
                    <div className="relative">
                      <select id="orderType" className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg bg-transparent appearance-none cursor-pointer">
                        <option value="one-time">One Time Order</option>
                        <option value="repetitive">Repetitive Order</option>
                      </select>
                       {/* Custom Arrow */}
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <label htmlFor="location" className="text-sm font-bold uppercase tracking-widest text-gray-500">Delivery Location</label>
                    <input type="text" id="location" className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="City/Country" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label htmlFor="details" className="text-sm font-bold uppercase tracking-widest text-gray-500">Application Details</label>
                 <textarea id="details" rows={4} className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg resize-none" placeholder="Additional details..."></textarea>
              </div>

              <Button size="lg" className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                 Submit RFQ
              </Button>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
