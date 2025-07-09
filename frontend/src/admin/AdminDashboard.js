// src/admin/AdminDashboard.js
import React, { useState } from 'react';
import '../css/AdminDashboard.css';

import DashboardTab from './DashboardTab';
import ElectionsTab from './ElectionsTab';
import VotersTab from './VotersTab';
import BlockchainTab from './BlockchainTab';
import SecurityTab from './SecurityTab';

const TABS = ['Dashboard', 'Elections', 'Voters', 'Blockchain', 'Security'];

const AdminDashboard = () => {
  const [active, setActive] = useState('Dashboard');

  const renderTab = () => {
    switch (active) {
      case 'Dashboard': return <DashboardTab />;
      case 'Elections': return <ElectionsTab />;
      case 'Voters': return <VotersTab />;
      case 'Blockchain': return <BlockchainTab />;
      case 'Security': return <SecurityTab />;
      default: return <DashboardTab />;
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
        </div>
      </div>

      <nav className="admin-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab-button ${active === tab ? 'active' : ''}`}
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
