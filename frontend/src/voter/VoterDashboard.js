import React from "react";
import { Link } from "react-router-dom";
import { Vote, Users, BarChart3, Shield, Wallet } from "lucide-react";
import "../css/VoterDashboard.css";
import '../css/ViewCandidates.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';


export default function VoterDashboard() {
  const navigate = useNavigate();
  const { userLogout } = useUserAuth();  // <-- get userLogout here

  const handleLogout = () => {
    userLogout();      // call logout function from context
    navigate('/');     // redirect to login page after logout
  };
  return (
    <div
      className="homepage"
      style={{
        paddingTop: "900px",
      }}
    >
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
            marginRight: "100px",
            padding: 0,
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <li onClick={() => navigate("/voter")}>Home</li>
          <li onClick={() => navigate("/candidates")}>Candidates</li>
          <li onClick={() => navigate("/castvote")}>Vote</li>
          {/* <li onClick={() => navigate("/results")}>Results</li> */}
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">

          <h1 className="hero-title">Blockchain based E-Voting System</h1>
          <p className="hero-subtitle">
            Experience the future of voting with our secure, transparent, and tamper-proof blockchain-based election
            platform.
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/castvote")}
          >
            Vote Now
          </button>


        </div>
      </section>

      {/* Features Section */}
      <section className="features" style={{backgroundColor:"#d4e0e9ff"}}>
        <div className="container text-center">
          <h2 className="section-title">Why Choose VoteChain?</h2>
          <p className="section-subtitle">
            Built with cutting-edge technology to ensure fair and transparent elections
          </p>

          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon blue">
                <Shield size={28} color="#fff" />
              </div>
              <h3>Secure & Tamper-Proof</h3>
              <p>Blockchain ensures your vote cannot be altered or manipulated</p>
            </div>

            <div className="feature">
              <div className="feature-icon green">
                <Vote size={28} color="#fff" />
              </div>
              <h3>Easy to Use</h3>
              <p>Simple and intuitive interface makes voting accessible to everyone</p>
            </div>

            <div className="feature">
              <div className="feature-icon red">
                <BarChart3 size={28} color="#fff" />
              </div>
              <h3>Transparent Results</h3>
              <p>Every vote is publicly verifiable while maintaining privacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links">
        <div className="container text-center">
          <h2 className="section-title">Quick Links</h2>
          <p className="section-subtitle">Access key features of our e-voting platform</p>

          <div className="cards">
            <div className="card">
              <div className="card-icon dark">
                <Vote size={28} color="#fff" />
              </div>
              <h3>Cast Your Vote</h3>
              <p style={{ fontSize: '15px' }}>
                Securely vote for your preferred candidate using blockchain technology. Your vote is encrypted and
                stored securely.
              </p>
              <button
                className="btn-black"
                onClick={() => navigate("/castvote")}
              >
                Vote Now
              </button>

            </div>

            <div className="card">
              <div className="card-icon purple">
                <Users size={28} color="#fff" />
              </div>
              <h3>View Candidates</h3>
              <p style={{ fontSize: '15px' }}>
                Browse the list of candidates and learn about each candidate's background, qualifications, and policies.
              </p>

              <button
                className="btn-black"
                onClick={() => navigate("/candidates")}
              >
                View Candidates
              </button>

            </div>

            {/* <div className="card">
              <div className="card-icon blue">
                <BarChart3 size={28} color="#fff" />
              </div>
              <h3>Election Results</h3>
              <p style={{ fontSize: '15px' }}>
                View real-time or final results of the election. Results are directly from blockchain ensuring
                transparency.
              </p>
              <button
                className="btn-black"
                onClick={() => navigate("/results")}
              >
                View Results
              </button>
            </div> */}
          </div>
        </div>
      </section>



    </div>
  );
}
