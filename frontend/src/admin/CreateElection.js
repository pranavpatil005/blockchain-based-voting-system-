import React, { useState } from 'react';
import '../css/CreateElection.css';

const CreateElection = () => {
  const [electionName, setElectionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateElection = (e) => {
    e.preventDefault();

    if (!electionName || !startDate || !endDate || !description) {
      setMessage('Please fill in all fields.');
      return;
    }

    // TODO: Replace with actual backend call
    console.log({ electionName, startDate, endDate, description });

    setMessage('Election created successfully!');

    // Reset form
    setElectionName('');
    setStartDate('');
    setEndDate('');
    setDescription('');
  };

  return (
    <div className="create-election-container">
      <h2>Create New Election</h2>
      <form className="election-form" onSubmit={handleCreateElection}>
        <input
          type="text"
          placeholder="Election Name"
          value={electionName}
          onChange={(e) => setElectionName(e.target.value)}
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <textarea
          placeholder="Election Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Create Election</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default CreateElection;