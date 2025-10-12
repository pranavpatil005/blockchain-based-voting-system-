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
  database: 'blevoting',
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
// ---------------------------
// Create Election (No Overlap)
// ---------------------------
app.post('/api/create-election', (req, res) => {
  const { name, from_date, to_date, description } = req.body;

  if (!name || !from_date || !to_date || !description) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Ensure start date is before end date
  if (new Date(from_date) >= new Date(to_date)) {
    return res.status(400).json({ success: false, message: 'Start date must be before end date' });
  }

  // Check for overlapping elections
  const overlapSql = `
    SELECT * FROM election 
    WHERE NOT (to_date <= ? OR from_date >= ?)
    LIMIT 1
  `;
  db.query(overlapSql, [from_date, to_date], (err, overlapResult) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    if (overlapResult.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Election overlaps with an existing election. Please choose different dates.'
      });
    }

    // Insert new election
    const insertSql = 'INSERT INTO election (name, from_date, to_date, description) VALUES (?, ?, ?, ?)';
    db.query(insertSql, [name, from_date, to_date, description], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error' });

      res.json({ success: true, message: 'Election created successfully', electionId: result.insertId });
    });
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
// ---------------------------
// Cast Vote (Updated)
// ---------------------------
app.post("/api/cast-vote", (req, res) => {
  const { voter_id, candidate_id, election_id } = req.body;

  if (!voter_id || !candidate_id || !election_id) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  // 1️⃣ Check if voter already voted in this election
  const checkSql = `SELECT * FROM votes WHERE voter_id = ? AND election_id = ?`;
  db.query(checkSql, [voter_id, election_id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (result.length > 0) {
      return res.json({
        success: false,
        message: "You have already voted in this election.",
      });
    }

    // 2️⃣ Record the vote
    const insertVote = `INSERT INTO votes (voter_id, election_id, candidate_id) VALUES (?, ?, ?)`;
    db.query(insertVote, [voter_id, election_id, candidate_id], (err, voteResult) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      // 3️⃣ Increment candidate vote count
      const updateVotes = `UPDATE candidates SET votes = votes + 1 WHERE id = ?`;
      db.query(updateVotes, [candidate_id], (err2) => {
        if (err2) return res.status(500).json({ success: false, message: err2.message });

        res.json({ success: true, message: "Vote recorded successfully" });
      });
    });
  });
});





// ---------------------------
// Check if voter already voted in active election
// ---------------------------
app.post("/api/check-vote-status", (req, res) => {
  const { voter_id, election_id } = req.body;

  if (!voter_id || !election_id) {
    return res.status(400).json({ success: false, message: "Missing parameters" });
  }

  const sql = `SELECT * FROM votes WHERE voter_id = ? AND election_id = ? LIMIT 1`;
  db.query(sql, [voter_id, election_id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (result.length > 0) {
      return res.json({ success: true, voted: true });
    } else {
      return res.json({ success: true, voted: false });
    }
  });
});


// ✅ Fetch voter details by Aadhaar
app.post("/api/get-voter-by-aadhaar", (req, res) => {
  const { aadhaar } = req.body;
  if (!aadhaar) {
    return res.status(400).json({ success: false, message: "Aadhaar required" });
  }

  const sql = "SELECT id, name, aadhaar, voterId FROM users WHERE aadhaar = ? LIMIT 1";
  db.query(sql, [aadhaar], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    if (result.length === 0)
      return res.json({ success: false, message: "Voter not found" });

    res.json({ success: true, voter: result[0] });
  });
});




// ---------------------------
// Get Active Election + Candidates
// ---------------------------
// Get Active Election + Candidates (live vote count from votes table)
app.get('/api/active-election-candidates', (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  // 1️⃣ Find active election
  const electionSql = `SELECT * FROM election WHERE from_date <= ? AND to_date >= ? LIMIT 1`;
  db.query(electionSql, [today, today], (err, electionResult) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (electionResult.length === 0) {
      return res.json({ success: false, message: 'No active election today' });
    }

    const election = electionResult[0];

    // 2️⃣ Fetch candidates and count votes dynamically
    const candidatesSql = `
      SELECT c.id, c.name, COUNT(v.id) AS votes
      FROM candidates c
      LEFT JOIN votes v ON c.id = v.candidate_id
      WHERE c.election_id = ?
      GROUP BY c.id
      ORDER BY votes DESC
    `;

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
// ---------------------------
// Get Latest Ended Election
// ---------------------------
app.get('/api/latest-ended-election', (req, res) => {
  const now = new Date();

  // Get the last election that has already ended
  const electionSql = `
    SELECT *
    FROM election
    WHERE to_date <= ?
    ORDER BY to_date DESC
    LIMIT 1
  `;

  db.query(electionSql, [now], (err, electionResult) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (electionResult.length === 0) return res.json({ success: true, election: null });

    const election = electionResult[0];

    // Fetch candidates belonging to that election
    const candidatesSql = `
      SELECT id, name, party, votes, photo, party_logo
      FROM candidates
      WHERE election_id = ?
      ORDER BY votes DESC
    `;
    db.query(candidatesSql, [election.id], (err, candidatesResult) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      res.json({
        success: true,
        election: {
          id: election.id,
          name: election.name,
          from_date: election.from_date,
          to_date: election.to_date,
          description: election.description,
          candidates: candidatesResult.map(c => ({
            id: c.id,
            name: c.name,
            party: c.party,
            votes: Number(c.votes || 0),
            photo: c.photo,
            party_logo: c.party_logo
          }))
        }
      });
    });
  });
});


// Get current or upcoming election
app.get('/api/active-election', (req, res) => {
  // 1) Try to find an ongoing election (use server time / MySQL NOW())
  const ongoingSql = `
    SELECT *
    FROM election
    WHERE from_date <= NOW() AND to_date >= NOW()
    ORDER BY from_date ASC
    LIMIT 1
  `;

  db.query(ongoingSql, (err, ongoingResult) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (ongoingResult.length > 0) {
      const election = ongoingResult[0];
      // fetch candidates too (optional)
      const candidatesSql = `
        SELECT id, name, party, votes, photo, party_logo
        FROM candidates
        WHERE election_id = ?
        ORDER BY votes DESC
      `;
      db.query(candidatesSql, [election.id], (err, candidatesResult) => {
        if (err) return res.status(500).json({ success: false, message: err.message });

        return res.json({
          success: true,
          status: 'Ongoing',
          election: {
            id: election.id,
            name: election.name,
            from_date: election.from_date,
            to_date: election.to_date,
            description: election.description,
            candidates: candidatesResult.map(c => ({
              id: c.id,
              name: c.name,
              party: c.party,
              votes: Number(c.votes || 0),
              photo: c.photo,
              party_logo: c.party_logo
            }))
          }
        });
      });
      return;
    }

    // 2) If no ongoing, return the closest upcoming election (next starting)
    const upcomingSql = `
      SELECT *
      FROM election
      WHERE from_date > NOW()
      ORDER BY from_date ASC
      LIMIT 1
    `;
    db.query(upcomingSql, (err, upcomingResult) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      if (upcomingResult.length > 0) {
        const election = upcomingResult[0];
        return res.json({
          success: true,
          status: 'Upcoming',
          election: {
            id: election.id,
            name: election.name,
            from_date: election.from_date,
            to_date: election.to_date,
            description: election.description
          }
        });
      }

      // 3) none found
      return res.json({ success: true, status: 'No Elections Scheduled', election: null });
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
















// Check if Aadhaar or Voter ID already exists

app.post('/api/check-duplicates', (req, res) => {
  const { aadhaar, voterId } = req.body;

  if (!aadhaar && !voterId) {
    return res.status(400).json({ success: false, message: 'Missing Aadhaar or Voter ID' });
  }

  const sql = `
    SELECT aadhaar, voterId 
    FROM users 
    WHERE aadhaar = ? OR voterId = ? 
    LIMIT 1
  `;

  db.query(sql, [aadhaar, voterId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.length > 0) {
      const existing = result[0];
      if (existing.aadhaar === aadhaar && existing.voterId === voterId) {
        return res.json({ success: false, message: 'Both Aadhaar and Voter ID already exist.' });
      } else if (existing.aadhaar === aadhaar) {
        return res.json({ success: false, message: 'Aadhaar already exists.' });
      } else if (existing.voterId === voterId) {
        return res.json({ success: false, message: 'Voter ID already exists.' });
      }
    }
    res.json({ success: true });
  });
});






// ---------------------------
// Add a new voter
// ---------------------------
// Add Voter
app.post('/api/add-voter', (req, res) => {
  const { name, voterId, aadhaar, phone, age, photo, walletAddress } = req.body;

  if (!name || !voterId || !aadhaar || !phone || !walletAddress) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
  const ageValue = Number(age);

  if (ageValue < 18 || ageValue > 100) {
    return res.status(400).json({ success: false, message: 'Age must be between 18 and 100' });
  }

  const sql = `
    INSERT INTO users (name, voterId, aadhaar, mobile_number, age, role, photo, wallet_address)
    VALUES (?, ?, ?, ?, ?, 'user', ?, ?)
  `;

  db.query(
    sql,
    [name, voterId, aadhaar, formattedPhone, ageValue, photo || null, walletAddress],
    (err, result) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ success: false, message: err.message });
      }
      res.json({ success: true, message: 'Voter added successfully', voterId: result.insertId });
    }
  );
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

// Check if connected wallet is allowed to vote
app.post("/api/check-wallet", (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ success: false, message: "Wallet address is required" });
  }

  const sql = "SELECT id, name FROM users WHERE wallet_address = ? LIMIT 1";
  db.query(sql, [walletAddress], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    if (result.length === 0) {
      return res.json({ success: false, message: "Your wallet is not allowed to vote" });
    }

    // Wallet is valid
    res.json({ success: true, voterId: result[0].id, name: result[0].name });
  });
});




// ---------------------------
// Get Election Status (Ongoing / Upcoming / None)
// ---------------------------
app.get('/api/election-status', (req, res) => {
  const today = new Date();

  // 1️⃣ Find ongoing election (today is between from_date and to_date)
  const ongoingSql = `
    SELECT * FROM election 
    WHERE from_date <= ? AND to_date >= ? 
    ORDER BY from_date ASC 
    LIMIT 1
  `;

  db.query(ongoingSql, [today, today], (err, ongoingResult) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (ongoingResult.length > 0) {
      const ongoing = ongoingResult[0];
      return res.json({
        success: true,
        status: 'Ongoing',
        election: {
          id: ongoing.id,
          name: ongoing.name,
          from_date: ongoing.from_date,
          to_date: ongoing.to_date,
          description: ongoing.description
        }
      });
    }

    // 2️⃣ If no ongoing, find the next upcoming election (closest from_date > today)
    const upcomingSql = `
      SELECT * FROM election 
      WHERE from_date > ? 
      ORDER BY from_date ASC 
      LIMIT 1
    `;

    db.query(upcomingSql, [today], (err, upcomingResult) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      if (upcomingResult.length > 0) {
        const upcoming = upcomingResult[0];
        return res.json({
          success: true,
          status: 'Upcoming',
          election: {
            id: upcoming.id,
            name: upcoming.name,
            from_date: upcoming.from_date,
            to_date: upcoming.to_date,
            description: upcoming.description
          }
        });
      }

      // 3️⃣ No ongoing or upcoming
      return res.json({
        success: true,
        status: 'No Elections Scheduled',
        election: null
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
