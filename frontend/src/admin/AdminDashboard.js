// src/admin/AdminDashboard.js
import React, { useState } from 'react';
import '../css/AdminDashboard.css';

import DashboardTab from './DashboardTab';
import ElectionsTab from './ElectionsTab';
import VotersTab from './VotersTab';
import BlockchainTab from './BlockchainTab';
import SecurityTab from './SecurityTab';

import { useAuth } from '../context/AuthContext'; // 👈 import auth context
import { useNavigate } from 'react-router-dom';    // 👈 import navigate

const TABS = ['Dashboard', 'Elections', 'Voters', 'Blockchain', 'Security'];

const AdminDashboard = () => {
  const [active, setActive] = useState('Dashboard');
  const { logout } = useAuth();         // 👈 get logout function
  const navigate = useNavigate();       // 👈 get navigate

  const handleLogout = () => {
    logout();                           // 👈 clear login state
    navigate('/adminlogin');            // 👈 redirect to admin login
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
            onClick={handleLogout}      // 👈 call logout on click
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
