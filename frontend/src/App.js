import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VoterLogin from './authentication/VoterLogin';
import AdminLogin from './authentication/AdminLogin';
import AdminSignup from './authentication/AdminSignup';
import PrivateRoute from './components/PrivateRoute';
import UserPrivateRoute from './components/UserPrivateRoute';
import HomePage from './HomePage';
import Votepage from './voter/Votepage';
import ViewCandidates from './voter/ViewCandidates';
import AdminDashboard from './admin/AdminDashboard';
import About from './About';
import VoterDashboard from './voter/VoterDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voterlogin" element={<VoterLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/about" element={<About />} />
        {/* Add routes for homepage here  */}

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* more admin routes here */}
        </Route>

        <Route element={<UserPrivateRoute />}>
          <Route path="/voter" element={<VoterDashboard />} />
          <Route path="/castvote" element={<Votepage />} />
          <Route path="/candidates" element={<ViewCandidates />} />

          {/* Add routes for voter pages here  */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
