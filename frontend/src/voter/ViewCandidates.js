import React from 'react';
import '../css/ViewCandidates.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'; // <-- import auth hook

const candidates = [
  {
    name: 'Sarah Johnson',
    position: 'Mayor',
    party: 'Democratic Party',
    partyColor: 'blue',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C1.jpeg',// <-- Add photo path
    bio: 'Experienced city council member focused on sustainable development and community engagement.',
    policies: ['Green Infrastructure', 'Affordable Housing', 'Public Transportation'],
  },
  {
    name: 'Michael Chen',
    position: 'Mayor',
    party: 'Republican Party',
    partyColor: 'red',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C2.jpg',
    bio: 'Small business owner and former police chief committed to public safety and economic growth.',
    policies: ['Public Safety', 'Business Development', 'Infrastructure'],
  },
  {
    name: 'Elena Rodriguez',
    position: 'City Council',
    party: 'Independent',
    partyColor: 'purple',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C3.jpg',
    bio: 'Community organizer and education advocate fighting for equitable representation.',
    policies: ['Education Reform', 'Healthcare Access', 'Social Justice'],
  },
  {
    name: 'David Thompson',
    position: 'City Council',
    party: 'Democratic Party',
    partyColor: 'blue',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C4.jpg',
    bio: 'Environmental lawyer dedicated to climate action and sustainable city planning.',
    policies: ['Climate Action', 'Renewable Energy', 'Urban Planning'],
  },
  {
    name: 'Amanda Foster',
    position: 'School Board',
    party: 'Republican Party',
    partyColor: 'red',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C5.jpg',
    bio: 'Parent and former teacher advocating for educational excellence and fiscal responsibility.',
    policies: ['Educational Standards', 'Fiscal Responsibility', 'Parent Rights'],
  },
  {
    name: 'James Wilson',
    position: 'School Board',
    party: 'Independent',
    partyColor: 'purple',
    image: 'C:\Users\Asus\Downloads\Proj_vote\Repository\blockchain-based-voting-system-\frontend\Candidate images\C6.jpg',
    bio: 'Technology professional focused on modernizing education and digital literacy.',
    policies: ['Digital Learning', 'STEM Education', 'Technology Integration'],
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
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">📊 VOTECHAIN</span>
        </div>
       
         <ul className="navbar-center">
          <li onClick={() => navigate('/voter')}>Home</li>
          <li onClick={() => navigate('/candidates')}>Candidates</li>
          <li onClick={() => navigate('/castvote')}>Vote</li>
          <li onClick={() => alert('Showing Results...')}>Results</li>
        </ul>

       <div className="navbar-right">
    <button className="wallet-button">Connect Wallet</button>
    <button className="logout-button" onClick={handleLogout}>
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
