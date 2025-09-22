// import React, { useState } from 'react';
// import '../css/CreateElection.css';

// const CreateElection = () => {
//   const [electionName, setElectionName] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');

//   const handleCreateElection = (e) => {
//     e.preventDefault();

//     if (!electionName || !startDate || !endDate || !description) {
//       setMessage('Please fill in all fields.');
//       return;
//     }

//     // TODO: Replace with actual backend call
//     console.log({ electionName, startDate, endDate, description });

//     setMessage('Election created successfully!');

//     // Reset form
//     setElectionName('');
//     setStartDate('');
//     setEndDate('');
//     setDescription('');
//   };

//   return (
//     <div className="create-election-container">
//       <h2>Create New Election</h2>
//       <form className="election-form" onSubmit={handleCreateElection}>
//         <input
//           type="text"
//           placeholder="Election Name"
//           value={electionName}
//           onChange={(e) => setElectionName(e.target.value)}
//         />

//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />

//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />

//         <textarea
//           placeholder="Election Description"
//           rows="4"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></textarea>

//         <button type="submit">Create Election</button>

//         {message && <p className="message">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreateElection;
import React, { useState } from "react";
import "../css/CreateElection.css";

const CreateElection = () => {
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [candidates, setCandidates] = useState([""]);
  const [whitelistOnly, setWhitelistOnly] = useState(false);
  const [voterFile, setVoterFile] = useState(null);
  const [uploadedVoters, setUploadedVoters] = useState(0);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCandidateChange = (index, value) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  const addCandidate = () => setCandidates([...candidates, ""]);
  const removeCandidate = (index) =>
    setCandidates(candidates.filter((_, i) => i !== index));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setVoterFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const lines = reader.result
          .split("\n")
          .filter((line) => line.trim() !== "");
        setUploadedVoters(lines.length);
      };
      reader.readAsText(file);
    } else {
      setMessage("Please upload a valid CSV file.");
      setVoterFile(null);
      setUploadedVoters(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !electionName ||
      !startDate ||
      !endDate ||
      !description ||
      candidates.some((c) => !c)
    ) {
      setMessage("Please fill all fields and add at least one candidate.");
      return;
    }
    if (whitelistOnly && uploadedVoters === 0) {
      setMessage("Please upload a voter list for whitelist election.");
      return;
    }
    setShowModal(true);
  };

  const confirmElection = () => {
    console.log({
      electionName,
      startDate,
      endDate,
      description,
      candidates,
      whitelistOnly,
      voterFile,
    });

    setMessage("Election created successfully!");
    setShowModal(false);

    setElectionName("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setCandidates([""]);
    setWhitelistOnly(false);
    setVoterFile(null);
    setUploadedVoters(0);
  };

  return (
    <div className="create-election-container">
      <h2>Create New Election</h2>
      <form className="election-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Election Name"
          value={electionName}
          onChange={(e) => setElectionName(e.target.value)}
        />

        {/* Start Date & Time */}
        <label htmlFor="startDate">Start Date & Time</label>
        <input
          id="startDate"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {/* End Date & Time */}
        <label htmlFor="endDate">End Date & Time</label>
        <input
          id="endDate"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <textarea
          placeholder="Election Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Candidate Section */}
        <div className="candidate-section">
          <h3>Candidates</h3>
          {candidates.map((candidate, index) => (
            <div key={index} className="candidate-input">
              <input
                type="text"
                placeholder={`Candidate ${index + 1}`}
                value={candidate}
                onChange={(e) => handleCandidateChange(index, e.target.value)}
              />
              {candidates.length > 1 && (
                <button type="button" onClick={() => removeCandidate(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-candidate-btn"
            onClick={addCandidate}
          >
            + Add Candidate
          </button>
        </div>

        {/* Voter Upload Section */}
        {whitelistOnly && (
          <div className="voter-upload-section">
            <label>Upload Voter CSV:</label>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            {uploadedVoters > 0 && <p>Uploaded {uploadedVoters} voters</p>}
          </div>
        )}

        <div className="whitelist-section">
          <label>
            <input
              type="checkbox"
              checked={whitelistOnly}
              onChange={() => setWhitelistOnly(!whitelistOnly)}
            />
            Whitelist Only Election
          </label>
        </div>

        <button type="submit" className="create-btn">
          Create Election
        </button>
        {message && <p className="message">{message}</p>}
      </form>

      {/* Candidate Preview */}
      <div className="candidate-preview">
        <h3>Candidate Preview</h3>
        <ul>
          {candidates.filter((c) => c).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Election Details</h3>
            <p>
              <strong>Name:</strong> {electionName}
            </p>
            <p>
              <strong>Dates:</strong> {startDate} to {endDate}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Candidates:</strong>{" "}
              {candidates.filter((c) => c).join(", ")}
            </p>
            {whitelistOnly && (
              <p>
                <strong>Voters Uploaded:</strong> {uploadedVoters}
              </p>
            )}
            <div className="modal-buttons">
              <button onClick={confirmElection} className="confirm-btn">
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateElection;
