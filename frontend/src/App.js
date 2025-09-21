// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VoterLogin from './authentication/VoterLogin';
import AdminLogin from './authentication/AdminLogin';
import AdminSignup from './authentication/AdminSignup';
import PrivateRoute from './components/PrivateRoute';
import UserPrivateRoute from './components/UserPrivateRoute';
import HomePage from './HomePage';
import Votepage from './voter/Votepage';
import ViewCandidates from './voter/ViewCandidates';
import VoterDashboard from './voter/VoterDashboard';
import About from './About';


// Admin Pages
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminHome from './admin/AdminHome';
import AnalyticsReports from './admin/AnalyticsReports';
import AuditLogs from './admin/AuditLogs';
import BlockchainExplorer from './admin/BlockchainExplorer';
import CandidateManagement from './admin/CandidateManagement';
import CreateElection from './admin/CreateElection';
import ElectionResults from './admin/ElectionResults';
import HelpDesk from './admin/HelpDesk';
import LiveVotingMonitor from './admin/LiveVotingMonitor';
import SmartContractControl from './admin/SmartContractControl';
import SystemSettings from './admin/SystemSettings';
import VoterManagement from './admin/VoterManagement';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/voterlogin" element={<VoterLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/about" element={<About />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="analytics" element={<AnalyticsReports />} />
            <Route path="auditlogs" element={<AuditLogs />} />
            <Route path="blockchain" element={<BlockchainExplorer />} />
            <Route path="candidates" element={<CandidateManagement />} />
            <Route path="createelection" element={<CreateElection />} />
            <Route path="results" element={<ElectionResults />} />
            <Route path="helpdesk" element={<HelpDesk />} />
            <Route path="monitor" element={<LiveVotingMonitor />} />
            <Route path="smartcontract" element={<SmartContractControl />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="management" element={<VoterManagement />} />
          </Route>
        </Route>

        {/* Voter Routes */}
        <Route element={<UserPrivateRoute />}>
          <Route path="/voter" element={<VoterDashboard />} />
          <Route path="/castvote" element={<Votepage />} />
          <Route path="/candidates" element={<ViewCandidates />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
