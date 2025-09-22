// import React, { useState } from 'react';
// import '../css/CandidateManagement.css';

// const CandidateManagement = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     party: '',
//     age: '',
//     manifesto: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleAddCandidate = (e) => {
//     e.preventDefault();
//     setCandidates([...candidates, formData]);
//     setFormData({ name: '', party: '', age: '', manifesto: '' });
//   };

//   return (
//     <div className="candidate-management-container">
//       <h2>Candidate Management</h2>

//       <form className="candidate-form" onSubmit={handleAddCandidate}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Candidate Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="party"
//           placeholder="Political Party"
//           value={formData.party}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="age"
//           placeholder="Age"
//           value={formData.age}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="manifesto"
//           placeholder="Manifesto"
//           value={formData.manifesto}
//           onChange={handleChange}
//           required
//         ></textarea>
//         <button type="submit">Add Candidate</button>
//       </form>

//       <div className="candidate-list">
//         <h3>Registered Candidates</h3>
//         {candidates.length === 0 ? (
//           <p>No candidates added yet.</p>
//         ) : (
//           <ul>
//             {candidates.map((candidate, index) => (
//               <li key={index}>
//                 <strong>{candidate.name}</strong> ({candidate.party}) - Age: {candidate.age}
//                 <p>{candidate.manifesto}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandidateManagement;
import React, { useState, useRef } from "react";
import "../css/CandidateManagement.css";

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    party: "",
    qualification: "",
    contact: "",
    manifesto: "",
    image: null,
    partyLogo: null,
    status: "Pending",
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload (candidate photo or party logo)
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "candidate") {
        setFormData({ ...formData, image: imageUrl });
      } else {
        setFormData({ ...formData, partyLogo: imageUrl });
      }
    }
  };

  // Add candidate
  const addCandidate = (e) => {
    e.preventDefault();

    // Age validation
    if (parseInt(formData.age) < 18) {
      alert("Candidate must be at least 18 years old.");
      return;
    }

    // Unique name validation
    if (
      candidates.some(
        (c) => c.name.toLowerCase() === formData.name.toLowerCase()
      )
    ) {
      alert("Candidate name must be unique.");
      return;
    }

    setCandidates([...candidates, { id: Date.now(), ...formData }]);

    // Reset form
    setFormData({
      name: "",
      age: "",
      party: "",
      qualification: "",
      contact: "",
      manifesto: "",
      image: null,
      partyLogo: null,
      status: "Pending",
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  // Approve / Reject candidate
  const updateStatus = (id, status) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  // Delete candidate
  const deleteCandidate = (id) => {
    setCandidates(candidates.filter((c) => c.id !== id));
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["Name,Age,Party,Qualification,Contact,Status"];
    const rows = candidates.map(
      (c) =>
        `${c.name},${c.age},${c.party},${c.qualification},${c.contact},${c.status}`
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [...headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "candidates.csv";
    link.click();
  };

  // Import CSV
  const importCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split("\n").slice(1);
      const newCandidates = lines.map((line) => {
        const [name, age, party, qualification, contact, status] =
          line.split(",");
        return {
          id: Date.now() + Math.random(),
          name,
          age,
          party,
          qualification,
          contact,
          manifesto: "",
          image: null,
          partyLogo: null,
          status: status || "Pending",
        };
      });
      setCandidates([...candidates, ...newCandidates]);
    };
    reader.readAsText(file);
  };

  // Filter + sort candidates
  const filteredCandidates = candidates
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.party.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "party") return a.party.localeCompare(b.party);
      if (sort === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <div className="candidate-management-container">
      <h2>Candidate Management</h2>

      {/* Candidate Form */}
      <form className="candidate-form" onSubmit={addCandidate}>
        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          value={formData.name}
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
        <input
          type="text"
          name="party"
          placeholder="Party Name"
          value={formData.party}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info (Phone/Email)"
          value={formData.contact}
          onChange={handleChange}
        />
        <textarea
          name="manifesto"
          placeholder="Candidate Manifesto"
          value={formData.manifesto}
          onChange={handleChange}
        />

        {/* File Uploads with labels */}
        <div className="file-upload">
          <label htmlFor="candidateImage">Upload Candidate Photo:</label>
          <input
            id="candidateImage"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "candidate")}
            ref={fileInputRef}
          />
        </div>

        <div className="file-upload">
          <label htmlFor="partyLogo">Upload Party Logo:</label>
          <input
            id="partyLogo"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "party")}
            ref={logoInputRef}
          />
        </div>

        <button type="submit">Add Candidate</button>
      </form>

      {/* Search + Sort + Export/Import */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name or party..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="party">Sort by Party</option>
          <option value="status">Sort by Status</option>
        </select>
        <button onClick={exportCSV}>Export CSV</button>
        <input type="file" accept=".csv" onChange={importCSV} />
      </div>

      {/* Candidate List */}
      <div className="candidate-list">
        <h3>Registered Candidates</h3>
        {filteredCandidates.length === 0 ? (
          <p>No candidates found</p>
        ) : (
          <div className="candidate-grid">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="candidate-card">
                {candidate.image && (
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="candidate-avatar"
                  />
                )}
                {candidate.partyLogo && (
                  <img
                    src={candidate.partyLogo}
                    alt="Party Logo"
                    className="party-logo"
                  />
                )}
                <h4>{candidate.name}</h4>
                <p>
                  <strong>Party:</strong> {candidate.party}
                </p>
                <p>
                  <strong>Age:</strong> {candidate.age}
                </p>
                <p>
                  <strong>Qualification:</strong> {candidate.qualification}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${candidate.status.toLowerCase()}`}>
                    {candidate.status}
                  </span>
                </p>
                <div className="card-actions">
                  <button onClick={() => updateStatus(candidate.id, "Approved")}>
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(candidate.id, "Rejected")}
                    className="delete-btn"
                  >
                    Reject
                  </button>
                  <button onClick={() => deleteCandidate(candidate.id)}>
                    Delete
                  </button>
                </div>
                {candidate.manifesto && (
                  <button
                    className="view-manifesto-btn"
                    onClick={() => alert(candidate.manifesto)}
                  >
                    View Manifesto
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateManagement;

