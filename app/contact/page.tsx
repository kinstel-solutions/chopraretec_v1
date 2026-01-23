'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 mt-18">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Contact Us</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Let’s discuss your requirement. Send your drawing, sample or specifications — our team will respond promptly.
              </p>
            </div>

            <div className="space-y-8 bg-stone-50 p-8 rounded-2xl">
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Chopra Retec Rubber Products Limited</h3>
                    <p className="text-gray-600">
                       Full Address Here<br />
                       Lucknow, India
                    </p>
                 </div>
              </div>

              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+91 [Number Here]</p>
                 </div>
              </div>

              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@chopraretec.com</p>
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
