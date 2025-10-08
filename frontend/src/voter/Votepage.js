import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "./Navbar";
const Votepage = () => {
  const [candidates, setCandidates] = useState([]);
  const [electionName, setElectionName] = useState("");
  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timer, setTimer] = useState(10); // ⏳ countdown timer
  const navigate = useNavigate();
  const { userLogout } = useUserAuth();

  const handleLogout = () => {
    userLogout();
    navigate("/");
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/elections")
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

        axios.get("http://localhost:5000/api/candidates")
          .then((res) => {
            const filteredCandidates = res.data.filter(c => c.election_id === activeElection.id);
            setCandidates(filteredCandidates);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }, []);

  // 🔥 Timer effect after voting
  useEffect(() => {
    if (hasVoted) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            handleLogout(); // auto logout at 0
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [hasVoted]);

  const confirmVote = () => {
    if (selected !== null) {
      const candidateId = candidates[selected].id;

      axios.post("http://localhost:5000/api/cast-vote", { candidate_id: candidateId })
        .then(res => {
          if (res.data.success) {
            alert(`✅ Your vote for ${candidates[selected].name} has been recorded on blockchain!`);
            setHasVoted(true);
          } else {
            alert("❌ Failed to cast vote");
          }
        })
        .catch(err => {
          console.error(err);
          alert("❌ Error occurred while casting vote");
        });
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
     <Navbar />

      {!hasVoted ? (
        <>
          <h1 style={{ textAlign: "center", fontWeight: "bold", marginTop: "100px" }}>{electionName}</h1>
          {candidates.length === 0 ? (
            <p style={{ textAlign: "center" }}>No candidates for this election</p>
          ) : (
            <>
              <h2 style={{ textAlign: "center", marginTop: "10px" }}>Cast Your Vote</h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "20px",
                width: "60%",
                margin: "20px auto"
              }}>
                {candidates.map((c, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelected(idx)}
                    style={{
                      border: selected === idx ? "3px solid #2980b9" : "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "15px",
                      textAlign: "center",
                      boxShadow: selected === idx ? "0 4px 15px rgba(41, 128, 185, 0.4)" : "0 2px 8px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transition: "0.3s",
                      backgroundColor: selected === idx ? "#d1f2eb" : "white"
                    }}
                  >
                    <div style={{
  border: selected === idx ? "3px solid #2980b9" : "1px solid #ccc",
  borderRadius: "10px",
  padding: "15px",
  textAlign: "center",
  boxShadow: selected === idx ? "0 4px 15px rgba(41, 128, 185, 0.4)" : "0 2px 8px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "0.3s",
  backgroundColor: selected === idx ? "#91dfceff" : "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}}>
  {/* Party Logo + Party Name */}
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "15px" }}>
    <img src={c.party_logo} alt={c.party} style={{ width: "50px", height: "50px", objectFit: "contain", marginBottom: "5px" }} />
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      backgroundColor: "#407fddff",
      color: "black",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold"
    }}>
      {c.party}
    </span>
  </div>

  {/* Candidate Image */}
  <img src={c.photo} alt={c.name} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px" }} />

  {/* Candidate Name */}
  <h3 style={{ margin: "5px 0", fontWeight: "bold" }}>{c.name}</h3>
</div>

                  </div>
                ))}
              </div>

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
      )  : (
        <div style={{ textAlign: "center", marginTop: "120px" }}>
          <h1 style={{
            fontSize: "36px", color: "#27ae60", lineHeight: "1.5"
          }}>
            🎉 Thank You for Voting! 🎉<br />
            Your vote has been recorded on blockchain for <br />
            <strong>{electionName}</strong>.
          </h1>
          <p style={{ fontSize: "20px", marginTop: "20px" }}>
            ⏳ You will be logged out automatically in <strong>{timer}</strong> seconds...
          </p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🚪 Logout Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Votepage;
