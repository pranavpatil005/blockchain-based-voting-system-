// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
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

// Login API
app.post('/api/admin-login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM admin_users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.length > 0) {
      const admin = result[0]; // 🟢 Get admin details
      res.json({ 
        success: true, 
        message: 'Login successful', 
        name: admin.name  // 🟢 Add name from DB to response
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});


app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
