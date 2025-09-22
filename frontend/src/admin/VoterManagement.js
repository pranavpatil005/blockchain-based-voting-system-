// import React, { useState } from 'react';
// import '../css/VoterManagement.css';

// const VoterManagement = () => {
//   const [voters, setVoters] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     voterId: '',
//     aadhaar: '',
//     phone: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddVoter = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.voterId || !formData.aadhaar || !formData.phone) return;

//     setVoters([...voters, formData]);
//     setFormData({ name: '', voterId: '', aadhaar: '', phone: '' });
//   };

//   return (
//     <div className="voter-management-container">
//       <h2>Manage Voters</h2>

//       <form className="voter-form" onSubmit={handleAddVoter}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Voter Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="voterId"
//           placeholder="Voter ID"
//           value={formData.voterId}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="aadhaar"
//           placeholder="Aadhaar Number"
//           value={formData.aadhaar}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//         <button type="submit">Add Voter</button>
//       </form>

//       <div className="voter-list">
//         <h3>Registered Voters</h3>
//         <ul>
//           {voters.map((voter, index) => (
//             <li key={index}>
//               <strong>{voter.name}</strong> (ID: {voter.voterId}, Aadhaar: {voter.aadhaar}, Phone: {voter.phone})
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default VoterManagement;
import React, { useState, useRef } from "react";
import "../css/VoterManagement.css";

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    voterId: "",
    aadhaar: "",
    phone: "",
    age: "",
    status: "Pending",
    photo: null,
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [modalVoter, setModalVoter] = useState(null);
  const fileInputRef = useRef(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: imageUrl });
    }
  };

  // Add voter
  const addVoter = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.voterId || !formData.aadhaar || !formData.phone) {
      alert("Please fill all required fields!");
      return;
    }
    if (voters.some((v) => v.voterId === formData.voterId)) {
      alert("Voter ID must be unique.");
      return;
    }
    setVoters([...voters, { id: Date.now(), ...formData }]);
    setFormData({ name: "", voterId: "", aadhaar: "", phone: "", age: "", status: "Pending", photo: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Update status
  const updateStatus = (id, status) => {
    setVoters(voters.map((v) => (v.id === id ? { ...v, status } : v)));
  };

  // Delete voter
  const deleteVoter = (id) => {
    setVoters(voters.filter((v) => v.id !== id));
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["Name,Voter ID,Aadhaar,Phone,Age,Status"];
    const rows = voters.map((v) => `${v.name},${v.voterId},${v.aadhaar},${v.phone},${v.age},${v.status}`);
    const csvContent = "data:text/csv;charset=utf-8," + [...headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "voters.csv";
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
      const imported = lines.map((line) => {
        const [name, voterId, aadhaar, phone, age, status] = line.split(",");
        return { id: Date.now() + Math.random(), name, voterId, aadhaar, phone, age, status: status || "Pending", photo: null };
      });
      setVoters([...voters, ...imported]);
    };
    reader.readAsText(file);
  };

  // Filter + Sort
  const filteredVoters = voters
    .filter(
      (v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.voterId.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <div className="voter-management-container">
      <h2>Voter Management</h2>

      {/* Voter Form */}
      <form className="voter-form" onSubmit={addVoter}>
        <input type="text" name="name" placeholder="Voter Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="voterId" placeholder="Voter ID" value={formData.voterId} onChange={handleChange} required />
        <input type="text" name="aadhaar" placeholder="Aadhaar Number" value={formData.aadhaar} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />

        <label htmlFor="voter-photo" className="photo-label">Voter Photo:</label>
        <input type="file" id="voter-photo" accept="image/*" onChange={handlePhotoUpload} ref={fileInputRef} />

        <button type="submit">Add Voter</button>
      </form>

      {/* Search + Sort + CSV */}
      <div className="search-sort-container">
        <input type="text" placeholder="Search by name or voter ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
        <button onClick={exportCSV}>Export CSV</button>
        <input type="file" accept=".csv" onChange={importCSV} />
      </div>

      {/* Voter Grid */}
      <div className="voter-list">
        <h3>Registered Voters</h3>
        {filteredVoters.length === 0 ? (
          <p>No voters found</p>
        ) : (
          <div className="voter-grid">
            {filteredVoters.map((voter) => (
              <div key={voter.id} className="voter-card">
                {voter.photo && <img src={voter.photo} alt={voter.name} className="voter-avatar" />}
                <h4>{voter.name}</h4>
                <p><strong>Voter ID:</strong> {voter.voterId}</p>
                <p><strong>Status:</strong> <span className={`status ${voter.status.toLowerCase()}`}>{voter.status}</span></p>
                <div className="voter-actions">
                  <button onClick={() => updateStatus(voter.id, "Verified")}>Verify</button>
                  <button onClick={() => updateStatus(voter.id, "Rejected")} className="delete-btn">Reject</button>
                  <button onClick={() => setModalVoter(voter)}>View Details</button>
                  <button onClick={() => deleteVoter(voter.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalVoter && (
        <div className="modal-overlay" onClick={() => setModalVoter(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalVoter.name}</h3>
            {modalVoter.photo && <img src={modalVoter.photo} alt={modalVoter.name} className="modal-avatar" />}
            <p><strong>Voter ID:</strong> {modalVoter.voterId}</p>
            <p><strong>Aadhaar:</strong> {modalVoter.aadhaar}</p>
            <p><strong>Phone:</strong> {modalVoter.phone}</p>
            <p><strong>Age:</strong> {modalVoter.age}</p>
            <p><strong>Status:</strong> {modalVoter.status}</p>
            <button onClick={() => setModalVoter(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterManagement;


