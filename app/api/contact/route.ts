
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const material = formData.get('material') as string;
    const quantity = formData.get('quantity') as string;
    const orderType = formData.get('orderType') as string;
    const location = formData.get('location') as string;
    const details = formData.get('details') as string;
    const file = formData.get('file') as File | null;

    if (!name || !email || !phone || !material || !quantity || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailContent = `
      <h1>New RFQ Submission from ${name}</h1>
      <h2>Contact Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      
      <h2>Request Details</h2>
      <p><strong>Material Requirement:</strong> ${material}</p>
      <p><strong>Quantity / Volume:</strong> ${quantity}</p>
      <p><strong>Order Frequency:</strong> ${orderType}</p>
      <p><strong>Delivery Location:</strong> ${location}</p>
      <p><strong>Application Details:</strong> ${details || 'N/A'}</p>
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
      ? process.env.EMAIL_TO_ADMINS.split(',').map(email => email.trim())
      : ['anurag@chopraretec.com', 'chopra@chopraretec.com']; // Fallback for safety

    const adminEmail = await resend.emails.send({
      from: `Chopra Retec Website <${process.env.EMAIL_FROM!}>`,
      to: adminRecipients,
      subject: `New RFQ from Chopra Retec Website - ${material}`,
      html: emailContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Send confirmation to user
    const userConfirmationHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="margin-bottom: 24px;">
           <img src="https://chopraretec.com/chopra-OG-logo.png" alt="Chopra Retec Logo" style="height: 50px; width: auto;" />
        </div>
        <h1 style="color: #E63946; margin-top: 0;">Thank you for your interest in Chopra Retec</h1>
        <p>Dear ${name},</p>
        <p>We have received your Request for Quotation (RFQ) for <strong>${material}</strong>.</p>
        <p>Our team is reviewing your requirements and will get back to you shortly with a detailed response.</p>
        <br/>
        <h3>Your Submission Details:</h3>
        <p><strong>Material:</strong> ${material}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Order Frequency:</strong> ${orderType}</p>
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
      '</div>',
      `
        <br/>
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated message, please do not reply to this email.
        </p>
      </div>
      `
    );

    await resend.emails.send({
      from: `Chopra Retec <${userSender}>`,
      replyTo: 'no-reply@chopraretec.com',
      to: [email],
      subject: 'We received your RFQ - Chopra Retec',
      html: userConfirmationHtmlWithFooter,
    });

    return NextResponse.json({ success: true, adminEmail });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
