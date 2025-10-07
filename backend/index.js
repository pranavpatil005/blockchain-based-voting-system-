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
// Create Election
// ---------------------------
app.post('/api/create-election', (req, res) => {
  const { name, from_date, to_date, description } = req.body;

  if (!name || !from_date || !to_date || !description) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const sql = 'INSERT INTO election (name, from_date, to_date, description) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, from_date, to_date, description], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    res.json({ success: true, message: 'Election created successfully', electionId: result.insertId });
  });
});

// ---------------------------
// Get All Elections
// ---------------------------
app.get('/api/elections', (req, res) => {
  const sql = 'SELECT * FROM election ORDER BY from_date DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    res.json({ success: true, elections: results });
  });
});

// ---------------------------
// Add Candidate
// ---------------------------
app.post('/api/candidates', (req, res) => {
  console.log('Received candidate data:', req.body);

  const { election_id, name, party, dob, qualification, mobile, email, photo, party_logo } = req.body;

  if (!election_id || !name || !party) {
    return res.status(400).json({ success: false, message: 'Election, Name, and Party are required' });
  }

  const sql = `
    INSERT INTO candidates (election_id, name, party, dob, qualification, mobile, email, photo, party_logo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [election_id, name, party, dob, qualification, mobile, email, photo, party_logo], (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, message: 'Candidate added successfully', id: result.insertId });
  });
});

// ---------------------------
// Get All Candidates with Election Name
// ---------------------------
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
// Cast Vote
// ---------------------------
app.post('/api/cast-vote', (req, res) => {
  const { candidate_id } = req.body;

  if (!candidate_id) {
    return res.status(400).json({ success: false, message: 'Candidate ID is required' });
  }

  const sql = `UPDATE candidates SET votes = votes + 1 WHERE id = ?`;
  db.query(sql, [candidate_id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: 'Vote recorded successfully' });
  });
});

// ---------------------------
// Get Active Election + Candidates
// ---------------------------
app.get('/api/active-election-candidates', (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  const electionSql = `SELECT * FROM election WHERE from_date <= ? AND to_date >= ? LIMIT 1`;
  db.query(electionSql, [today, today], (err, electionResult) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (electionResult.length === 0) {
      return res.json({ success: false, message: 'No active election today' });
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

// ---------------------------
// Get Latest Ended Election
// ---------------------------
app.get('/api/latest-ended-election', (req, res) => {
  const now = new Date();

  const electionSql = `
    SELECT * FROM election 
    WHERE to_date < ? 
    ORDER BY to_date DESC 
    LIMIT 1
  `;
  db.query(electionSql, [now], (err, electionResult) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (electionResult.length === 0) {
      return res.json({ success: true, election: null });
    }

    const election = electionResult[0];
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

// ---------------------------
// Get Current Election Status
// ---------------------------
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
// Finish / Close Election
// ---------------------------
app.put('/api/finish-election/:id', (req, res) => {
  const { id } = req.params;
  const { to_date } = req.body;

  if (!to_date) {
    return res.status(400).json({ success: false, message: 'to_date is required' });
  }

  const sql = `UPDATE election SET to_date = ? WHERE id = ?`;
  db.query(sql, [to_date, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }

    res.json({ success: true, message: 'Election finished successfully' });
  });
});




// ---------------------------
// Start Election
// ---------------------------
app.put('/api/start-election/:id', (req, res) => {
  const { id } = req.params;
  const { from_date } = req.body;

  if (!from_date) {
    return res.status(400).json({ success: false, message: 'from_date is required' });
  }

  const sql = `UPDATE election SET from_date = ? WHERE id = ?`;
  db.query(sql, [from_date, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Election not found' });
    }

    res.json({ success: true, message: 'Election started successfully' });
  });
});






















// ---------------------------
// Add a new voter
// ---------------------------
// Add Voter
app.post('/api/add-voter', (req, res) => {
  const { name, voterId, aadhaar, phone, age, photo } = req.body;

  if (!name || !voterId || !aadhaar || !phone) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  const sql = `
    INSERT INTO users (name, voterId, aadhaar, mobile_number, age, role, photo)
    VALUES (?, ?, ?, ?, ?, 'user', ?)
  `;

  const ageValue = age ? Number(age) : null;

  db.query(sql, [name, voterId, aadhaar, phone, ageValue, photo || null], (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, message: 'Voter added successfully', voterId: result.insertId });
  });
});

// Get All Voters
app.get('/api/voters', (req, res) => {
  const sql = `
    SELECT id, name, voterId, aadhaar, mobile_number AS phone, age, photo
    FROM users
    WHERE role='user'
    ORDER BY name ASC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, voters: result });
  });
});






// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
