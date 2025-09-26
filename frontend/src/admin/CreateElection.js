import React, { useState, useEffect } from "react";
import "../css/CreateElection.css";

const CreateElection = () => {
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [elections, setElections] = useState([]);

  // Fetch existing elections
  const fetchElections = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/elections");
      const data = await res.json();
      if (data.success) setElections(data.elections);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!electionName || !startDate || !endDate || !description) {
      setMessage("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/create-election", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: electionName,
          from_date: startDate,
          to_date: endDate,
          description,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message);
        setElectionName("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        fetchElections(); // refresh list
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
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
        <label>Start Date & Time</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date & Time</label>
        <input
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
        <button type="submit" className="create-btn">
          Create Election
        </button>
        {message && <p className="message">{message}</p>}
      </form>

      {/* Display Elections */}
      <div
  className="election-preview"
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "30px",
    padding: "20px",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <h3 style={{ color: "#2c3e50", marginBottom: "10px", fontSize: "24px" }}>Election Preview</h3>

  {elections.length === 0 ? (
    <p style={{ fontStyle: "italic", color: "#777", textAlign: "center" }}>
      No elections created yet.
    </p>
  ) : (
    <div style={{ display: "grid", gap: "16px" }}>
      {elections.map((e) => {
        const now = new Date();
        const from = new Date(e.from_date);
        const to = new Date(e.to_date);

        let statusColor = "#3498db";
        let statusText = "Upcoming";
        if (now >= from && now <= to) {
          statusColor = "#27ae60";
          statusText = "Ongoing";
        } else if (now > to) {
          statusColor = "#e74c3c";
          statusText = "Ended";
        }

        return (
          <div
            key={e.id}
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "600", color: "#34495e" }}>{e.name}</div>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  backgroundColor: statusColor,
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {statusText}
              </span>
            </div>

            <div style={{ fontSize: "14px", color: "#555", margin: "6px 0" }}>
              {from.toLocaleString()} - {to.toLocaleString()}
            </div>

            <div style={{ fontSize: "14px", color: "#666" }}>{e.description}</div>
          </div>
        );
      })}
    </div>
  )}
</div>

    </div>
  );
};

export default CreateElection;
