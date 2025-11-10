import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const allowedOrigins = [
  'https://rb-horangee-do-jang.vercel.app',
  'http://localhost:3000',
];

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow curl/postman
    const ok = allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin);
    cb(ok ? null : new Error('Not allowed by CORS'), ok);
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.options('/api/send', cors());

// Test route to verify server is running
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    message: 'API endpoint: POST /api/send'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
  });
});

app.post('/api/send', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, email, or message' 
      });
    }

    // Get credentials from environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Missing environment variables:', {
        hasEmailUser: !!emailUser,
        hasEmailPass: !!emailPass
      });
      return res.status(500).json({ 
        success: false, 
        error: 'Email configuration not set up properly. Please check environment variables.' 
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass
      },
      // fail fast if Gmail is unreachable instead of hanging
      connectionTimeout: 10000, // 10s
      socketTimeout: 10000 // 10s
    });

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log('SMTP transporter verified');
    } catch (e) {
      console.warn('SMTP verify failed (continuing):', e?.message);
    }

    await transporter.sendMail({
      from: `"${name}" <${emailUser}>`,
      replyTo: email,
      to: 'rbhorangee@gmail.com',
      subject: 'New Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    console.log('Email sent successfully');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Failed to send email'
    });
  }
});

// Render uses PORT environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment variables check:`, {
    hasEmailUser: !!process.env.EMAIL_USER,
    hasEmailPass: !!process.env.EMAIL_PASS
  });
});