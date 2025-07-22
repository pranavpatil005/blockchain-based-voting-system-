import React from 'react';
import '../css/AnalyticsReports.css';

const AnalyticsReports = () => {
  // Example dummy data
  const data = {
    totalVoters: 1200,
    votesCast: 980,
    turnoutPercentage: ((980 / 1200) * 100).toFixed(2),
    activeElections: 2,
    candidatesParticipated: 24
  };

  return (
    <div className="analytics-container">
      <h2>Analytics & Reports</h2>

      <div className="analytics-cards">
        <div className="card">
          <h3>Total Registered Voters</h3>
          <p>{data.totalVoters}</p>
        </div>
        <div className="card">
          <h3>Total Votes Cast</h3>
          <p>{data.votesCast}</p>
        </div>
        <div className="card">
          <h3>Voter Turnout</h3>
          <p>{data.turnoutPercentage}%</p>
        </div>
        <div className="card">
          <h3>Active Elections</h3>
          <p>{data.activeElections}</p>
        </div>
        <div className="card">
          <h3>Candidates Participated</h3>
          <p>{data.candidatesParticipated}</p>
        </div>
      </div>

      <div className="report-section">
        <h3>System Report Summary</h3>
        <p>
          The voting system has maintained 100% uptime with secure, tamper-proof
          records stored on the blockchain. Voter turnout this round has been
          impressive, reflecting trust in digital electoral processes.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsReports;