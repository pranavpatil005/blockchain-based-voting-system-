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
  port: 3307  
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



// Get ands store all candidates with election name
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



// Increment vote count for a candidate
app.post('/api/cast-vote', (req, res) => {
  const { candidate_id } = req.body;

  if (!candidate_id) {
    return res.status(400).json({ success: false, message: "Candidate ID is required" });
  }

  const sql = `UPDATE candidates SET votes = votes + 1 WHERE id = ?`;

  db.query(sql, [candidate_id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Vote recorded successfully" });
  });
});


app.get('/api/active-election-candidates', (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const electionSql = `SELECT * FROM election WHERE from_date <= ? AND to_date >= ? LIMIT 1`;
  db.query(electionSql, [today, today], (err, electionResult) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (electionResult.length === 0) {
      return res.json({ success: false, message: "No active election today" });
    }

    const election = electionResult[0];

    const candidatesSql = `SELECT id, name, votes FROM candidates WHERE election_id = ? ORDER BY votes DESC`;
    db.query(candidatesSql, [election.id], (err, candidatesResult) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      const candidates = candidatesResult.map(c => ({
        id: c.id,
        name: c.name,
        votes: Number(c.votes) || 0
      }));

      // Send from_date and to_date for frontend timer
      res.json({
        success: true,
        electionName: election.name,
        from_date: election.from_date,
        to_date: election.to_date,
        candidates
      });
    });
  });
});




// Get latest ended election with candidates and votes
app.get('/api/latest-ended-election', (req, res) => {
  const now = new Date(); // current datetime

  // Get latest election whose to_date is before now
  const electionSql = `
    SELECT * 
    FROM election 
    WHERE to_date < ? 
    ORDER BY to_date DESC 
    LIMIT 1
  `;

  db.query(electionSql, [now], (err, electionResult) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (electionResult.length === 0) {
      return res.json({ success: true, election: null }); // no ended elections
    }

    const election = electionResult[0];

    // Get candidates for this election
    const candidatesSql = `
      SELECT id, name, votes, party
      FROM candidates 
      WHERE election_id = ?
      ORDER BY votes DESC
    `;

    db.query(candidatesSql, [election.id], (err, candidatesResult) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      const candidates = candidatesResult.map(c => ({
        id: c.id,
        name: c.name,
        party: c.party,
        votes: Number(c.votes) || 0
      }));

      // Return election with candidates array
      res.json({
        success: true,
        election: {
          id: election.id,
          name: election.name,
          from_date: election.from_date,
          to_date: election.to_date,
          description: election.description,
          candidates
        }
      });
    });
  });
});






// Get current election and candidates with status
app.get('/api/active-election', (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  const sql = `SELECT * FROM election WHERE from_date <= ? AND to_date >= ? LIMIT 1`;
  db.query(sql, [today, today], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (result.length === 0) {
      return res.json({ success: true, status: 'Election Ended', election: null });
    }

    const election = result[0];

    const candidatesSql = `SELECT id, name, party, votes FROM candidates WHERE election_id = ? ORDER BY votes DESC`;
    db.query(candidatesSql, [election.id], (err, candidatesResult) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      const candidates = candidatesResult.map(c => ({
        id: c.id,
        name: c.name,
        party: c.party,
        votes: Number(c.votes) || 0
      }));

      res.json({
        success: true,
        status: 'Election Ongoing',
        election: {
          id: election.id,
          name: election.name,
          from_date: election.from_date,
          to_date: election.to_date,
          description: election.description,
          candidates
        }
      });
    });
  });
});



// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});