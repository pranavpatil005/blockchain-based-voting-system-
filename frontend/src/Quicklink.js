// src/components/Quicklink.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import "./css/Quicklink.css";

const Quicklink = () => {
  const navigate = useNavigate();

  const handleVote = () => navigate("/vote");
  const handleCandidates = () => navigate("/candidates");
  const handleResults = () => alert("Showing Results...");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">📊 VOTECHAIN</span>
        </div>
        <ul className="navbar-center">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={handleCandidates}>Candidates</li>
          <li onClick={handleVote}>Vote</li>
          <li onClick={handleResults}>Results</li>
          <li onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About</li>
        </ul>
        <div className="navbar-right">
          <button className="wallet-button">Connect Wallet</button>
          <button className="admin-button">Admin</button>
        </div>
      </nav>

      <div style={{ height: '100px' }}></div> {/* spacing below fixed navbar */}

      {/* Quick Links Section */}
      <section className="quick-links">
        <h2>Quick Links</h2>
        <p>Access key features of our e-voting platform</p>
        <div className="cards">
          <div className="card">
            <div className="card-icon">🗳</div>
            <h3>Cast Your Vote</h3>
            <p>
              Securely vote for your preferred candidate using blockchain
              technology. Your vote is encrypted and stored on the blockchain,
              ensuring it cannot be tampered with.
            </p>
            <button className="card-button" onClick={handleVote}>Vote Now</button>
          </div>
          <div className="card">
            <div className="card-icon">👥</div>
            <h3>View Candidates</h3>
            <p>
              Browse the list of candidates participating in the current
              election. Learn about each candidate's background, qualifications,
              and proposed policies.
            </p>
            <button className="card-button" onClick={handleCandidates}>View Candidates</button>
          </div>
          <div className="card">
            <div className="card-icon">📈</div>
            <h3>Election Results</h3>
            <p>
              View real-time or final results of the election. Results are
              calculated directly from the blockchain, ensuring complete
              transparency.
            </p>
            <button className="card-button" onClick={handleResults}>View Results</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quicklink;
