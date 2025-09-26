const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // increase limit as needed
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

  // ✅ Correct: Only allow if role is 'admin'
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



// Add this after your existing routes in index.js
app.post('/api/create-election', (req, res) => {
  const { name, from_date, to_date, description } = req.body;

  if (!name || !from_date || !to_date || !description) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = 'INSERT INTO election (name, from_date, to_date, description) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, from_date, to_date, description], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    res.json({ success: true, message: "Election created successfully", electionId: result.insertId });
  });
});

// Get all elections
app.get('/api/elections', (req, res) => {
  const sql = 'SELECT * FROM election ORDER BY from_date DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.json({ success: true, elections: results });
  });
});



// Get all candidates with election name
app.post('/api/candidates', (req, res) => {
  console.log("Received candidate data:", req.body); // <-- add this

  const { election_id, name, party, dob, qualification, mobile, email, photo, party_logo } = req.body;
  
  if (!election_id || !name || !party) {
    return res.status(400).json({ success: false, message: "Election, Name, and Party are required" });
  }

  const sql = `INSERT INTO candidates (election_id, name, party, dob, qualification, mobile, email, photo, party_logo) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [election_id, name, party, dob, qualification, mobile, email, photo, party_logo], (err, result) => {
    if (err) {
      console.error("DB Error:", err); // <-- log DB error
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, message: 'Candidate added successfully', id: result.insertId });
  });
});

app.get('/api/candidates', (req, res) => {
  const sql = `
    SELECT c.*, e.name AS election_name
    FROM candidates c
    LEFT JOIN election e ON c.election_id = e.id
    ORDER BY c.name ASC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json(result);
  });
});





// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});