import React, { useState } from 'react';
import '../css/VoterManagement.css';

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    voterId: '',
    aadhaar: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddVoter = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.voterId || !formData.aadhaar || !formData.phone) return;

    setVoters([...voters, formData]);
    setFormData({ name: '', voterId: '', aadhaar: '', phone: '' });
  };

  return (
    <div className="voter-management-container">
      <h2>Manage Voters</h2>

      <form className="voter-form" onSubmit={handleAddVoter}>
        <input
          type="text"
          name="name"
          placeholder="Voter Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="voterId"
          placeholder="Voter ID"
          value={formData.voterId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={formData.aadhaar}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">Add Voter</button>
      </form>

      <div className="voter-list">
        <h3>Registered Voters</h3>
        <ul>
          {voters.map((voter, index) => (
            <li key={index}>
              <strong>{voter.name}</strong> (ID: {voter.voterId}, Aadhaar: {voter.aadhaar}, Phone: {voter.phone})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoterManagement;