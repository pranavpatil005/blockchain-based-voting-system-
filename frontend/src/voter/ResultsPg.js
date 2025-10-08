import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/resultsPg.css";
import Navbar from "./Navbar";
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
     <Navbar />

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
