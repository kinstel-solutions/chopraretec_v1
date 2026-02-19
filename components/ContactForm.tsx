'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    const formData = new FormData(form);
    if (selectedFile) {
        formData.append('file', selectedFile);
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      // Reset form
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send request');
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        // Check file size (e.g. 4MB limit)
        if (file.size > 4 * 1024 * 1024) {
            alert("File size must be less than 4MB");
            return;
        }
        setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-500">Full Name</label>
            <input name="name" type="text" id="name" required className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-bold uppercase tracking-widest text-gray-500">Company Name</label>
            <input name="company" type="text" id="company" className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="Company Name (Optional)" />
        </div>
        <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-500">Email Address</label>
            <input name="email" type="email" id="email" required className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
            <input name="phone" type="tel" id="phone" required className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Part Drawing / Image</label>
        <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative"
        >
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
                accept="image/*,.pdf"
            />
            {selectedFile ? (
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                    <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(); }} className="p-1 hover:bg-gray-200 rounded-full">
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Upload className="w-8 h-8 opacity-50" />
                    <p>Click to upload file (Max 4MB)</p>
                </div>
            )}
        </div>
      </div>

      <div className="space-y-2">
         <label htmlFor="material" className="text-sm font-bold uppercase tracking-widest text-gray-500">Material Requirement</label>
         <input name="material" type="text" id="material" required className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="Start typing..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-bold uppercase tracking-widest text-gray-500">Quantity / Volume</label>
            <input name="quantity" type="text" id="quantity" required className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="Annual volume" />
         </div>
         <div className="space-y-2">
            <label htmlFor="orderType" className="text-sm font-bold uppercase tracking-widest text-gray-500">Order Frequency</label>
            <div className="relative">
              <select name="orderType" id="orderType" className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg bg-transparent appearance-none cursor-pointer">
                <option value="one-time">One Time Order</option>
                <option value="repetitive">Repetitive Order</option>
              </select>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
            </div>
         </div>
         <div className="space-y-2 md:col-span-2">
            <label htmlFor="location" className="text-sm font-bold uppercase tracking-widest text-gray-500">Delivery Location</label>
            <input name="location" type="text" id="location" required className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg" placeholder="City/Country" />
         </div>
      </div>

      <div className="space-y-2">
         <label htmlFor="details" className="text-sm font-bold uppercase tracking-widest text-gray-500">Application Details</label>
         <textarea name="details" id="details" rows={4} className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg resize-none" placeholder="Additional details..."></textarea>
      </div>

       {/* Spam Protection Fields */}
       <div className="hidden" aria-hidden="true">
           <label htmlFor="confirm_email">Don't fill this out if you're human:</label>
           <input
               type="text"
               name="confirm_email"
               id="confirm_email"
               tabIndex={-1}
               autoComplete="off"
           />
           <input
               type="hidden"
               name="form_start_time"
               value={Date.now()}
           />
       </div>

      <Button disabled={isLoading} size="lg" className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
         {isLoading ? (
            <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
            </>
         ) : (
            'Submit RFQ'
         )}
      </Button>

      {status === 'success' && (
        <div className="p-4 bg-green-50 text-green-700 rounded-sm text-center">
            Request sent successfully! We will get back to you soon.
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-50 text-red-700 rounded-sm text-center">
            {errorMessage}
        </div>
      )}
    </form>
  );
}
