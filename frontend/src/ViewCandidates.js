import React from 'react';
import './css/ViewCandidates.css';

const candidates = [
  {
    name: 'Sarah Johnson',
    party: 'Progressive Party',
    district: 'District 3',
    education: 'Harvard Law School, JD',
    experience: 'Former Mayor, 8 years',
    policies: [
      'Universal Healthcare Access',
      'Climate Change Action',
      'Education Funding Reform',
      'Affordable Housing Initiative',
    ],
  },
  {
    name: 'Michael Chen',
    party: 'Unity Coalition',
    district: 'District 1',
    education: 'MIT, MBA',
    experience: 'State Senator, 6 years',
    policies: [
      'Economic Growth & Innovation',
      'Infrastructure Modernization',
      'Technology Integration',
      'Small Business Support',
    ],
  },
  {
    name: 'Elena Rodriguez',
    party: 'Democratic Alliance',
    district: 'District 2',
    education: 'Stanford University, BA Political Science',
    experience: 'City Council, 4 years',
    policies: [
      'Social Justice Reform',
      'Community Development',
      'Affordable Housing',
      'Public Transportation',
    ],
  },
];

const ViewCandidates = () => {
  return (
    <div className="view-container">
      <h1>View Candidates</h1>
      <p className="subtitle">
        Browse the list of candidates participating in the current election. Learn about each
        candidate's background, qualifications, and proposed policies.
      </p>

      {candidates.map((candidate, index) => (
        <div className="candidate-card" key={index}>
          <div className="candidate-header">
            <div className="avatar" />
            <div className="info">
              <h2>{candidate.name}</h2>
              <span className="party">{candidate.party}</span>
              <p>📍 {candidate.district}</p>
              <p>🎓 {candidate.education}</p>
              <p>👤 {candidate.experience}</p>
            </div>
          </div>

          <div className="tabs">
            <div>Platform</div>
            <div>Achievements</div>
            <div>Endorsements</div>
          </div>

          <div className="policy-section">
            <h4>Key Policy Positions</h4>
            <ul>
              {candidate.policies.map((policy, i) => (
                <li key={i}>🔵 {policy}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <button className="home-btn">Return to Home</button>
    </div>
  );
};

export default ViewCandidates;
