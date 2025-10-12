import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/LiveVotingMonitor.css";

const LiveVotingMonitor = () => {
  const [votingStatus, setVotingStatus] = useState("Ongoing");
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [electionName, setElectionName] = useState("");

  // Fetch live election data
  const fetchLiveData = async () => {
    try {
      // 1️⃣ Get active election and candidates (votes counted from votes table)
      const electionRes = await axios.get(
        "http://localhost:5000/api/active-election-candidates"
      );

      if (!electionRes.data.success) {
        setElectionName("No active election today");
        setCandidates([]);
        setTotalVotes(0);
        setVoterTurnout(0);
        setVotingStatus("No Elections Scheduled");
        return;
      }

      const candidatesData = electionRes.data.candidates;
      setCandidates(candidatesData);
      setElectionName(electionRes.data.electionName);

      // 2️⃣ Calculate total votes
      const votesSum = candidatesData.reduce((sum, c) => sum + c.votes, 0);
      setTotalVotes(votesSum);

      // 3️⃣ Fetch total registered voters dynamically
      const votersRes = await axios.get("http://localhost:5000/api/voters");
      const totalVoters = votersRes.data.success
        ? votersRes.data.voters.length
        : 0;

      const turnout = totalVoters
        ? Math.min(100, ((votesSum / totalVoters) * 100).toFixed(1))
        : 0;
      setVoterTurnout(turnout);

      // 4️⃣ Fetch election status (Ongoing / Upcoming / None)
      const statusRes = await axios.get("http://localhost:5000/api/election-status");
      if (statusRes.data.success) {
        setVotingStatus(statusRes.data.status);
      }
    } catch (err) {
      console.error("Error fetching live data:", err);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 2000); // refresh every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="monitor-container">
      <h2>Live Voting Monitor</h2>

      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span>
          <strong>Election: {electionName}</strong>
        </span>
        <span>
          <strong>Status:</strong>{" "}
          <span className={`status ${votingStatus.toLowerCase()}`}>
            {votingStatus}
          </span>
        </span>
      </p>

      <div className="stats">
        <div className="card pulse">
          <h3>Total Votes Cast</h3>
          <p>{totalVotes}</p>
        </div>
        <div className="card pulse">
          <h3>Voter Turnout</h3>
          <p>{voterTurnout}%</p>
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
            const widthPercent = totalVotes
              ? (candidate.votes / totalVotes) * 100
              : 0;
            const highlight = index === 0 ? "top-candidate" : "";
            return (
              <div key={candidate.id} className={`candidate-bar ${highlight}`}>
                <span>{candidate.name}</span>
                <div className="bar">
                  <div
                    className="fill"
                    style={{ width: `${widthPercent}%` }}
                  >
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
