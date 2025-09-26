import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/resultsPg.css";

const sampleCandidates = [
  { id: 1, name: "Durvankur Sonar", party: "BJP", votes: 1542 },
  { id: 2, name: "Lji Varghese", party: "AAP", votes: 1285 },
  { id: 3, name: "Nikita Kurkure", party: "Shivsena", votes: 1323 },
  { id: 4, name: "Pranav Patil", party: "Rashtravadi Congress", votes: 1451 },
  { id: 5, name: "Vivek Chaudhari", party: "Congress", votes: 1345 },
];

export default function ResultsPg() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/voterlogin");
  };

  const totalVotes = sampleCandidates.reduce((sum, c) => sum + c.votes, 0);
  const eligibleVoters = 45000;
  const turnout = ((totalVotes / eligibleVoters) * 100).toFixed(1);

  return (
    <div className="results-page"  style={{
    paddingTop: "350px", 
  }}>
      <nav
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#2c3e50",
      padding: "12px 24px",
      color: "white",
      fontFamily: "Arial, sans-serif",
      zIndex: 1000, // keep navbar on top
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    }}
  >
        {/* Left Logo */}
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>📊 VOTECHAIN</div>

        {/* Center Menu */}
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "24px",
            margin: 0,
            padding: 0,
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <li onClick={() => navigate("/voter")}>Home</li>
          <li onClick={() => navigate("/candidates")}>Candidates</li>
          <li onClick={() => navigate("/castvote")}>Vote</li>
          <li onClick={() => navigate("/results")}>Results</li>
        </ul>

        {/* Right Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* election results body */}
      <div className="wrap">
        <div className="results-header">
          <h1>Election Results</h1>
          <p className="lead">
            View real-time or final results of the election. Results are calculated directly from the blockchain, ensuring complete transparency.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <p className="stat-title">Total Votes</p>
            <p className="stat-value">{totalVotes.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <p className="stat-title">Eligible Voters</p>
            <p className="stat-value">{eligibleVoters.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <p className="stat-title">Turnout</p>
            <p className="stat-value">{turnout}%</p>
          </div>
        </div>

        {/* Candidate Results */}
        <div className="candidates-card">
          <div className="candidates-header">
            <h3>Candidate Results</h3>
          </div>
          <div className="candidates-list">
            {sampleCandidates.map((c, i) => {
              const pct = ((c.votes / totalVotes) * 100).toFixed(1);
              return (
                <div key={c.id} className="candidate-row">
                  <div className="candidate-left">
                    <div className="avatar">
                      <span>{i + 1}</span>
                    </div>
                    <div className="candidate-meta">
                      <p className="candidate-name">{c.name}</p>
                      <p className="candidate-party">{c.party}</p>
                    </div>
                  </div>
                  <div className="candidate-right">
                    <div className="progress-wrap">
                      <div
                        className="progress-fill"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <div className="candidate-stats">
                      <p className="candidate-pct">{pct}%</p>
                      <p className="candidate-votes">
                        {c.votes.toLocaleString()} votes
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="actions-row">
          <button className="btn ghost" onClick={() => navigate("/voter")}>
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
