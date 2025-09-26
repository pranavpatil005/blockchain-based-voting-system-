import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import axios from "axios";
import "../css/ElectionResults.css";

const ElectionResults = () => {
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winnerDeclared, setWinnerDeclared] = useState(false);
  const [animatedVotes, setAnimatedVotes] = useState({});
  const [electionName, setElectionName] = useState("");

  useEffect(() => {
  const today = new Date();

  // 1️⃣ Get elections
  axios
    .get("http://localhost:5000/api/elections")
    .then((res) => {
      if (!res.data.success || res.data.elections.length === 0) return;

      // Filter past elections whose to_date is before today
      const pastElections = res.data.elections.filter(
        (e) => new Date(e.to_date) < today
      );

      if (pastElections.length === 0) return; // No past elections, don't show results

      // Sort by to_date descending and take the latest past election
      const latestElection = pastElections.sort(
        (a, b) => new Date(b.to_date) - new Date(a.to_date)
      )[0];

      setElectionName(latestElection.name);

      // 2️⃣ Get candidates for this latest past election
      axios
        .get("http://localhost:5000/api/candidates")
        .then((res) => {
          const filteredCandidates = res.data.filter(
            (c) => c.election_id === latestElection.id
          );
          setResults(filteredCandidates);

          const votesSum = filteredCandidates.reduce(
            (sum, c) => sum + Number(c.votes || 0),
            0
          );
          setTotalVotes(votesSum);

          // Animate votes
          filteredCandidates.forEach((c) =>
            animateVote(c.name, Number(c.votes || 0))
          );

          // Trigger confetti for winner
          if (filteredCandidates.length > 0) {
            const topCandidate = filteredCandidates.reduce((prev, curr) =>
              Number(curr.votes) > Number(prev.votes) ? curr : prev
            );
            setTimeout(() => launchConfetti(topCandidate), 1000);
          }
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}, []);


  const animateVote = (name, votes) => {
    let start = 0;
    const duration = 1500;
    const increment = votes / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= votes) {
        start = votes;
        clearInterval(counter);
      }
      setAnimatedVotes((prev) => ({ ...prev, [name]: Math.floor(start) }));
    }, 20);
  };

  const launchConfetti = (winner) => {
    setWinnerDeclared(true);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ["#ff0", "#f00", "#0ff", "#0f0", "#00f", "#ff69b4"];

    const frame = () => {
      confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < animationEnd) requestAnimationFrame(frame);
    };
    frame();
  };

  const calculatePercent = (votes) => ((votes / totalVotes) * 100).toFixed(1);

  return (
    <div className="results-container">
      <h2>{electionName ? `Results: ${electionName}` : "Election Results"}</h2>
      <p className="note">Live vote count with real-time visualization</p>

      {results.length > 0 ? (
       <div
  className="results-grid"
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", // centers horizontally
    alignItems: "center",     // centers vertically if container has height
    gap: "20px",
    minHeight: "70vh"         // ensures some vertical space to center within
  }}
>
  {results
    .sort((a, b) => Number(b.votes) - Number(a.votes))
    .map((candidate, index) => (
      <div
        key={index}
        className={`candidate-card rank-${index + 1} ${
          winnerDeclared && index === 0 ? "winner-card" : ""
        }`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="candidate-header">
          <img src={candidate.photo} alt={candidate.name} className="candidate-photo" />
          <h3>{candidate.name}</h3>
        </div>
        <p className="votes-count">{animatedVotes[candidate.name] || 0} votes</p>
        <div className="vote-bar" style={{ width: "100%" }}>
          <div
            className="fill"
            style={{ width: `${calculatePercent(Number(candidate.votes || 0))}%` }}
          >
            {calculatePercent(Number(candidate.votes || 0))}%
          </div>
        </div>
      </div>
    ))}
</div>

      ) : (
        <p className="loading">Loading Results...</p>
      )}
    </div>
  );
};

export default ElectionResults;
