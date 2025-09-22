// import React, { useState } from 'react';
// import '../css/AdminDashboard.css';

// import AdminHome from './AdminHome';
// import CreateElection from './CreateElection';
// import CandidateManagement from './CandidateManagement';
// import VoterManagement from './VoterManagement';
// import SmartContractControl from './SmartContractControl';
// import LiveVotingMonitor from './LiveVotingMonitor';
// import ElectionResults from './ElectionResults';
// import BlockchainExplorer from './BlockchainExplorer';
// import SystemSettings from './SystemSettings';
// import AnalyticsReports from './AnalyticsReports';
// import AuditLogs from './AuditLogs';
// import HelpDesk from './HelpDesk';

// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const TABS = [
//   'Dashboard',
//   'Create Election',
//   'Candidates',
//   'Voters',
//   'Smart Contracts',
//   'Live Monitor',
//   'Results',
//   'Blockchain Explorer',
//   'Settings',
//   'Reports',
//   'Audit Logs',
//   'Help Desk'
// ];

// const AdminDashboard = () => {
//   const [active, setActive] = useState('Dashboard');
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/adminlogin');
//   };

//   const renderTab = () => {
//     switch (active) {
//       case 'Dashboard': return <AdminHome />;
//       case 'Create Election': return <CreateElection />;
//       case 'Candidates': return <CandidateManagement />;
//       case 'Voters': return <VoterManagement />;
//       case 'Smart Contracts': return <SmartContractControl />;
//       case 'Live Monitor': return <LiveVotingMonitor />;
//       case 'Results': return <ElectionResults />;
//       case 'Blockchain Explorer': return <BlockchainExplorer />;
//       case 'Settings': return <SystemSettings />;
//       case 'Reports': return <AnalyticsReports />;
//       case 'Audit Logs': return <AuditLogs />;
//       case 'Help Desk': return <HelpDesk />;
//       default: return <AdminHome />;
//     }
//   };

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <div className="admin-header-left">
//           <h1>Blockchain Voting Admin</h1>
//           <p>Secure, transparent, and decentralized voting management</p>
//         </div>
//         <div className="admin-header-right">
//           <button className="health-btn">🟢 Network Healthy</button>
//           <button className="new-election-btn">+ New Election</button>
//           <button
//             className="logout-button"
//             style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 12px' }}
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <nav className="admin-tabs">
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             className={active === tab ? 'active' : ''}
//             onClick={() => setActive(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </nav>

//       <section className="admin-content">
//         {renderTab()}
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;
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

      {/* System / Blockchain Status */}
      <section className="dashboard-section status-section">
        <h2>System Status</h2>
        <div className="status-cards">
          <div className="status-card">
            <h3>Blockchain</h3>
            <p>Current Block: 15234</p>
            <p>Network: Healthy ✅</p>
          </div>
          <div className="status-card">
            <h3>Smart Contract</h3>
            <p>Status: Active</p>
            <p>Last Update: 2 mins ago</p>
          </div>
          <div className="status-card">
            <h3>Alerts</h3>
            <p>Failed Transactions: 0</p>
            <p>Invalid Votes: 0</p>
          </div>
        </div>
      </section>

      {/* Elections Overview */}
      <section className="dashboard-section elections-section">
        <h2>Elections Overview</h2>
        <div className="elections-cards">
          {elections.map((election) => (
            <div key={election.id} className="election-card">
              <h3>{election.name}</h3>
              <p>Status: {election.status}</p>
              <div className="election-buttons">
                <button>View Results</button>
                <button>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </section>

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

      {/* Notifications */}
      <section className="dashboard-section notifications-section">
        <h2>Notifications</h2>
        <ul className="notifications-list">
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;



