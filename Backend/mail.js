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
  const adminMailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: `New PhishShield Feedback by ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nFeedback: ${message}`,
  };

  const userMailOptions = {
    from: `"PhishShield Team" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Thank you for Feedback PhishShield!',
    text: `Hi ${name},

Thank you for your valuable feedback! We have successfully received your message and our team will get back to you shortly.

Here’s a copy of the message you submitted:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

We appreciate your input—it helps us improve PhishShield to better protect and educate users like you.

If you need any further assistance, feel free to reach out to us at anubhavsingh2027@gmail.com.

Best regards,  
PhishShield Team  
Developer: Anubhav Singh
`,
  };

  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(userMailOptions);
}
