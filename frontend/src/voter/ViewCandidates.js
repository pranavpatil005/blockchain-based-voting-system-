import React from 'react';
import '../css/ViewCandidates.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'; // <-- import auth hook

const candidates = [
  {
    name: 'Durvankur Sonar',
    position: 'Mayor',
    party: 'BJP',
    partyColor: 'blue',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C1.jpeg',// <-- Add photo path
    bio: 'Experienced city council member focused on sustainable development and community engagement.',
    policies: ['Green Infrastructure', 'Affordable Housing', 'Public Transportation'],
  },
  {
    name: 'Liji Varghese',
    position: 'Mayor',
    party: 'AAP',
    partyColor: 'red',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C2.jpg',
    bio: 'Small business owner and former police chief committed to public safety and economic growth.',
    policies: ['Public Safety', 'Business Development', 'Infrastructure'],
  },
  {
    name: 'Nikita Kurkure',
    position: 'City Council',
    party: 'Shivsena',
    partyColor: 'purple',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C3.jpg',
    bio: 'Community organizer and education advocate fighting for equitable representation.',
    policies: ['Education Reform', 'Healthcare Access', 'Social Justice'],
  },
  {
    name: 'Pranav Patil',
    position: 'City Council',
    party: 'Rashtravadi Congress',
    partyColor: 'blue',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C4.jpg',
    bio: 'Environmental lawyer dedicated to climate action and sustainable city planning.',
    policies: ['Climate Action', 'Renewable Energy', 'Urban Planning'],
  },
  {
    name: 'Vivek Chaudhari',
    position: 'School Board',
    party: 'Congress',
    partyColor: 'red',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C5.jpg',
    bio: 'Parent and former teacher advocating for educational excellence and fiscal responsibility.',
    policies: ['Educational Standards', 'Fiscal Responsibility', 'Parent Rights'],
  },
  
];

const ViewCandidates = () => {
  const navigate = useNavigate();
  const { userLogout } = useUserAuth();  // <-- get userLogout here

  const handleLogout = () => {
    userLogout();      // call logout function from context
    navigate('/');     // redirect to login page after logout
  };

  return (
    <div  style={{
    paddingTop: "850px", 
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

      {/* Content */}
      <div className="candidates-wrapper">
        <h1 className="election-title">Mayor Elections 2025</h1>
        <p className="subtitle">Meet Your Candidates</p>
        <p className="election-day">📅 Election Day: September 5, 2025</p>

        <div className="candidate-cards">
          {candidates.map((candidate, idx) => (
            <div className="candidate-card" key={idx}>
               <img src={candidate.image} alt={candidate.name} className="candidate-photo" />
              <div className="candidate-photo" />
              <h2>{candidate.name}</h2>
              <span className="position-tag">{candidate.position}</span>
              <span className={`party-tag ${candidate.partyColor}`}>{candidate.party}</span>
              <p className="bio">{candidate.bio}</p>
              <p className="policy-title">Key Policy Positions:</p>
              <div className="policy-tags">
                {candidate.policies.map((policy, i) => (
                  <span className="policy-tag" key={i}>{policy}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCandidates;
