// import React, { useEffect, useState } from 'react';
// import '../css/LiveVotingMonitor.css';

// const LiveVotingMonitor = () => {
//   const [votingStatus, setVotingStatus] = useState('Ongoing');
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [voterTurnout, setVoterTurnout] = useState(0);
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     // Simulated data fetching
//     setTimeout(() => {
//       setTotalVotes(532);
//       setVoterTurnout(63.5);
//       setCandidates([
//         { name: 'Alice', votes: 210 },
//         { name: 'Bob', votes: 182 },
//         { name: 'Charlie', votes: 140 }
//       ]);
//     }, 1000);
//   }, []);

//   return (
//     <div className="monitor-container">
//       <h2>Live Voting Monitor</h2>
//       <p><strong>Status:</strong> <span className={`status ${votingStatus.toLowerCase()}`}>{votingStatus}</span></p>
//       <div className="stats">
//         <div className="card">
//           <h3>Total Votes Cast</h3>
//           <p>{totalVotes}</p>
//         </div>
//         <div className="card">
//           <h3>Voter Turnout</h3>
//           <p>{voterTurnout}%</p>
//         </div>
//       </div>

//       <div className="candidate-chart">
//         <h3>Live Vote Count</h3>
//         {candidates.map((candidate, index) => (
//           <div key={index} className="candidate-bar">
//             <span>{candidate.name}</span>
//             <div className="bar">
//               <div className="fill" style={{ width: `${(candidate.votes / totalVotes) * 100}%` }}>
//                 {candidate.votes} votes
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LiveVotingMonitor;
import React, { useEffect, useState } from 'react';
import '../css/LiveVotingMonitor.css';

const LiveVotingMonitor = () => {
  const [votingStatus, setVotingStatus] = useState('Ongoing');
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Simulated live updates every 2 seconds
    const interval = setInterval(() => {
      const updatedCandidates = [
        { name: 'Alice', votes: Math.floor(Math.random() * 300) },
        { name: 'Bob', votes: Math.floor(Math.random() * 300) },
        { name: 'Charlie', votes: Math.floor(Math.random() * 300) }
      ];
      const votesSum = updatedCandidates.reduce((sum, c) => sum + c.votes, 0);

      setCandidates(updatedCandidates.sort((a, b) => b.votes - a.votes));
      setTotalVotes(votesSum);
      setVoterTurnout(Math.min(100, ((votesSum / 600) * 100).toFixed(1))); // Assuming 600 eligible voters
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="monitor-container">
      <h2>Live Voting Monitor</h2>
      <p>
        <strong>Status:</strong>{' '}
        <span className={`status ${votingStatus.toLowerCase()}`}>{votingStatus}</span>
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
      </div>

      <div className="candidate-chart">
        <h3>Live Vote Count</h3>
        {candidates.map((candidate, index) => {
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
        })}
      </div>
    </div>
  );
};

export default LiveVotingMonitor;
