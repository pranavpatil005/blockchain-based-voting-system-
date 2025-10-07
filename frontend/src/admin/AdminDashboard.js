import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/AdminDashboard.css";
import useSessionState from "../hooks/useSessionState"; 
import { useAuth } from "../context/AuthContext";

// Dummy data for demonstration
const defaultElections = [
  { id: 1, name: "Presidential 2025", status: "Running" },
  { id: 2, name: "Local Election", status: "Upcoming" },
  { id: 3, name: "Board Election", status: "Finished" },
];

const defaultVoters = {
  total: 1200,
  voted: 850,
  verified: 1100,
};

const defaultNotifications = [
  "New voter added: John Doe",
  "Election 'Presidential 2025' started",
  "Smart contract updated successfully",
  "Failed transaction detected",
  "Election 'Board Election' ending soon",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminLoggedIn, logout } = useAuth();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!adminLoggedIn) {
      navigate("/admin/login");
    }
  }, [adminLoggedIn, navigate]);

  // Session state for dashboard data
  const [elections] = useSessionState("adminElections", defaultElections);
  const [voters] = useSessionState("adminVoters", defaultVoters);
  const [notifications] = useSessionState("adminNotifications", defaultNotifications);

  const handleLogout = () => {
    logout(); 
    navigate("/admin/login");
  };

  return (
    <div className="dashboard-container">
      
      <aside className="admin-sidebar">
        <ul>
          <li onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/admin/createelection")}>Create Election</li>
          <li onClick={() => navigate("/admin/manage-elections")}>Manage Elections</li>
          <li onClick={() => navigate("/admin/candidates")}>Add Candidate</li>
          <li onClick={() => navigate("/admin/management")}>Add Voter</li>
          <li onClick={() => navigate("/admin/monitor")}>Live Monitor</li>
          <li onClick={() => navigate("/admin/results")}>Election Result</li>
          <li onClick={() => navigate("/admin/blockchain")}>Blockchain Explorer</li>
          <li onClick={() => navigate("/admin/helpdesk")}>Help Desk</li>
           
        </ul>
      </aside>

      {/* Main content */}
      <main className="dashboard-main">
        {/* Welcome Banner */}
        <section className="dashboard-welcome">
          <h1>Welcome to Admin Dashboard</h1>
          <p>Manage elections, voters, and monitor blockchain status in real-time.</p>
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

        {/* Quick Actions as Chips */}
        <section className="dashboard-section actions-section">
          <h2>Quick Actions</h2>
          <div className="action-chips">
            <div className="chip" onClick={() => navigate("/admin/createelection")}>Create Election</div>
            <div className="chip" onClick={() => navigate("/admin/manage-elections")}>Manage Elections</div>
            <div className="chip" onClick={() => navigate("/admin/candidates")}>Add Candidate</div>
            <div className="chip" onClick={() => navigate("/admin/management")}>Add Voter</div>
            <div className="chip" onClick={() => navigate("/admin/monitor")}>Live Monitor</div>
            <div className="chip" onClick={() => navigate("/admin/results")}>Election Result</div>
            <div className="chip" onClick={() => navigate("/admin/blockchain")}>Blockchain Explorer</div>
            <div className="chip" onClick={() => navigate("/admin/helpdesk")}>Help Desk</div>
            
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
