import React from "react";
import "./css/HomePage.css";
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const handleRegister = () => alert("Redirecting to Register...");
  const handleLogin = ()=> {
        navigate("/userlogin"); 
    };
    
  const handleVote = ()=> {navigate("/vote");  };
  const handleCandidates = () => {navigate("/candidates");  };
  const handleResults = () => alert("Showing Results...");
  const handleAdmin = () => navigate("/admin");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">📊 VOTECHAIN</span>
        </div>
        <ul className="navbar-center">
          <li>Home</li>
          <li>Candidates</li>
          <li>Vote</li>
          <li>Results</li>
          <li>About</li>
        </ul>
        <div className="navbar-right">
          <button className="wallet-button">Connect Wallet</button>
          <button className="admin-button" onClick={handleAdmin}>Admin</button>
        </div>
      </nav>

<div style={{ height: '500px' }}></div>

      {/* Hero Section */}
      <section className="hero">
        <h1>Secure Voting on the Blockchain</h1>
        <p>
          Transparent, tamper-proof, and accessible voting system powered by
          blockchain technology.
        </p>
        <div className="hero-buttons">
          <button className="register-button" onClick={handleRegister}>
            Register to Vote →
          </button>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="status">
          Election Status: <span className="ongoing">🟠 Ongoing</span>
        </div>
      </section>

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
}

export default App;