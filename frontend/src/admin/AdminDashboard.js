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

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Blockchain Voting Admin</h1>
        <p>Secure, transparent, and decentralized voting management</p>
        <div className="admin-actions">
          <button className="health-btn">Network healthy</button>
          <button className="new-election-btn">+ New Election</button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={active === tab ? 'active' : ''}
            onClick={() => setActive(tab)}>
            {tab}
          </button>
        ))}
      </nav>

      <section className="admin-content">
        {active === 'Dashboard' && <DashboardTab />}
        {active === 'Elections' && <ElectionsTab />}
        {active === 'Voters' && <VotersTab />}
        {active === 'Blockchain' && <BlockchainTab />}
        {active === 'Security' && <SecurityTab />}
      </section>
    </div>
  );
};

export default AdminDashboard;
