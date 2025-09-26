
import React from "react";
import "../css/AdminDashboard.css";

// Dummy data for demonstration
const elections = [
  { id: 1, name: "Presidential 2025", status: "Running" },
  { id: 2, name: "Local Election", status: "Upcoming" },
  { id: 3, name: "Board Election", status: "Finished" },
];

const voters = {
  total: 1200,
  voted: 850,
  verified: 1100,
};

const notifications = [
  "New voter added: John Doe",
  "Election 'Presidential 2025' started",
  "Smart contract updated successfully",
  "Failed transaction detected",
  "Election 'Board Election' ending soon",
];

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      
      {/* Welcome Banner */}
      <section className="dashboard-welcome">
        <h1>Welcome to Admin Dashboard</h1>
        <p>Manage elections, voters, and monitor blockchain status in real-time.</p>
      </section>

     

      {/* Elections Overview
      <section className="dashboard-section elections-section">
        <h2>Elections Overview</h2>
        <div className="elections-cards">
          {elections.map((election) => (
            <div key={election.id} className="election-card">
              <h3>{election.name}</h3>
              <p>Status: {election.status}</p>
              <div className="election-buttons">
                <button>View Results</button>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Voter Overview */}
      <section className="dashboard-section voter-section">
        <h2>Voter Overview</h2>
        <div className="voter-stats">
          <div className="voter-card">
            <h3>Total Voters</h3>
            <p>{voters.total}</p>
          </div>
          <div className="voter-card">
            <h3>Voted</h3>
            <p>{voters.voted}</p>
          </div>
          <div className="voter-card">
            <h3>Verified</h3>
            <p>{voters.verified}</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section actions-section">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button>Create Election</button>
          <button>Add Candidate</button>
          <button>Add Voter</button>
          <button>Update Smart Contract</button>
          <button>Pause Election</button>
          <button>Resume Election</button>
          <button>Download Reports</button>
        </div>
      </section>

      
    </div>
  );
};

export default AdminDashboard;



