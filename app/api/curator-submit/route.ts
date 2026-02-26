import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { selections } = await req.json();

    if (!selections || Object.keys(selections).length === 0) {
      return NextResponse.json(
        { error: "No selections provided" },
        { status: 400 },
      );
    }

    // Format selections into HTML email
    let emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h1 style="color: #E63946;">Image Curation Selections</h1>
        <p>The client has submitted their new image selections for the products snapshot section.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
    `;

    for (const [cardId, images] of Object.entries(selections)) {
      emailHtml += `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; margin-bottom: 10px; color: #1d3557; text-transform: capitalize;">Card: ${cardId.replace(/-/g, " ")}</h2>
      `;

      if (Array.isArray(images) && images.length > 0) {
        emailHtml += `<ol style="margin-top: 0; padding-left: 20px;">`;
        images.forEach((img: string) => {
          // Display just the filename or the full path
          const filename = img.split("/").pop() || img;
          emailHtml += `<li style="margin-bottom: 5px;"><code>${filename}</code><br><small style="color: #777;">${img}</small></li>`;
        });
        emailHtml += `</ol>`;
      } else {
        emailHtml += `<p style="color: #666; font-style: italic;">No images selected</p>`;
      }

      emailHtml += `</div>`;
    }

    emailHtml += `
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <h3>Raw JSON Data:</h3>
        <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 12px;"><code>${JSON.stringify(selections, null, 2)}</code></pre>
      </div>
    `;

    // Send notification to admins
    const adminRecipients = process.env.EMAIL_TO_ADMINS
      ? process.env.EMAIL_TO_ADMINS.split(",").map((email) => email.trim())
      : ["anurag@chopraretec.com", "chopra@chopraretec.com"]; // Fallback

    const data = await resend.emails.send({
      from: `Chopra Retec Curation <${process.env.EMAIL_FROM! || "onboarding@resend.dev"}>`,
      to: adminRecipients,
      subject: `New Image Selections - Chopra Retec`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending curation email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
