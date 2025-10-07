import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/VoterManagement.css";

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    voterId: "",
    aadhaar: "",
    phone: "",
    age: "",
    photo: null,
  });

  const [search, setSearch] = useState("");
  const fileInputRef = useRef(null);

  // Fetch voters
  const fetchVoters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/voters");
      if (res.data.success) setVoters(res.data.voters || []);
    } catch (err) {
      console.error(err);
      setVoters([]);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, photo: reader.result });
    reader.readAsDataURL(file);
  };

  const addVoter = async (e) => {
    e.preventDefault();
    const { name, voterId, aadhaar, phone, age, photo } = formData;

    if (!name || !voterId || !aadhaar || !phone) return alert("Please fill all required fields!");

    try {
      await axios.post("http://localhost:5000/api/add-voter", {
        name,
        voterId,
        aadhaar,
        phone,
        age: age ? Number(age) : null,
        photo: photo || null,
      });

      setFormData({ name: "", voterId: "", aadhaar: "", phone: "", age: "", photo: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchVoters();
    } catch (err) {
      console.error(err);
      alert("Failed to add voter");
    }
  };

  const filteredVoters = (voters || []).filter(v =>
    (v.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (v.voterId || "").toLowerCase().includes(search.toLowerCase())
  );

  // Export CSV
  const exportCSV = () => {
    const headers = ["Name,Voter ID,Aadhaar,Phone,Age"];
    const rows = filteredVoters.map(v =>
      `${v.name || ""},${v.voterId || ""},${v.aadhaar || ""},${v.phone || ""},${v.age || ""}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "voters.csv";
    link.click();
  };

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
        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} ref={fileInputRef} />
        <button type="submit">Add Voter</button>
      </form>

      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name or voter ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={exportCSV}>Export CSV</button>
      </div>

      {/* Voter Table */}
      <div className="voter-list">
        <h3>Registered Voters</h3>
        {filteredVoters.length === 0 ? (
          <p>No voters found.</p>
        ) : (
          <table className="voter-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Voter ID</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Aadhaar</th>
              </tr>
            </thead>
            <tbody>
              {filteredVoters.map(v => (
                <tr key={v.id}>
                  <td>
                    {v.photo ? <img src={v.photo} alt={v.name} className="table-photo" /> : null}
                  </td>
                  <td>{v.name || "-"}</td>
                  <td>{v.voterId || "-"}</td>
                  <td>{v.age || "-"}</td>
                  <td>{v.phone || "-"}</td>
                  <td>{v.aadhaar || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VoterManagement;
