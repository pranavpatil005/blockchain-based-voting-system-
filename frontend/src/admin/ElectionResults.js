import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "../css/ElectionResults.css";

const ElectionResults = () => {
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winnerDeclared, setWinnerDeclared] = useState(false);
  const [animatedVotes, setAnimatedVotes] = useState({});

  useEffect(() => {
    // Simulated fetch
    setTimeout(() => {
      const data = [
        { name: "NIKITA", votes: 320, photo: "https://www.allthatgrows.in/cdn/shop/files/YellowLotusBulbs.jpg?v=1750249392&width=1080" },
        { name: "LIJI", votes: 250, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSblKka3JFLeZdXwLE3MXGMAjfLBC1UyWx6lQ&s" },
        { name: "VIVEK", votes: 180, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEEdZAnwKLE0ajJCzZpiM1fw4tSAC4ErQ24Q&s" },
        { name: "PRANV", votes: 90, photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8yHE6hhbU1_OnzPbnIf87X9_fvSz5oiFVA&s" },
        { name: "DURVANKUR", votes: 90, photo: "https://i.pravatar.cc/100?img=4" }

      ];
      const votesSum = data.reduce((sum, c) => sum + c.votes, 0);
      setResults(data);
      setTotalVotes(votesSum);

      // Animate vote counts
      data.forEach((c) => animateVote(c.name, c.votes));

      // Trigger confetti for winner
      const topCandidate = data.reduce((prev, curr) => (curr.votes > prev.votes ? curr : prev), data[0]);
      setTimeout(() => launchConfetti(topCandidate), 1000);
    }, 1000);
  }, []);

  // Animate vote numbers
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
      <h2>Election Results</h2>
      <p className="note">Live vote count with real-time visualization</p>

      {results.length > 0 ? (
        <div className="results-grid">
          {results
            .sort((a, b) => b.votes - a.votes)
            .map((candidate, index) => (
              <div
                key={index}
                className={`candidate-card rank-${index + 1} ${winnerDeclared && index === 0 ? "winner-card" : ""}`}
              >
                <div className="candidate-header">
                  <img src={candidate.photo} alt={candidate.name} className="candidate-photo" />
                  <h3>{candidate.name}</h3>
                </div>
                <p className="votes-count">{animatedVotes[candidate.name] || 0} votes</p>
                <div className="vote-bar">
                  <div
                    className="fill"
                    style={{ width: `${calculatePercent(candidate.votes)}%` }}
                  >
                    {calculatePercent(candidate.votes)}%
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="loading">Loading results...</p>
      )}
    </div>
  );
};

export default ElectionResults;
