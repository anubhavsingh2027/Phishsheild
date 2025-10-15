import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const API_URL = "https://anubhavmail.anubhavsingh.website/";

// ✅ OTP Email Template
const createOtpHtmlTemplate = ({ email, otp }) => {
  const currentYear = new Date().getFullYear();
  const sentTime = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `
  <div style="font-family:Poppins,Arial,sans-serif;background:#f4f7f6;padding:20px;">
    <div style="max-width:500px;margin:auto;background:#fff;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden;">
      <div style="background:#f8f9fa;padding:40px;text-align:center;border-bottom:1px solid #dee2e6;">
        <img src="https://phishshield.anubhavsingh.website/logo.png" alt="PhishShield Logo" style="max-width:110px;">
      </div>
      <div style="padding:35px 40px;text-align:center;color:#343a40;">
        <h1 style="font-size:24px;font-weight:700;">Your Verification Code</h1>
        <p style="color:#6c757d;">A sign-in attempt requires a verification code valid for 5 minutes.</p>
        <div style="display:inline-block;background:#007bff;color:#fff;font-size:36px;font-weight:700;letter-spacing:6px;padding:18px 35px;border-radius:8px;margin:25px 0;">
          ${otp}
        </div>
        <p style="color:#6c757d;">This code was requested for:<br><strong>${email}</strong></p>
        <p style="color:#6c757d;margin-top:20px;">If you did not request this code, ignore this email.</p>
      </div>
      <div style="background:#f8f9fa;padding:25px;text-align:center;color:#6c757d;font-size:12px;border-top:1px solid #dee2e6;">
        <p>Email sent at ${sentTime}</p>
        <p>&copy; ${currentYear} PhishShield. All rights reserved.</p>
      </div>
    </div>
  </div>
  `;
};

// ✅ Send OTP using external API
export const sendOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const messageHtml = createOtpHtmlTemplate({ email, otp });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: `Your PhishShield Verification Code: ${otp}`,
        websiteName: "PhishShield",
        message: messageHtml,
      }),
    });

    const result = await response.json();

    if (result.success === true) {
      res.json({ message: "OTP sent successfully to " + email });
    } else {
      throw new Error("Mail API returned success: false");
    }
  } catch (err) {
    console.error("❌ OTP send failed:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// ✅ Send feedback using external API
export const feedbackEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "anubhavsinghcustomer@gmail.com",
        subject: `Feedback from ${name}: ${subject}`,
        websiteName: "PhishShield",
        message: `
          <h3>New Feedback Received</h3>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    const result = await response.json();

    if (result.success === true) {
      res.json({ message: "Feedback sent successfully." });
    } else {
      throw new Error("Mail API returned success: false");
    }
  } catch (err) {
    console.error("❌ Failed to send feedback:", err);
    res.status(500).json({ error: "Failed to send feedback." });
  }
};
