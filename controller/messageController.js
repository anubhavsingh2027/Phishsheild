import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

//internal Module
import { sendFeedbackEmail } from './mailController.js';



const createOtpHtmlTemplate = ({ email, otp }) => {
  const currentYear = new Date().getFullYear();
  const sentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  body { 
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f4f7f6;
    margin: 0;
    padding: 20px;
    }
    .container { 
      max-width: 500px; 
      margin: 0 auto; 
      background-color: #ffffff; 
      border-radius: 12px; 
      box-shadow: 0 6px 20px rgba(0,0,0,0.08); 
      overflow: hidden; 
      border: 1px solid #e5e5e5;
      }
      .header { 
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        padding: 40px; 
        text-align: center; 
              border-bottom: 1px solid #dee2e6;
              }
              .header img { max-width: 110px; }
              .content { 
                padding: 35px 40px; 
                color: #343a40; 
                line-height: 1.7; 
                text-align: center; 
                }
                .content h1 { 
                  color: #212529; 
                  font-size: 24px; 
                  font-weight: 700;
                  margin-bottom: 15px; 
                  }
                  .otp-code {
                    display: inline-block;
                    background-color: #007bff;
                    color: #ffffff;
                    font-size: 36px;
                    font-weight: 700;
                    letter-spacing: 6px;
                    padding: 18px 35px;
                    border-radius: 8px;
                    margin: 25px 0;
                    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
                    }
                    .info { font-size: 14px; color: #6c757d; }
                    .footer { 
                      background-color: #f8f9fa; 
                      padding: 25px; 
                      text-align: center; 
                      color: #6c757d; 
                      font-size: 12px;
                      border-top: 1px solid #dee2e6;
                      }
                      </style>
                      </head>
                      <body>
                      <div class="container">
                      <div class="header">
                      <img src="cid:logo" alt="PhishShield Logo">
                      </div>
                      <div class="content">
                      <h1>Your Verification Code</h1>
                      <p class="info">A sign-in attempt requires a verification code. The code is valid for 5 minutes.</p>
                      <div class="otp-code">${otp}</div>
                      <p class="info">
                      This code was requested for: <br>
                      <strong>${email}</strong>
                      </p>
                      <p class="info" style="margin-top: 20px;">If you did not request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.</p>
                      </div>
                      <div class="footer">
                      <p>Email sent at ${sentTime}</p>
                      <p>&copy; ${currentYear} PhishShield. All rights reserved.</p>
                      </div>
                      </div>
                      </body>
                      </html>
                      `;
                    };
                    
export const sendOtp = async (req, res) => {
                      const { email, otp } = req.body;
                      if (!email || !otp) {
                        return res.status(400).json({ error: "Email and OTP are required" });
                      }
                      
                      try {
                        // Transporter creation logic moved back inside the function
                        const otpTransporter = nodemailer.createTransport({
                          host: "smtp.gmail.com",
                          port: 587,
                          secure: false, // true for 465, false for other ports
                          auth: {
                            user: process.env.GMAIL_USER,
                            pass: process.env.GMAIL_PASS,
                          },
                        });
                        
                        const mailOptions = {
                          from: `"PhishShield Security" <${process.env.GMAIL_USER}>`,
                          to: email,
                          subject: `Your PhishShield Verification Code: ${otp}`,
                          html: createOtpHtmlTemplate({ email, otp }), // Pass email to the template
                          text: `Your PhishShield verification code is: ${otp}. It will expire in 5 minutes.`,
                          attachments: [{
                            filename: 'logo.png',
                            path: path.join(process.cwd(), 'public', 'image', 'logo.png'),
                            cid: 'logo'
                          }]
                        };
                        
                        await otpTransporter.sendMail(mailOptions);
                        
                        res.json({ message: "OTP sent successfully to " + email });
                      } catch (err) {
                        console.error("❌ OTP Email send failed:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const feedbackEmail= async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    await sendFeedbackEmail({ name, email, subject, message });
    res.json({ message: 'Email sent successfully. Confirmation sent to user.' });
  } catch (err) {
    console.error('❌ Failed to send email:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};
