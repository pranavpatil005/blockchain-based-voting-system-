const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'evoting'
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

  const sql = 'SELECT * FROM admin_users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.length > 0) {
      const admin = result[0];
      res.json({
        success: true,
        message: 'Login successful',
        name: admin.name
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// ---------------------------
// Admin Signup Route
// ---------------------------
app.post('/api/admin-signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Check if email already exists
  const checkSql = 'SELECT * FROM admin_users WHERE email = ?';
  db.query(checkSql, [email], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    if (result.length > 0) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Insert new admin
    const insertSql = 'INSERT INTO admin_users (name, email, password) VALUES (?, ?, ?)';
    db.query(insertSql, [name, email, password], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Failed to register' });

      res.status(201).json({ success: true, message: 'Signup successful' });
    });
  });
});

// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
