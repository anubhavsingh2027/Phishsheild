// server.js
import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { sendFeedbackEmail } from './mail.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import nodemailer from "nodemailer";
dotenv.config();

// Fix __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Session setup =====
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallbackSecret123!',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// ===== Serve static files =====
app.use(express.static(path.join(__dirname, "..",'public'), { index: false }));

// ===== Contact form endpoint =====
app.post('/api/contact', async (req, res) => {
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
});

// ===== Rate limiter for scan endpoint =====
const scanLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: "Too many requests, please try again later." }
});

// ===== Safe Browsing API check =====
app.post('/api/scan', scanLimiter, async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required.' });

  try {
    new URL(url); // Validate URL
  } catch {
    return res.status(400).json({ error: 'Invalid URL format.' });
  }

  const apiKey = process.env.SAFE_BROWSING_KEY;
  if (!apiKey) {
    console.error("❌ Missing SAFE_BROWSING_KEY in .env");
    return res.status(500).json({ error: 'Safe Browsing API key not configured.' });
  }

  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
  const requestBody = {
    client: { clientId: "my-safe-url-checker", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION"
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  try {
    const { data } = await axios.post(apiUrl, requestBody);
    if (!data || Object.keys(data).length === 0) {
      return res.json({ malicious: false });
    } else {
      return res.json({ malicious: true, details: data });
    }
  } catch (error) {
    console.error("Safe Browsing API error:", error.response?.status, error.response?.data || error.message);
    res.status(500).json({ error: "Failed to check URL safety" });
  }
});

// ===== MongoDB connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ===== User schema =====
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// ===== Auth routes =====
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.redirect('/login');
}

app.get('/', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname,"..", "public", "index.html"));
});


app.get('/about', (req, res) => res.sendFile(path.join(__dirname,"..", "public", 'about.html')));
app.get('/feedback', (req, res) => res.sendFile(path.join(__dirname,"..", "public", 'contact.html')));


app.get('/login', (req, res) => res.sendFile(path.join(__dirname,"..", "public", "login.html")));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname,"..", "public", 'register.html')));
app.post('/register', async (req, res) => {
  
  try {
    const { username, email, password, confirm_password } = req.body;
    
    if (!username || !email || !password) return res.status(400).json({ error: 'All fields are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'All fields are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    req.session.userId = user._id;
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

//  otp verification


app.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    // ✅ OTP transporter
    const otpTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // App password
      },
    });

    await otpTransporter.sendMail({
      from: `"PhishShield OTP" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Here is your OTP: ${otp}\n\nThis OTP will expire in 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully to " + email });
  } catch (err) {
    console.error("❌ OTP Email send failed:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});






// ===== 404 handler =====
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public/error.html')));

// ===== Start server =====
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));


