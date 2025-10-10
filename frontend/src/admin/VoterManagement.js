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
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [selectedVoter, setSelectedVoter] = useState(null); // for popup modal
  const fileInputRef = useRef(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVoters();
  }, []);

  // Fetch all voters
  const fetchVoters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/voters");
      if (res.data.success) setVoters(res.data.voters || []);
    } catch (err) {
      console.error(err);
      setVoters([]);
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Restrict age input to numbers only
    if (name === "age" && value && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "", duplicate: "" }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, photo: reader.result });
    reader.readAsDataURL(file);
  };

  // Validate input
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    const voterIdPattern = /^[A-Z]{3}\d{7}$/;
    if (!voterIdPattern.test(formData.voterId))
      newErrors.voterId = "Invalid Voter ID (e.g., ABC1234567).";

    if (!/^\d{12}$/.test(formData.aadhaar))
      newErrors.aadhaar = "Aadhaar must be exactly 12 digits.";

    const age = Number(formData.age);
    if (!age || age < 18 || age > 100)
      newErrors.age = "Age must be between 18 and 100.";

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be exactly 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add voter
  const addVoter = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { name, voterId, aadhaar, phone, age, photo } = formData;

    // Check for duplicates
    try {
      const checkRes = await axios.post("http://localhost:5000/api/check-duplicates", {
        aadhaar,
        voterId,
      });
      if (!checkRes.data.success) {
        setErrors((prev) => ({ ...prev, duplicate: checkRes.data.message }));
        return;
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({ ...prev, duplicate: "Error checking duplicates." }));
      return;
    }

    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    try {
      await axios.post("http://localhost:5000/api/add-voter", {
        name,
        voterId,
        aadhaar,
        phone: formattedPhone,
        age: Number(age),
        photo: photo || null,
      });

      setFormData({
        name: "",
        voterId: "",
        aadhaar: "",
        phone: "",
        age: "",
        photo: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchVoters();
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({ ...prev, submit: "Failed to add voter." }));
    }
  };

  // Filter voters by name, voterId, aadhaar
  const filteredVoters = (voters || []).filter(
    (v) =>
      (v.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.voterId || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.aadhaar || "").toLowerCase().includes(search.toLowerCase())
  );

  // Export CSV with base64 images
    const exportCSV = () => {
      const headers = ["Name", "Voter ID", "Aadhaar", "Phone", "Age"];
      const rows = filteredVoters.map((v) => [
        `"${v.name || ""}"`,
        `"${v.voterId || ""}"`,
        `"${v.aadhaar || ""}"`,
        `"${v.phone || ""}"`,
        `"${v.age || ""}"`,
       
      ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "voters_full_data.csv";
    link.click();
  };

  return (
    <div className="voter-management-container">
      <h2>Voter Management</h2>

      <form className="voter-form" onSubmit={addVoter}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Voter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="voterId"
            placeholder="Voter ID"
            value={formData.voterId}
            onChange={(e) =>
              setFormData({ ...formData, voterId: e.target.value.toUpperCase() })
            }
            maxLength={10}
            required
          />
          {errors.voterId && <p className="error-text">{errors.voterId}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="aadhaar"
            placeholder="Aadhaar Number"
            value={formData.aadhaar}
            onChange={handleChange}
            maxLength={12}
            required
          />
          {errors.aadhaar && <p className="error-text">{errors.aadhaar}</p>}
        </div>

        <div className="form-group">
          <div className="phone-input-group">
            <span className="phone-prefix">+91</span>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
          </div>
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
            max="100"
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>

        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} ref={fileInputRef} />

        {errors.duplicate && <p className="error-text">{errors.duplicate}</p>}
        {errors.submit && <p className="error-text">{errors.submit}</p>}

        <button type="submit" className="submit-btn">
          Add Voter
        </button>
      </form>

      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name, voter ID or Aadhaar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={exportCSV}>Export CSV</button>
      </div>

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
                <th >Phone</th>
                <th>Aadhaar</th>
              </tr>
            </thead>
            <tbody>
              {filteredVoters.map((v) => (
                <tr key={v.id}>
                  <td>
                    {v.photo ? (
                      <img
                        src={v.photo}
                        alt={v.name}
                        className="table-photo"
                        onClick={() => setSelectedVoter(v)}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{v.name || "-"}</td>
                  <td>{v.voterId || "-"}</td>
                  <td>{v.age || "-"}</td>
                  <td className="phone-cell">{v.phone || "-"}</td>
                  <td>{v.aadhaar || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Voter Details Popup */}
      {selectedVoter && (
        <div className="modal-overlay" onClick={() => setSelectedVoter(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button className="modal-close" onClick={() => setSelectedVoter(null)}>
              ×
            </button>
            <img src={selectedVoter.photo} alt={selectedVoter.name} className="modal-photo" />
            <h3>{selectedVoter.name}</h3>
            <p><strong>Voter ID:</strong> {selectedVoter.voterId}</p>
            <p><strong>Aadhaar:</strong> {selectedVoter.aadhaar}</p>
            <p><strong>Phone:</strong> {selectedVoter.phone}</p>
            <p><strong>Age:</strong> {selectedVoter.age}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoterManagement;
