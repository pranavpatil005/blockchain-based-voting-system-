import React, { useState } from 'react';
import '../css/CandidateManagement.css';

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    age: '',
    manifesto: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    setCandidates([...candidates, formData]);
    setFormData({ name: '', party: '', age: '', manifesto: '' });
  };

  return (
    <div className="candidate-management-container">
      <h2>Candidate Management</h2>

      <form className="candidate-form" onSubmit={handleAddCandidate}>
        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="party"
          placeholder="Political Party"
          value={formData.party}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <textarea
          name="manifesto"
          placeholder="Manifesto"
          value={formData.manifesto}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Add Candidate</button>
      </form>

      <div className="candidate-list">
        <h3>Registered Candidates</h3>
        {candidates.length === 0 ? (
          <p>No candidates added yet.</p>
        ) : (
          <ul>
            {candidates.map((candidate, index) => (
              <li key={index}>
                <strong>{candidate.name}</strong> ({candidate.party}) - Age: {candidate.age}
                <p>{candidate.manifesto}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CandidateManagement;
