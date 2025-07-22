import React from 'react';
import '../css/AdminHome.css';

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h2>Welcome to the Admin Dashboard</h2>
      <p>This dashboard provides an overview of the voting system's status and quick insights into ongoing activities.</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>🗳️ Total Elections</h3>
          <p>5</p>
        </div>
        <div className="card">
          <h3>👤 Registered Voters</h3>
          <p>12,430</p>
        </div>
        <div className="card">
          <h3>🧑‍💼 Candidates</h3>
          <p>42</p>
        </div>
        <div className="card">
          <h3>📊 Active Votes</h3>
          <p>3,228</p>
        </div>
      </div>

      <div className="system-status">
        <h3>🔐 System Status</h3>
        <ul>
          <li>✅ Blockchain Network: Healthy</li>
          <li>✅ Smart Contracts: Verified</li>
          <li>✅ Voter Database: Synced</li>
          <li>✅ System Uptime: 99.98%</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;