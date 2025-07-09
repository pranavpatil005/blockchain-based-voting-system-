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
          <li onClick={() => navigate('/quicklinks')} style={{ cursor: 'pointer' }}>Quick Links</li>
          <li onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About</li>


        </ul>
        <div className="navbar-right">
          <button className="wallet-button">Connect Wallet</button>
          <button className="admin-button" onClick={handleAdmin}>Admin</button>
        </div>
      </nav>

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

    </div>
  );
}

export default App;