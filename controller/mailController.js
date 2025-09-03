// mail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path'; // Import path to handle file paths correctly

dotenv.config();

// Create transporter (no changes here)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter (no changes here)
transporter.verify((error) => {
  if (error) {
    console.error('==> Email transporter error:', error);
  } else {
    console.log('==> Email transporter is ready.');
  }
});

// ✨ New function to generate the professional HTML email body
const createHtmlTemplate = ({ name, subject, message }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background-color: #f8f9fa; padding: 40px; text-align: center; }
            .header img { max-width: 150px; }
            .content { padding: 30px 40px; color: #333333; line-height: 1.6; }
            .content h1 { color: #0d1b2a; font-size: 24px; }
            .message-box { background-color: #f1f3f5; border-left: 4px solid #007bff; padding: 15px 20px; margin-top: 20px; font-style: italic; }
            .footer { background-color: #e9ecef; padding: 30px; text-align: center; color: #6c757d; font-size: 12px; }
            .footer a { color: #007bff; text-decoration: none; }
        </style>
    </head>
    <body style="background-color: #f4f4f7; margin: 0; padding: 20px;">
        <div class="container">
            <div class="header">
                <img src="cid:logo" alt="PhishShield Logo">
            </div>
            <div class="content">
                <h1>We've Received Your Feedback!</h1>
                <p>Hi ${name},</p>
                <p>Thank you for reaching out to us. We truly value your input, as it helps us improve PhishShield for everyone. Our team has received your message and will review it shortly.</p>
                
                <div class="message-box">
                    <strong>Your Submitted Message:</strong>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>

                <p>We appreciate you taking the time to help make the internet a safer place.</p>
                <p>Best regards,<br><strong>The PhishShield Team</strong></p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} PhishShield. All rights reserved.</p>
                <p>Developer: Anubhav Singh</p>
                <p>You are receiving this email because you submitted a feedback form on our website.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};


/**
 * Send feedback email to admin and user
 */
export async function sendFeedbackEmail({ name, email, subject, message }) {
  // 1. Admin notification (remains simple text for quick reading)
  const adminMailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: `New PhishShield Feedback by ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nFeedback: ${message}`,
  };

  // 2. Professional user confirmation email
  const userMailOptions = {
    from: `"PhishShield Team" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'We’ve Received Your Feedback | PhishShield',
    html: createHtmlTemplate({ name, subject, message }),
    // ✨ Fallback text for email clients that don't support HTML
    text: `Hi ${name},\n\nThank you for your valuable feedback! We have successfully received your message and our team will get back to you shortly.\n\nBest regards,\nThe PhishShield Team`,
    // ✨ Attach the logo and embed it in the HTML
    attachments: [{
      filename: 'logo.png',
      // IMPORTANT: Update this path to where your logo.png is located!
      path: path.join(process.cwd(), 'public', 'image', 'logo.png'),
      cid: 'logo' // This ID is referenced in the HTML's <img> tag
    }]
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log('Feedback emails sent successfully!');
  } catch (error) {
    console.error('Error sending feedback emails:', error);
  }
}
// The extra lines at the end have been removed. The file now ends here.
