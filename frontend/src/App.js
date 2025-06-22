import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VoterLogin from './authentication/VoterLogin';
import AdminLogin from './authentication/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './HomePage';
import Votepage from './Votepage';
import ViewCandidates from './ViewCandidates';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userlogin" element={<VoterLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/vote" element={<Votepage />} />
        <Route path="/candidates" element={<ViewCandidates />} />
        
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
