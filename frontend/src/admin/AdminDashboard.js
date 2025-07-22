import React, { useState } from 'react';
import '../css/AdminDashboard.css';

import AdminHome from './AdminHome';
import CreateElection from './CreateElection';
import CandidateManagement from './CandidateManagement';
import VoterManagement from './VoterManagement';
import SmartContractControl from './SmartContractControl';
import LiveVotingMonitor from './LiveVotingMonitor';
import ElectionResults from './ElectionResults';
import BlockchainExplorer from './BlockchainExplorer';
import SystemSettings from './SystemSettings';
import AnalyticsReports from './AnalyticsReports';
import AuditLogs from './AuditLogs';
import HelpDesk from './HelpDesk';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TABS = [
  'Dashboard',
  'Create Election',
  'Candidates',
  'Voters',
  'Smart Contracts',
  'Live Monitor',
  'Results',
  'Blockchain Explorer',
  'Settings',
  'Reports',
  'Audit Logs',
  'Help Desk'
];

const AdminDashboard = () => {
  const [active, setActive] = useState('Dashboard');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/adminlogin');
  };

  const renderTab = () => {
    switch (active) {
      case 'Dashboard': return <AdminHome />;
      case 'Create Election': return <CreateElection />;
      case 'Candidates': return <CandidateManagement />;
      case 'Voters': return <VoterManagement />;
      case 'Smart Contracts': return <SmartContractControl />;
      case 'Live Monitor': return <LiveVotingMonitor />;
      case 'Results': return <ElectionResults />;
      case 'Blockchain Explorer': return <BlockchainExplorer />;
      case 'Settings': return <SystemSettings />;
      case 'Reports': return <AnalyticsReports />;
      case 'Audit Logs': return <AuditLogs />;
      case 'Help Desk': return <HelpDesk />;
      default: return <AdminHome />;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>Blockchain Voting Admin</h1>
          <p>Secure, transparent, and decentralized voting management</p>
        </div>
        <div className="admin-header-right">
          <button className="health-btn">🟢 Network Healthy</button>
          <button className="new-election-btn">+ New Election</button>
          <button
            className="logout-button"
            style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 12px' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <nav className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={active === tab ? 'active' : ''}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="admin-content">
        {renderTab()}
      </section>
    </div>
  );
};

export default AdminDashboard;