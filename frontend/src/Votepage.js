import React, { useState } from 'react';
import './css/Votepage.css';

const candidates = [
  {
    name: "Sarah Johnson",
    party: "Progressive Party",
    details: "Healthcare reform, Education funding, Climate action"
  },
  {
    name: "Michael Chen",
    party: "Unity Coalition",
    details: "Economic growth, Infrastructure, Technology innovation"
  },
  {
    name: "Elena Rodriguez",
    party: "Democratic Alliance",
    details: "Social justice, Affordable housing, Community development"
  }
];

const VotePage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="vote-page">
      <h2>Cast Your Vote</h2>
      <p>Select your preferred candidate and cast your vote securely on the blockchain.</p>

      <div className="candidate-list">
        {candidates.map((candidate, index) => (
          <label key={index} className={`candidate-box ${selected === index ? "selected" : ""}`}>
            <input
              type="radio"
              name="candidate"
              value={candidate.name}
              onChange={() => setSelected(index)}
            />
            <div className="candidate-info">
              <strong>{candidate.name}</strong>
              <span className="party">{candidate.party}</span>
              <p>{candidate.details}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="security-boxes">
        <div className="security encrypted">
          <h4>Encrypted</h4>
          <p>Your vote is encrypted and secure</p>
        </div>
        <div className="security immutable">
          <h4>Immutable</h4>
          <p>Cannot be altered or deleted</p>
        </div>
        <div className="security anonymous">
          <h4>Anonymous</h4>
          <p>Your identity remains private</p>
        </div>
      </div>

      <button className="cast-btn" disabled={selected === null}>
        🗳️ Cast Vote
      </button>
    </div>
  );
};

export default VotePage;
