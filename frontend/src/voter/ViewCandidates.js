import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ViewCandidates.css';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const ViewCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [electionName, setElectionName] = useState('');
  const navigate = useNavigate();
  const { userLogout } = useUserAuth();

  const handleLogout = () => {
    userLogout();
    navigate('/');
  };

  useEffect(() => {
    // Fetch all elections and candidates
    axios
      .get('http://localhost:5000/api/elections') // fetch all elections
      .then((res) => {
        if (!res.data.success) return;

        const today = new Date();
        const elections = res.data.elections;

        // Find active election
        const activeElection = elections.find((e) => {
          const fromDate = new Date(e.from_date);
          const toDate = new Date(e.to_date);
          return today >= fromDate && today <= toDate;
        });

        if (!activeElection) {
          setElectionName('No active election today');
          setCandidates([]);
          return;
        }

        setElectionName(activeElection.name);

        // Fetch candidates for this active election only
        axios
          .get('http://localhost:5000/api/candidates')
          .then((res) => {
            const allCandidates = res.data;
            const activeCandidates = allCandidates.filter(
              (c) => c.election_id === activeElection.id
            );
            setCandidates(activeCandidates);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ paddingTop: '100px', fontFamily: 'Arial, sans-serif' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        padding: '12px 24px',
        color: 'white',
        zIndex: 1000,
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>📊 VOTECHAIN</div>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '24px', marginRight: 100, padding: 0 }}>
          <li onClick={() => navigate('/voter')} style={{ cursor: 'pointer' }}>Home</li>
          <li onClick={() => navigate('/candidates')} style={{ cursor: 'pointer' }}>Candidates</li>
          <li onClick={() => navigate('/castvote')} style={{ cursor: 'pointer' }}>Vote</li>
        </ul>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '5px' }}>
            Connect Wallet
          </button>
          <button onClick={handleLogout} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '5px' }}>
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ width: '90%', margin: '0 auto', paddingTop: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>{electionName}</h1>
        {candidates.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No candidates for this election</p>
        ) : (
          <div className="candidate-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {candidates.map((candidate) => (
              <div key={candidate.id} className="candidate-card" style={{
                width: '250px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}>
                <img
                  src={candidate.photo ? candidate.photo : 'https://via.placeholder.com/200'}
                  alt={candidate.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px' }}
                />
                <h2 style={{ margin: '10px 0' }}>{candidate.name}</h2>
                <p><strong>DOB:</strong> {candidate.dob || '-'}</p>
                <p><strong>Qualification:</strong> {candidate.qualification || '-'}</p>
                <span style={{
                  display: 'inline-block',
                  margin: '5px 0',
                  padding: '5px 10px',
                  backgroundColor: '#2980b9',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '14px'
                }}>{candidate.party}</span>
                <div style={{ marginTop: '10px' }}>
                  <img
                    src={candidate.party_logo ? candidate.party_logo : 'https://via.placeholder.com/50'}
                    alt={candidate.party}
                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCandidates;
