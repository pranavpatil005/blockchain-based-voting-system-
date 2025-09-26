import React, { useEffect, useState } from 'react';
import axios from 'axios'; // ✅ important
import '../css/LiveVotingMonitor.css';

const LiveVotingMonitor = () => {
  const [votingStatus, setVotingStatus] = useState('Ongoing');
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [electionName, setElectionName] = useState(""); // ✅ missing before

  useEffect(() => {
    const fetchCandidates = () => {
      axios
        .get("http://localhost:5000/api/active-election-candidates")
        .then((res) => {
          if (res.data.success) {
            setCandidates(res.data.candidates);
            setElectionName(res.data.electionName);
            const votesSum = res.data.candidates.reduce((sum, c) => sum + c.votes, 0);
            setTotalVotes(votesSum);
            setVoterTurnout(Math.min(100, ((votesSum / 600) * 100).toFixed(1)));
          } else {
            setCandidates([]);
            setElectionName("No active election today");
          }
        })
        .catch((err) => console.error(err));
    };

    fetchCandidates();
    const interval = setInterval(fetchCandidates, 2000); // refresh every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="monitor-container">
      <h2>Live Voting Monitor</h2>

      <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>
          <strong>Election: {electionName}</strong>
        </span>
        <span>
          <strong>Status:</strong>{" "}
          <span className={`status ${votingStatus.toLowerCase()}`}>{votingStatus}</span>
        </span>
      </p>

      <div className="stats">
        <div className="card pulse">
          <h3>Total Votes Cast</h3>
          <p>{totalVotes}</p>
        </div>
        <div className="card pulse">
          <h3>Total Candidates</h3>
          <p>{candidates.length}</p>
        </div>
      </div>

      <div className="candidate-chart">
        <h3>Live Vote Count</h3>
        {candidates.length === 0 ? (
          <p style={{ textAlign: "center" }}>No candidates for this election</p>
        ) : (
          candidates.map((candidate, index) => {
            const widthPercent = totalVotes ? (candidate.votes / totalVotes) * 100 : 0;
            const highlight = index === 0 ? 'top-candidate' : '';
            return (
              <div key={index} className={`candidate-bar ${highlight}`}>
                <span>{candidate.name}</span>
                <div className="bar">
                  <div className="fill" style={{ width: `${widthPercent}%` }}>
                    {candidate.votes} votes
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LiveVotingMonitor;
