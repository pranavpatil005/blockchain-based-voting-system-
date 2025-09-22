import React, { useState } from 'react';
import '../css/Votepage.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'; // <-- import auth hook

const candidates = [
  {
    name: 'Durvankur Sonar',
    position: 'Mayor',
    party: 'Democratic Party',
    partyColor: 'blue',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C1.jpeg',// <-- Add photo path
    bio: 'Experienced city council member focused on sustainable development and community engagement.',
    policies: ['Green Infrastructure', 'Affordable Housing', 'Public Transportation'],
  },
  {
    name: 'Liji Varghese',
    position: 'Mayor',
    party: 'Republican Party',
    partyColor: 'red',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C2.jpg',
    bio: 'Small business owner and former police chief committed to public safety and economic growth.',
    policies: ['Public Safety', 'Business Development', 'Infrastructure'],
  },
  {
    name: 'Nikita Kurkure',
    position: 'City Council',
    party: 'Independent',
    partyColor: 'purple',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C3.jpg',
    bio: 'Community organizer and education advocate fighting for equitable representation.',
    policies: ['Education Reform', 'Healthcare Access', 'Social Justice'],
  },
  {
    name: 'Pranav Patil',
    position: 'City Council',
    party: 'Democratic Party',
    partyColor: 'blue',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C4.jpg',
    bio: 'Environmental lawyer dedicated to climate action and sustainable city planning.',
    policies: ['Climate Action', 'Renewable Energy', 'Urban Planning'],
  },
  {
    name: 'Vivek Chaudhari',
    position: 'School Board',
    party: 'Republican Party',
    partyColor: 'red',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C5.jpg',
    bio: 'Parent and former teacher advocating for educational excellence and fiscal responsibility.',
    policies: ['Educational Standards', 'Fiscal Responsibility', 'Parent Rights'],
  },
 
];

const Votepage = () => {
  const [selected, setSelected] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { userLogout } = useUserAuth(); // <-- get logout function here

  const openConfirm = () => selected !== null && setShowConfirm(true);

  const confirmVote = () => {
    alert(`✅ Your vote for ${candidates[selected].name} has been recorded!`);
    setShowConfirm(false);
  };

  const handleLogout = () => {
    userLogout(); // ✅ logout function
    navigate("/"); // redirect to login
  };

  return (
    <div className="vote-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">📊 VOTECHAIN</span>
        </div>
        <ul className="navbar-center">
          <li onClick={() => navigate('/voter')}>Home</li>
          <li onClick={() => navigate('/candidates')}>Candidates</li>
          <li onClick={() => navigate('/castvote')}>Vote</li>
          <li onClick={() => navigate("/results")}>Results</li>
        </ul>
        <div className="navbar-right">
          <button className="wallet-button">Connect Wallet</button>
          <button
            className="logout-button"
            style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <h1 className="title">Cast Your Vote</h1>
      <p className="subtitle">Mayor Election 2024</p>

      <div className="instructions">
        Select one candidate below and click <strong>“Cast Vote”</strong> to submit
        your ballot. You can only vote once.
      </div>

      {/* Candidate list */}
      {candidates.map((c, idx) => (
        <label
          key={idx}
          className={`candidate-box ${selected === idx ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name="candidate"
            checked={selected === idx}
            onChange={() => setSelected(idx)}
          />

          <div className="candidate-content">
            <div className="avatar" />
            <div className="candidate-info">
              <h2 className="candidate-name">{c.name}</h2>
              <span className={`party-tag ${c.partyColor}`}>{c.party}</span>

              <p className="slogan">“{c.slogan}”</p>
              <p className="experience">{c.experience}</p>
              <p className="bio">{c.bio}</p>

              <p className="policy-title">Key Policy Positions:</p>
              <div className="policy-tags">
                {c.policies.map((p, i) => (
                  <span className="policy-tag" key={i}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </label>
      ))}

      <button
        className="cast-button"
        disabled={selected === null}
        onClick={openConfirm}
      >
        🗳️ Cast Your Vote
      </button>

      {selected !== null && (
        <p className="selection-msg">
          You have selected: <strong>{candidates[selected].name}</strong>
        </p>
      )}

      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Confirm Your Vote</h3>
            <p>Are you sure you want to vote for:</p>

            <div className="modal-candidate">
              <span>{candidates[selected].name}</span>
              <span className={`party-tag ${candidates[selected].partyColor}`}>
                {candidates[selected].party}
              </span>
            </div>

            <p className="warning">
              ⚠️ This action cannot be undone. You can only vote once.
            </p>

            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmVote}>
                Yes, Cast My Vote
              </button>
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Votepage;
