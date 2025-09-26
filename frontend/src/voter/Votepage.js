import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Votepage = () => {
  const [candidates, setCandidates] = useState([]);
  const [electionName, setElectionName] = useState("");
  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();
  const { userLogout } = useUserAuth();

  const handleLogout = () => {
    userLogout();
    navigate("/");
  };

  useEffect(() => {
    // 1️⃣ Get all elections
    axios
      .get("http://localhost:5000/api/elections")
      .then((res) => {
        const today = new Date();
        const activeElection = res.data.elections.find((e) => {
          const from = new Date(e.from_date);
          const to = new Date(e.to_date);
          return today >= from && today <= to;
        });

        if (!activeElection) {
          setElectionName("No Active Election Today");
          setCandidates([]);
          return;
        }

        setElectionName(activeElection.name);

        // 2️⃣ Fetch all candidates and filter only for active election
        axios
          .get("http://localhost:5000/api/candidates")
          .then((res) => {
            const filteredCandidates = res.data.filter(
              (c) => c.election_id === activeElection.id
            );
            setCandidates(filteredCandidates);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  const confirmVote = () => {
    if (selected !== null) {
      const candidateId = candidates[selected].id;

      axios
        .post("http://localhost:5000/api/cast-vote", { candidate_id: candidateId })
        .then((res) => {
          if (res.data.success) {
            alert(`✅ Your vote for ${candidates[selected].name} has been recorded on blockchain!`);
            setHasVoted(true);
          } else {
            alert("❌ Failed to cast vote");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("❌ Error occurred while casting vote");
        });
    }
  };

  return (
    <div style={{ paddingTop: "100px", fontFamily: "Arial, sans-serif" }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#2c3e50",
          padding: "12px 24px",
          color: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>📊 VOTECHAIN</div>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "24px",
            marginRight: "100px",
            padding: 0,
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <li onClick={() => navigate("/voter")}>Home</li>
          <li onClick={() => navigate("/candidates")}>Candidates</li>
          <li onClick={() => navigate("/castvote")}>Vote</li>
        </ul>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {!hasVoted ? (
        <>
          <h1 style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px" }}>{electionName}</h1>
          {candidates.length === 0 ? (
            <p style={{ textAlign: "center" }}>No candidates for this election</p>
          ) : (
            <>
              <h2 style={{ textAlign: "center", marginTop: "10px" }}>Cast Your Vote</h2>
              <table
                style={{
                  width: "80%",
                  margin: "20px auto",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, sans-serif",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#34495e", color: "white" }}>
                    <th style={{ padding: "12px" }}>Select</th>
                    <th style={{ padding: "12px" }}>Candidate Name</th>
                    <th style={{ padding: "12px" }}>Party</th>
                    <th style={{ padding: "12px" }}>Party Logo</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c, idx) => (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: selected === idx ? "#d1f2eb" : "white",
                        border: selected === idx ? "2px solid #2980b9" : "1px solid #ddd",
                        transition: "0.2s",
                      }}
                    >
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <label
                          style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: "2px solid #2980b9",
                            backgroundColor: selected === idx ? "#2980b9" : "white",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <input
                            type="radio"
                            name="candidate"
                            checked={selected === idx}
                            onChange={() => setSelected(idx)}
                            style={{
                              opacity: 0,
                              width: "100%",
                              height: "100%",
                              margin: 0,
                              cursor: "pointer",
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }}
                          />
                        </label>
                      </td>

                      <td style={{ padding: "10px", fontWeight: "bold" }}>{c.name}</td>
                      <td style={{ padding: "10px" }}>{c.party}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <img
                          src={c.party_logo}
                          alt={c.party}
                          style={{ width: "50px", height: "50px", objectFit: "contain" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ textAlign: "center", margin: "20px" }}>
                <button
                  onClick={confirmVote}
                  disabled={selected === null}
                  style={{
                    backgroundColor: selected !== null ? "#2980b9" : "gray",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "6px",
                    cursor: selected !== null ? "pointer" : "not-allowed",
                    fontSize: "16px",
                  }}
                >
                  🗳️ Cast Your Vote
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            marginTop: "100px",
            color: "#27ae60",
            lineHeight: "1.5",
          }}
        >
          🎉 Thank You for Voting! 🎉<br />
          Your vote has been recorded on blockchain for <br />
          <strong>{electionName}</strong>.
        </h1>
      )}
    </div>
  );
};

export default Votepage;
