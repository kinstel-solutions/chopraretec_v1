import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
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

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log("-----------------------------------------");
  console.log("[INCOMING] /api/contact POST request received.");

  try {
    const formData = await req.formData();
    console.log("[DEBUG] FormData parsed successfully.");

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const material = formData.get("material") as string;
    const quantity = formData.get("quantity") as string;
    const orderType = formData.get("orderType") as string;
    const location = formData.get("location") as string;
    const details = formData.get("details") as string;
    const file = formData.get("file") as File | null;

    const confirmEmail = formData.get("confirm_email") as string;
    const formStartTime = formData.get("form_start_time") as string;
    const captchaToken = formData.get("g-recaptcha-response") as string;

    // 0. CAPTCHA Verification (First line of defense)
    console.log("[CHECK] Verifying CAPTCHA token exists...");
    if (!captchaToken) {
      console.log("[FAILED] CAPTCHA token missing. Throwing 400 ERROR.");
      return NextResponse.json(
        { error: "CAPTCHA token missing" },
        { status: 400 },
      );
    }

    try {
      const captchaResponse = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
        },
      );

      const captchaData = await captchaResponse.json();

      if (!captchaData.success || captchaData.score < 0.5) {
        console.log(
          "Spam detected: CAPTCHA score too low",
          captchaData.score,
          captchaData["error-codes"],
        );
        return NextResponse.json(
          {
            error: "System detected potential spam. Please try again later.",
          },
          { status: 400 },
        );
      }
    } catch (error) {
      console.error("CAPTCHA verification error:", error);
      return NextResponse.json(
        { error: "CAPTCHA check failed" },
        { status: 500 },
      );
    }

    // 1. Honeypot check
    console.log("[CHECK] Checking Honeypot field...");
    if (confirmEmail) {
      console.log(
        "[FAILED/SPAM] Honeypot field filled. Emitting fake success.",
      );
      // Return success to fool the bot, but don't send email
      return NextResponse.json({ success: true });
    }

    // 2. Zod Field Validation
    console.log(
      `[CHECK] Validating payload fields via Zod Schema. Received: Name:${name}, Email:${email}, Phone:${phone || "none"}`,
    );
    const formValues = {
      name,
      company,
      email,
      phone: phone || undefined,
      material: material || undefined,
      quantity: quantity || undefined,
      orderType: orderType || undefined,
      location: location || undefined,
      details: details || undefined,
    };

    const validationResult = contactFormSchema.safeParse(formValues);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    console.log("[SUCCESS] Zod validations all passed.");

    console.log(
      "[OK] Pre-flight checks complete. Assembling email bodies for Resend API.",
    );

    const emailContent = `
      <h1>New RFQ Submission from ${name}</h1>
      <h2>Contact Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company}</p>
      
      <h2>Request Details</h2>
      <p><strong>Material Requirement:</strong> ${material || "N/A"}</p>
      <p><strong>Quantity / Volume:</strong> ${quantity || "N/A"}</p>
      <p><strong>Order Frequency:</strong> ${orderType || "N/A"}</p>
      <p><strong>Delivery Location:</strong> ${location || "N/A"}</p>
      <p><strong>Application Details:</strong> ${details || "N/A"}</p>
    `;

    const attachments = [];
    if (file) {
      // Read file contents into a Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Send notification to admins
    const adminRecipients = process.env.EMAIL_TO_ADMINS
      ? process.env.EMAIL_TO_ADMINS.split(",").map((email) => email.trim())
      : ["anurag@chopraretec.com", "chopra@chopraretec.com"]; // Fallback for safety

    console.log(
      `[NETWORK] Dispatching Admin Email via Resend to: ${adminRecipients.join(", ")}`,
    );
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: `Chopra Retec Website <${process.env.EMAIL_FROM!}>`,
      to: adminRecipients,
      subject: `New RFQ from Chopra Retec Website${material ? ` - ${material}` : ""}`,
      html: emailContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (adminError) {
      console.error("Resend Admin Email Error:", adminError);
      return NextResponse.json(
        { error: `Failed to send admin notification: ${adminError.message}` },
        { status: 500 },
      );
    }

    // Send confirmation to user
    const userConfirmationHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="margin-bottom: 24px;">
           <img src="https://chopraretec.com/chopra-OG-logo.png" alt="Chopra Retec Logo" style="height: 50px; width: auto;" />
        </div>
        <h1 style="color: #E63946; margin-top: 0;">Thank you for your interest in Chopra Retec</h1>
        <p>Dear ${name},</p>
        <p>We have received your Request for Quotation (RFQ)${material ? ` for <strong>${material}</strong>` : ""}.</p>
        <p>Our team is reviewing your requirements and will get back to you shortly with a detailed response.</p>
        <br/>
        <h3>Your Submission Details:</h3>
        <p><strong>Material:</strong> ${material || "N/A"}</p>
        <p><strong>Quantity:</strong> ${quantity || "N/A"}</p>
        <p><strong>Order Frequency:</strong> ${orderType || "N/A"}</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Chopra Retec Team</strong><br/>
        <a href="https://chopraretec.com">www.chopraretec.com</a></p>
      </div>
    `;

    // We don't await this one to block the response, but we catch errors to ensure it doesn't crash if it fails
    // Actually, safest to await it to ensure we know if it worked or not, or just fire and forget.
    // Let's await it to keep it simple and consistent.
    // Use EMAIL_FROM_USER if defined, otherwise fall back to EMAIL_FROM
    const userSender = process.env.EMAIL_FROM_USER || process.env.EMAIL_FROM!;

    // Add "no-reply" footer to the HTML
    const userConfirmationHtmlWithFooter = userConfirmationHtml.replace(
      "</div>",
      `
        <br/>
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated message, please do not reply to this email.
        </p>
      </div>
      `,
    );

    console.log(
      `[NETWORK] Dispatching Confirmation Auto-reply Email via Resend to User: ${email}`,
    );
    const { error: userError } = await resend.emails.send({
      from: `Chopra Retec <${userSender}>`,
      replyTo: "no-reply@chopraretec.com",
      to: [email],
      subject: "We received your RFQ - Chopra Retec",
      html: userConfirmationHtmlWithFooter,
    });

    if (userError) {
      console.error(
        "[ERROR] Resend User Confirmation Email delivery failed:",
        userError,
      );
      // We still return success for the overall form submission, as the admin email was sent,
      // but we log it. If you want the whole form to fail if user email fails, we would return 500 here too.
      // For now, logging it is safer so the admin still gets the lead even if the auto-reply bounces.
    } else {
      console.log(
        "[SUCCESS] Both emails dispatched to Resend network. Returning successful response.",
      );
    }

    return NextResponse.json({ success: true, adminEmail: adminData });
  } catch (error) {
    console.error(
      "[CRITICAL FATAL CAUGHT EXCEPTION]: Error sending email:",
      error,
    );
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
