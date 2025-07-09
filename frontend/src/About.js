// src/components/About.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/About.css';

const cardData = [
  {
    title: 'Our Mission',
    description: 'We are committed to delivering high-quality digital solutions that are secure, scalable, and user-friendly.',
    image: 'https://img.icons8.com/clouds/100/mission.png',
  },
  {
    title: 'Our Vision',
    description: 'To become a global leader in innovative software products and impactful digital transformation.',
    image: 'https://img.icons8.com/clouds/100/vision.png',
  },
  {
    title: 'Our Team',
    description: 'We are a passionate team of engineers, designers, and thinkers solving real-world problems.',
    image: 'https://img.icons8.com/clouds/100/conference-call.png',
  },
];

const About = () => {
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
          <li onClick={() => navigate('/candidates')}>Candidates</li>
          <li onClick={() => navigate('/vote')}>Vote</li>
          <li onClick={handleResults}>Results</li>
          <li onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About</li>
        </ul>
        <div className="navbar-right">
          <button className="wallet-button">Connect Wallet</button>
          <button className="admin-button">Admin</button>
        </div>
      </nav>

      {/* About Section */}
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <div className="card-container">
          {cardData.map((card, index) => (
            <div className="about-card" key={index}>
              <img src={card.image} alt={card.title} className="card-image" />
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
