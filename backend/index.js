const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // your MySQL password
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
// Voter Aadhaar Check + OTP
// ---------------------------
app.post('/api/check-voter', (req, res) => {
  const { aadhaar } = req.body;

  if (!aadhaar || aadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar' });
  }

  const sql = 'SELECT * FROM users WHERE aadhaar = ? LIMIT 1';
  db.query(sql, [aadhaar], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    if (result.length > 0) {
      // ✅ Generate OTP in backend
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      return res.json({ success: true, message: 'Voter found', otp });
    } else {
      return res.json({ success: false, message: 'You are not registered' });
    }
  });
});

// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
