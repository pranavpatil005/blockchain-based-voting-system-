// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "../css/CandidateManagement.css";

// const CandidateManagement = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [elections, setElections] = useState([]);
//   const [formData, setFormData] = useState({
//     election_id: "",
//     name: "",
//     party: "",
//     qualification: "",
//     contact: "",
//     email: "",
//     dob: "",
//     image: null,      // Base64 for preview
//     partyLogo: null,  // Base64 for preview
//     status: "Pending",
//   });

//   const fileInputRef = useRef(null);
//   const logoInputRef = useRef(null);

//   // Fetch all candidates
//   const fetchCandidates = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/candidates");
//       setCandidates(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch all elections and filter future ones
//   const fetchElections = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/elections");
//       const today = new Date();
//       const futureElections = res.data.elections.filter((e) => {
//         const from = new Date(e.from_date);
//         const to = new Date(e.to_date);
//         return today >= from && today <= to || from > today;
//       });
//       setElections(futureElections);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCandidates();
//     fetchElections();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Convert uploaded image to Base64 for preview
//   const handleImageUpload = (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (type === "candidate") setFormData({ ...formData, image: reader.result });
//       else setFormData({ ...formData, partyLogo: reader.result });
//     };
//     reader.readAsDataURL(file);
//   };

//   const addCandidate = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.party || !formData.election_id)
//       return alert("Name, Party & Election required");

//     try {
//       console.log("Sending candidate:", formData);
//       await axios.post("http://localhost:5000/api/candidates", {
//         election_id: formData.election_id,
//         name: formData.name,
//         party: formData.party,
//         dob: formData.dob,
//         qualification: formData.qualification,
//         mobile: formData.contact,
//         email: formData.email,
//         photo: formData.image,
//         party_logo: formData.partyLogo,
//       });


//       fetchCandidates(); // refresh list
//       setFormData({
//         election_id: "",
//         name: "",
//         party: "",
//         qualification: "",
//         contact: "",
//         email: "",
//         dob: "",
//         image: null,
//         partyLogo: null,
//         status: "Pending",
//       });

//       if (fileInputRef.current) fileInputRef.current.value = "";
//       if (logoInputRef.current) logoInputRef.current.value = "";
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add candidate");
//     }
//   };

//   return (
//     <div className="candidate-management-container">
//        <h2>Add New Candidate</h2>
//       {/* Candidate Form */}
//       <form className="candidate-form" onSubmit={addCandidate}>
//         {/* Election Select Menu */}
//         <select
//           name="election_id"
//           value={formData.election_id}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Election</option>
//           {elections.map((e) => (
//             <option key={e.id} value={e.id}>
//               {e.name} ({new Date(e.from_date).toLocaleDateString()} - {new Date(e.to_date).toLocaleDateString()})
//             </option>
//           ))}
//         </select>

//         <input type="text" name="name" placeholder="Candidate Name" value={formData.name} onChange={handleChange} required />
//         <input type="text" name="party" placeholder="Party Name" value={formData.party} onChange={handleChange} required />
//         <input type="text" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />
//         <input type="text" name="contact" placeholder="Mobile" value={formData.contact} onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//         <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

//         <div className="file-upload">
//           <label>Upload Candidate Photo:</label>
//           <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "candidate")} ref={fileInputRef} />
//         </div>

//         <div className="file-upload">
//           <label>Upload Party Logo:</label>
//           <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "party")} ref={logoInputRef} />
//         </div>

//         <button type="submit">Add Candidate</button>
//       </form>

//       {/* Candidate List */}
//       {/* Candidate List */}
//       <div style={{ padding: '20px' }}>
//         <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Registered Candidates</h3>
//         {candidates.length === 0 ? (
//           <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No candidates found</p>
//         ) : (
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//               gap: '20px',
//               justifyItems: 'center',
//             }}
//           >
//             {candidates.map((c) => (
//               <div
//                 key={c.id}
//                 style={{
//                   border: '1px solid #ccc',
//                   borderRadius: '10px',
//                   padding: '15px',
//                   width: '250px',
//                   textAlign: 'center',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                 }}
//               >
//                 {/* Candidate Photo */}
//                 {c.photo && (
//                   <img
//                     src={c.photo}
//                     alt={c.name}
//                     style={{
//                       width: '100px',
//                       height: '100px',
//                       borderRadius: '50%',
//                       objectFit: 'cover',
//                       marginBottom: '10px',
//                     }}
//                   />
//                 )}

//                 {/* Party Logo */}
//                 {c.party_logo && (
//                   <img
//                     src={c.party_logo}
//                     alt="Party Logo"
//                     style={{
//                       width: '50px',
//                       height: '50px',
//                       objectFit: 'contain',
//                       marginBottom: '10px',
//                     }}
//                   />
//                 )}

//                 <h4 style={{ margin: '5px 0' }}>{c.name}</h4>
//                 <p style={{ margin: '3px 0' }}><strong>Party:</strong> {c.party}</p>
//                 <p style={{ margin: '3px 0' }}><strong>DOB:</strong> {new Date(c.dob).toLocaleDateString()}</p>
//                 <p style={{ margin: '3px 0' }}><strong>Qualification:</strong> {c.qualification}</p>
//                 <p style={{ margin: '3px 0' }}><strong>Election:</strong> {c.election_name || 'N/A'}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default CandidateManagement;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/CandidateManagement.css";

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [formData, setFormData] = useState({
    election_id: "",
    name: "",
    party: "", 
    qualification: "",
    contact: "",
    email: "",
    dob: "",
    image: null,      // Base64 for preview
    partyLogo: null,  // Base64 for preview
    status: "Pending",
  });

  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  // Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all elections and filter future ones
  const fetchElections = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/elections");
      const today = new Date();
      const futureElections = res.data.elections.filter((e) => {
        const from = new Date(e.from_date);
        const to = new Date(e.to_date);
        return today >= from && today <= to || from > today;
      });
      setElections(futureElections);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchElections();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert uploaded image to Base64 for preview
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "candidate") setFormData({ ...formData, image: reader.result });
      else setFormData({ ...formData, partyLogo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addCandidate = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.party || !formData.election_id)
      return alert("Name, Party & Election required");

    try {
      console.log("Sending candidate:", formData);
      await axios.post("http://localhost:5000/api/candidates", {
        election_id: formData.election_id,
        name: formData.name,
        party: formData.party,
        dob: formData.dob,
        qualification: formData.qualification,
        mobile: formData.contact,
        email: formData.email,
        photo: formData.image,
        party_logo: formData.partyLogo,
      });

      fetchCandidates(); // refresh list
      setFormData({
        election_id: "",
        name: "",
        party: "",
        qualification: "",
        contact: "",
        email: "",
        dob: "",
        image: null,
        partyLogo: null,
        status: "Pending",
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
      if (logoInputRef.current) logoInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Failed to add candidate");
    }
  };

  return (
    <div className="candidate-management-container">
      <h2>Add New Candidate</h2>

      {/* Candidate Form */}
      <form className="candidate-form" onSubmit={addCandidate}>
        {/* Election Select Menu */}
        <select
          name="election_id"
          value={formData.election_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Election</option>
          {elections.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} ({new Date(e.from_date).toLocaleDateString()} - {new Date(e.to_date).toLocaleDateString()})
            </option>
          ))}
        </select>

        <input type="text" name="name" placeholder="Candidate Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="party" placeholder="Party Name" value={formData.party} onChange={handleChange} required />
        <input type="text" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />
        <input type="text" name="contact" placeholder="Mobile" value={formData.contact} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

        {/* Candidate DOB with Label */}
        <div className="dob-field">
          <label htmlFor="dob">Candidate DOB:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
        </div>

        <div className="file-upload">
          <label>Upload Candidate Photo:</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "candidate")} ref={fileInputRef} />
        </div>

        <div className="file-upload">
          <label>Upload Party Logo:</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "party")} ref={logoInputRef} />
        </div>

        <button type="submit">Add Candidate</button>
      </form>

      {/* Candidate List */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Registered Candidates</h3>
        {candidates.length === 0 ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No candidates found</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              justifyItems: 'center',
            }}
          >
            {candidates.map((c) => (
              <div
                key={c.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '15px',
                  width: '250px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                {/* Candidate Photo */}
                {c.photo && (
                  <img
                    src={c.photo}
                    alt={c.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginBottom: '10px',
                    }}
                  />
                )}

                {/* Party Logo */}
                {c.party_logo && (
                  <img
                    src={c.party_logo}
                    alt="Party Logo"
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                      marginBottom: '10px',
                    }}
                  />
                )}

                <h4 style={{ margin: '5px 0' }}>{c.name}</h4>
                <p style={{ margin: '3px 0' }}><strong>Party:</strong> {c.party}</p>
                <p style={{ margin: '3px 0' }}><strong>DOB:</strong> {c.dob ? new Date(c.dob).toLocaleDateString() : "N/A"}</p>
                <p style={{ margin: '3px 0' }}><strong>Qualification:</strong> {c.qualification}</p>
                <p style={{ margin: '3px 0' }}><strong>Election:</strong> {c.election_name || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateManagement;
