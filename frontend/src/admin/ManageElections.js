import React, { useEffect, useState } from "react";
import "../css/ManageElections.css";
import { startElectionOnChain, finishElectionOnChain } from "../blockchain/votingContract";
import axios from "axios";

const ManageElections = () => {
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch elections
  const fetchElections = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/elections");
      if (res.data.success) setElections(res.data.elections);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch candidates
  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchElections();
    fetchCandidates();
  }, []);

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

  // Start election both on blockchain & backend
  const handleStartElection = async (id) => {
    try {
      setLoading(true);
      setMessage("Starting election...");

      // -----------------
      // Blockchain call
      // -----------------
      await startElectionOnChain(id);

      // -----------------
      // Backend call
      // -----------------
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      const res = await axios.put(`http://localhost:5000/api/start-election/${id}`, {
        from_date: now,
      });

      if (res.data.success) {
        setMessage("✅ Election started!");
        fetchElections();
      } else {
        setMessage("❌ Backend failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error starting election: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Finish election both on blockchain & backend
  const handleFinishElection = async (id) => {
    try {
      setLoading(true);
      setMessage("Finishing election...");

      // -----------------
      // Blockchain call
      // -----------------
      await finishElectionOnChain(id);

      // -----------------
      // Backend call
      // -----------------
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      const res = await axios.put(`http://localhost:5000/api/finish-election/${id}`, {
        to_date: now,
      });

      if (res.data.success) {
        setMessage("✅ Election finished on blockchain and backend!");
        fetchElections();
      } else {
        setMessage("❌ Backend failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error finishing election: " + err.message);
    } finally {
      setLoading(false);
    }
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
                <span className={`status ${status.toLowerCase()}`}>{status}</span>
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
                <button onClick={() => handleFinishElection(e.id)} disabled={loading}>
                  {loading ? "Processing..." : "Finish Election"}
                </button>
              )}
              {status === "Upcoming" && (
                <button onClick={() => handleStartElection(e.id)} disabled={loading}>
                  {loading ? "Processing..." : "Start Election"}
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ManageElections;
