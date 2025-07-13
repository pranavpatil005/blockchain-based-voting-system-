// src/components/About.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/About.css';

const cardData = [
  {
    title: 'Our Mission',
    description: 'We are committed to delivering high-quality digital solutions that are secure, scalable, and user-friendly.',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    title: 'Our Vision',
    description: 'To become a global leader in innovative software products and impactful digital transformation.',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png',
  },
  {
    title: 'Our Team',

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
        
        <div className="navbar-right">
          <button className="wallet-button">Connect Wallet</button>
          <button className="admin-button">Admin</button>
        </div>
      </nav>

      {/* About Section */}
      <div className="about-container">
        <h1 className="about-title" style={{ marginTop: 100, }}>About Us</h1>
        <div className="card-container">
          {cardData.map((card, index) => (
            <div
              className={`about-card ${index === 2 ? "about-card-full" : ""}`} // 👈 Applies teal color to 3rd
              key={index}
            >
              <img src={card.image} alt={card.title} className="card-image" />
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
               {index === 2 && (
   <div className="student-badges">
  <span className="badge">Durvankur Sonar</span>
  <span className="badge">Liji Varghese</span>
  <span className="badge">Nikita Kurkure</span>
  <span className="badge">Pranav Patil</span>
  <span className="badge">Vivek Chaudhari</span>
</div>

  )}
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default About;
