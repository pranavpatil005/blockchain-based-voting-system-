require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const twilio = require('twilio');

const app = express();
const PORT = 5000;

// Twilio config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = twilio(accountSid, authToken);

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'evoting',
  port: 3306
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL database evoting');
});

// ---------------------------
// Admin Login Route
// ---------------------------
app.post('/api/admin-login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = "admin" LIMIT 1';
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (result.length > 0) {
      const admin = result[0];
      res.json({
        success: true,
        message: 'Login successful',
        name: admin.name,
        email: admin.email,
        role: admin.role
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials or not an admin' });
    }
  });
});

// ---------------------------
// Voter OTP Login Routes
// ---------------------------

// Send OTP to voter
app.post('/api/send-otp', async (req, res) => {
  const { aadhaar } = req.body;

  if (!aadhaar || aadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar' });
  }

  const sqlCheck = 'SELECT * FROM users WHERE aadhaar = ? LIMIT 1';
  db.query(sqlCheck, [aadhaar], async (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (result.length === 0) return res.status(404).json({ success: false, message: 'Voter not registered' });

    const voter = result[0];
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 mins

    const sqlInsert = `
      INSERT INTO voter_otps (aadhaar, otp, expires_at)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE otp = ?, expires_at = ?
    `;

    db.query(sqlInsert, [aadhaar, otp, expiresAt, otp, expiresAt], async (err2) => {
      if (err2) return res.status(500).json({ success: false, message: 'Database error' });

      try {
        await twilioClient.messages.create({
          body: `Your OTP for eVoting login is: ${otp}`,
          from: twilioNumber,
          to: voter.mobile_number
        });

        res.json({ success: true, message: 'OTP sent successfully' });
      } catch (twilioErr) {
        console.error(twilioErr);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
      }
    });
  });
});

// Verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { aadhaar, otp } = req.body;

  if (!aadhaar || !otp) {
    return res.status(400).json({ success: false, message: 'Aadhaar and OTP are required' });
  }

  const sql = 'SELECT * FROM voter_otps WHERE aadhaar = ? AND otp = ? LIMIT 1';
  db.query(sql, [aadhaar, otp], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (result.length === 0) return res.status(401).json({ success: false, message: 'Invalid OTP' });

    const otpData = result[0];
    if (new Date() > otpData.expires_at) {
      return res.status(401).json({ success: false, message: 'OTP expired' });
    }

    res.json({ success: true, message: 'OTP verified successfully' });
  });
});

// ---------------------------
// Other routes (elections, candidates, voting) remain the same
// Copy your existing code for those here
// ---------------------------

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
