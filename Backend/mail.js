// mail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
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

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email transporter is ready.');
  }
});

/**
 * Send feedback email to admin and user
 * @param {Object} param0
 * @param {string} param0.name
 * @param {string} param0.email
 * @param {string} param0.subject
 * @param {string} param0.message
 */
export async function sendFeedbackEmail({ name, email, subject, message }) {
  try {
    // Admin notification
    const adminMailOptions = {
      from: `"PhishShield Feedback" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🐟 New PhishShield Feedback by ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif; padding:20px; border:1px solid #eee; border-radius:10px; max-width:600px; margin:auto;">
          <h2 style="color:#e63946;">📩 New Feedback Received</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b></p>
          <blockquote style="background:#f8f9fa; padding:10px; border-left:4px solid #e63946; color:#333;">
            ${message}
          </blockquote>
          <p style="font-size:12px; color:#777;">PhishShield Admin Panel</p>
        </div>
      `,
    };

    // User confirmation
    const userMailOptions = {
      from: `"PhishShield Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '✅ Thank you for your Feedback - PhishShield',
      html: `
        <div style="font-family:Arial,sans-serif; padding:20px; border:1px solid #eee; border-radius:10px; max-width:600px; margin:auto;">
          <div style="text-align:center;">
            <img src="https://i.ibb.co/4tW4tQY/shield.png" alt="PhishShield Logo" style="width:80px;"/>
            <h2 style="color:#1d3557;">Thank You, ${name}!</h2>
          </div>
          <p style="font-size:16px; color:#333;">
            We’ve successfully received your feedback. Our team will review it and get back to you if needed.
          </p>
          <h3 style="color:#457b9d;">📝 Your Submitted Feedback:</h3>
          <ul style="line-height:1.6; color:#444;">
            <li><b>Name:</b> ${name}</li>
            <li><b>Email:</b> ${email}</li>
            <li><b>Subject:</b> ${subject}</li>
            <li><b>Message:</b> ${message}</li>
          </ul>
          <p style="font-size:14px; color:#555; margin-top:20px;">
            👉 Need more help? Visit our 
            <a href="https://phishshield.com/help" style="color:#e63946; text-decoration:none;">Help Center</a> 
            or reply to this email.
          </p>
          <p style="font-size:13px; color:#777; text-align:center; margin-top:30px;">
            © ${new Date().getFullYear()} PhishShield. Developed by <b>Anubhav Singh</b>.
          </p>
        </div>
      `,
    };

    // Send both mails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log(`📧 Feedback email sent to admin & user (${email})`);
  } catch (error) {
    console.error('❌ Error sending feedback emails:', error);
  }
}
