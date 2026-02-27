"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  company: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(100, "Company name is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(100, "Email is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format")
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  material: z
    .string()
    .trim()
    .max(100, "Material text is too long")
    .optional()
    .or(z.literal("")),
  quantity: z
    .string()
    .trim()
    .max(100, "Quantity text is too long")
    .optional()
    .or(z.literal("")),
  orderType: z.string().trim().optional().or(z.literal("")),
  location: z
    .string()
    .trim()
    .max(100, "Location text is too long")
    .optional()
    .or(z.literal("")),
  details: z
    .string()
    .trim()
    .max(1000, "Details are too long")
    .optional()
    .or(z.literal("")),
});

type ValidationErrors = Partial<
  Record<keyof z.infer<typeof contactFormSchema>, string>
>;

import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
//spam and bot protection
function ContactFormContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isUploading) {
      setErrorMessage("Please wait while the image is being uploaded.");
      setStatus("error");
      return;
    }

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      setErrorMessage(
        "Spam protection is initializing or unavailable. Please try again in a moment.",
      );
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Client-side validation
    const formValues = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      material: formData.get("material") as string,
      quantity: formData.get("quantity") as string,
      orderType: formData.get("orderType") as string,
      location: formData.get("location") as string,
      details: formData.get("details") as string,
    };

    const validationResult = contactFormSchema.safeParse(formValues);
    if (!validationResult.success) {
      const fieldErrors: ValidationErrors = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ValidationErrors] = err.message;
        }
      });
      setValidationErrors(fieldErrors);
      setErrorMessage("Please review the form and retry.");
      setStatus("error");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");
    setValidationErrors({});

    try {
      const token = await executeRecaptcha!("contact_form_submit");

      const formData = new FormData(form);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("g-recaptcha-response", token);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      // Reset form
      form.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send request",
      );
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

      setIsUploading(true);
      // Simulate upload delay for better UX and to prevent accidental immediate clicks
      setTimeout(() => {
        setSelectedFile(file);
        setIsUploading(false);
        if (
          status === "error" &&
          errorMessage === "Please wait while the image is being uploaded."
        ) {
          setStatus("idle");
          setErrorMessage("");
        }
      }, 500);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className={`text-sm font-bold uppercase tracking-widest ${validationErrors.name ? "text-red-500" : "text-gray-500"}`}>
            Full Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            className={`w-full border-b-2 outline-none py-3 transition-colors text-lg ${validationErrors.name ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-primary"}`}
            placeholder="John Doe"
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="company"
            className={`text-sm font-bold uppercase tracking-widest ${validationErrors.company ? "text-red-500" : "text-gray-500"}`}>
            Company Name
          </label>
          <input
            name="company"
            type="text"
            id="company"
            className={`w-full border-b-2 outline-none py-3 transition-colors text-lg ${validationErrors.company ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-primary"}`}
            placeholder="Company Name"
          />
          {validationErrors.company && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.company}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className={`text-sm font-bold uppercase tracking-widest ${validationErrors.email ? "text-red-500" : "text-gray-500"}`}>
            Email Address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className={`w-full border-b-2 outline-none py-3 transition-colors text-lg ${validationErrors.email ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-primary"}`}
            placeholder="john@example.com"
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.email}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className={`text-sm font-bold uppercase tracking-widest ${validationErrors.phone ? "text-red-500" : "text-gray-500"}`}>
            Phone Number{" "}
            <span className="text-gray-400 normal-case tracking-normal">
              (Optional)
            </span>
          </label>
          <input
            name="phone"
            type="tel"
            id="phone"
            className={`w-full border-b-2 outline-none py-3 transition-colors text-lg ${validationErrors.phone ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-primary"}`}
            placeholder="+1 (555) 000-0000"
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-widest text-gray-500">
          Part Drawing / Image{" "}
          <span className="text-gray-400 normal-case tracking-normal">
            (Optional)
          </span>
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,.pdf"
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-primary font-medium">
              <Loader2 className="w-8 h-8 opacity-50 animate-spin text-primary" />
              <p>Uploading...</p>
            </div>
          ) : selectedFile ? (
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <span className="truncate max-w-[200px]">
                {selectedFile.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="p-1 hover:bg-gray-200 rounded-full">
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
        <label
          htmlFor="material"
          className={`text-sm font-bold uppercase tracking-widest ${validationErrors.material ? "text-red-500" : "text-gray-500"}`}>
          Material Requirement{" "}
          <span className="text-gray-400 normal-case tracking-normal">
            (Optional)
          </span>
        </label>
        <input
          name="material"
          type="text"
          id="material"
          className={`w-full border-b-2 outline-none py-3 transition-colors text-lg ${validationErrors.material ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-primary"}`}
          placeholder="Start typing..."
        />
        {validationErrors.material && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.material}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className={`text-sm font-bold uppercase tracking-widest ${validationErrors.quantity ? "text-red-500" : "text-gray-500"}`}>
            Quantity / Volume{" "}
            <span className="text-gray-400 normal-case tracking-normal">
              (Optional)
            </span>
          </label>
          <input
            name="quantity"
            type="text"
            id="quantity"
            className={`w-full border-b-2 outline-none py-3 transition-colors text-lg ${validationErrors.quantity ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-primary"}`}
            placeholder="Annual volume"
          />
          {validationErrors.quantity && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.quantity}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="orderType"
            className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Order Frequency{" "}
            <span className="text-gray-400 normal-case tracking-normal">
              (Optional)
            </span>
          </label>
          <div className="relative">
            <select
              name="orderType"
              id="orderType"
              className="w-full border-b-2 border-gray-200 focus:border-primary outline-none py-3 transition-colors text-lg bg-transparent appearance-none cursor-pointer">
              <option value="one-time">One Time Order</option>
              <option value="repetitive">Repetitive Order</option>
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="location"
            className={`text-sm font-bold uppercase tracking-widest ${validationErrors.location ? "text-red-500" : "text-gray-500"}`}>
            Delivery Location{" "}
            <span className="text-gray-400 normal-case tracking-normal">
              (Optional)
            </span>
          </label>
          <input
            name="location"
            type="text"
            id="location"
            className={`w-full border-b-2 outline-none py-3 transition-colors text-lg ${validationErrors.location ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-primary"}`}
            placeholder="City/Country"
          />
          {validationErrors.location && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.location}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="details"
          className={`text-sm font-bold uppercase tracking-widest ${validationErrors.details ? "text-red-500" : "text-gray-500"}`}>
          Application Details{" "}
          <span className="text-gray-400 normal-case tracking-normal">
            (Optional)
          </span>
        </label>
        <textarea
          name="details"
          id="details"
          rows={4}
          className={`w-full border-b-2 outline-none py-3 transition-colors text-lg resize-none ${validationErrors.details ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-primary"}`}
          placeholder="Additional details..."></textarea>
        {validationErrors.details && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.details}
          </p>
        )}
      </div>

      {/* Spam Protection Fields */}
      <div
        className="hidden"
        aria-hidden="true">
        <label htmlFor="confirm_email">
          Don't fill this out if you're human:
        </label>
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

      <Button
        disabled={isLoading || isUploading}
        size="lg"
        className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : isUploading ? (
          "Image Uploading..."
        ) : (
          "Submit RFQ"
        )}
      </Button>

      {status === "success" && (
        <div className="p-4 bg-green-50 text-green-700 rounded-sm text-center">
          Request sent successfully! We will get back to you soon.
        </div>
      )}
      {status === "error" && (
        <div className="p-4 bg-red-50 text-red-700 rounded-sm text-center">
          {errorMessage}
        </div>
      )}
    </form>
  );
}

export function ContactForm() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <ContactFormContent />
    </GoogleReCaptchaProvider>
  );
}
