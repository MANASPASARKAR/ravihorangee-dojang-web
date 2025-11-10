import express from 'express';
// import nodemailer from 'nodemailer';
import cors from 'cors';
import sgMail from '@sendgrid/mail';

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
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

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
    sendgridConfigured: !!(process.env.SENDGRID_API_KEY)
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
    const fromEmail = process.env.FROM_EMAIL;
    const sgApiKey = process.env.SENDGRID_API_KEY;
    
    if (!fromEmail || !sgApiKey) {
      console.error('Missing SendGrid configuration:', {
        hasFromEmail: !!fromEmail,
        hasApiKey: !!sgApiKey
      });
      return res.status(500).json({ 
        success: false, 
        error: 'Email configuration not set up properly. Please check SENDGRID_API_KEY and FROM_EMAIL.' 
      });
    }

    await sgMail.send({
      to: process.env.RECIPIENT_EMAIL, // single recipient
      // For multiple, use: to: process.env.RECIPIENT_EMAIL.split(',').map(s => s.trim()),
      from: { email: fromEmail, name }, // shows submitter name
      replyTo: email,
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
    return res.status(200).json({ success: true });

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
    hasFromEmail: !!process.env.FROM_EMAIL,
    hasApiKey: !!process.env.SENDGRID_API_KEY
  });
});
