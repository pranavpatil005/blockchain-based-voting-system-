import React, { useEffect, useState } from "react";
import "../css/ManageElections.css";

const ManageElections = () => {
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch elections
  const fetchElections = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/elections");
      const data = await res.json();
      if (data.success) setElections(data.elections);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch candidates
  const fetchCandidates = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/candidates");
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchElections();
    fetchCandidates();
  }, []);

  const handleFinishElection = async (id) => {
    try {
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      const res = await fetch(`http://localhost:5000/api/finish-election/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_date: now }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Election closed successfully");
        fetchElections();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const handleStartElection = async (id) => {
    try {
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      const res = await fetch(`http://localhost:5000/api/start-election/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_date: now }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Election started successfully");
        fetchElections();
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const getCandidatesForElection = (electionId) => {
    return candidates.filter(c => c.election_id === electionId);
  };

  const getStatus = (from, to) => {
    const now = new Date();
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (now < fromDate) return "Upcoming";
    if (now >= fromDate && now <= toDate) return "Ongoing";
    return "Ended";
  };

  return (
    <div className="manage-elections-container">
      <h2>Manage Elections</h2>
      {message && <p className="message">{message}</p>}
      {elections.length === 0 ? (
        <p>No elections found.</p>
      ) : (
        elections.map((e) => {
          const status = getStatus(e.from_date, e.to_date);
          return (
            <div key={e.id} className="election-card">
              <div className="election-header">
                <h3>{e.name}</h3>
                <span className={`status ${status}`}>{status}</span>
              </div>
              <p>{e.description}</p>
              <p>
                {new Date(e.from_date).toLocaleString()} - {new Date(e.to_date).toLocaleString()}
              </p>

              <div className="candidates-section">
                <h4>Candidates</h4>
                {getCandidatesForElection(e.id).length === 0 ? (
                  <p>No candidates yet.</p>
                ) : (
                  <ul>
                    {getCandidatesForElection(e.id).map((c) => (
                      <li key={c.id}>
                        {c.name} ({c.party || "Independent"})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Buttons */}
              {status === "Ongoing" && (
                <button onClick={() => handleFinishElection(e.id)}>Finish Election</button>
              )}
              {status === "Upcoming" && (
                <button onClick={() => handleStartElection(e.id)}>Start Election</button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ManageElections;
