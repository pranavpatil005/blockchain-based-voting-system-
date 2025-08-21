import React from "react";
import { Link } from "react-router-dom";
import { Vote, Users, BarChart3, Shield, Wallet } from "lucide-react";
import "./VoterDashboard.css";

export default function  VoterDashboard() {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <Vote size={20} color="#fff" />
            </div>
            <span className="logo-text">VOTECHAIN</span>
          </div>

          <nav className="nav-links">
            <Link to="/" className="active">Home</Link>
            <Link to="/candidates">Candidates</Link>
            <Link to="/vote">Vote</Link>
            <Link to="/results">Results</Link>
          </nav>

          <div className="header-buttons">
            <button className="wallet-btn">
              <Wallet size={16} className="icon" /> Connect Wallet
            </button>
            <button className="login-btn">Login</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <div className="badge">
            <Shield size={16} /> Secure Blockchain Voting
          </div>
          <h1 className="hero-title">Democracy Made Digital</h1>
          <p className="hero-subtitle">
            Experience the future of voting with our secure, transparent, and tamper-proof blockchain-based election
            platform.
          </p>

          <div className="stats">
            <div className="stat">
              <div className="stat-number blue">10,000+</div>
              <div className="stat-label">Votes Cast</div>
            </div>
            <div className="stat">
              <div className="stat-number green">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat">
              <div className="stat-number red">100%</div>
              <div className="stat-label">Secure</div>
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
              <p>
                Securely vote for your preferred candidate using blockchain technology. Your vote is encrypted and
                stored securely.
              </p>
              <button className="btn-black">Vote Now</button>
            </div>

            <div className="card">
              <div className="card-icon purple">
                <Users size={28} color="#fff" />
              </div>
              <h3>View Candidates</h3>
              <p>
                Browse the list of candidates and learn about each candidate's background, qualifications, and policies.
              </p>
              <button className="btn-black">View Candidates</button>
            </div>

            <div className="card">
              <div className="card-icon blue">
                <BarChart3 size={28} color="#fff" />
              </div>
              <h3>Election Results</h3>
              <p>
                View real-time or final results of the election. Results are directly from blockchain ensuring
                transparency.
              </p>
              <button className="btn-black">View Results</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
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

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-logo">
              <div className="logo-icon">
                <Vote size={20} color="#fff" />
              </div>
              <span className="logo-text">VOTECHAIN</span>
            </div>
            <p>Revolutionizing democracy through secure blockchain voting technology.</p>
          </div>

          <div>
            <h4>Platform</h4>
            <Link to="/candidates">Candidates</Link>
            <Link to="/vote">Vote</Link>
            <Link to="/results">Results</Link>
          </div>

          <div>
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/security">Security</Link>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2024 VoteChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
