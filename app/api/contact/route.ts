
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

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [process.env.EMAIL_TO!],
      subject: `New RFQ from Chopra Retec Website - ${material}`,
      html: emailContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
