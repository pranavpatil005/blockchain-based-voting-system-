import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VoterLogin from './authentication/VoterLogin';
import AdminLogin from './authentication/AdminLogin';
import HomePage from './HomePage';
import Votepage from './Votepage';
import ViewCandidates from './ViewCandidates';
import AdminDashboard from './admin/AdminDashboard';
import DashboardTab from './admin/DashboardTab';
import ElectionsTab from './admin/ElectionsTab';
import VotersTab from './admin/VotersTab';
import BlockchainTab from './admin/BlockchainTab';
import SecurityTab from './admin/SecurityTab';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/userlogin" element={<VoterLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/vote" element={<Votepage />} />
        <Route path="/candidates" element={<ViewCandidates />} />
        <Route path="/admin" element={<AdminDashboard />}>
        <Route path="/dashboard" element={<DashboardTab />} />
        <Route path="/elections" element={<ElectionsTab />} />
        <Route path="/voters" element={<VotersTab />} />
        <Route path="/blockchain" element={<BlockchainTab />} />
        <Route path="/security" element={<SecurityTab />} />
        </Route>
        
        {/* Add more routes here  */}
      </Routes>
    </Router>
  );
}

export default App;