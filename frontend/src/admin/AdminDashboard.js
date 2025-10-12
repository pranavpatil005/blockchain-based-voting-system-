import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/AdminDashboard.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminLoggedIn, logout } = useAuth();

  const [totalVoters, setTotalVoters] = useState(0);
  const [currentElection, setCurrentElection] = useState(null);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!adminLoggedIn) {
      navigate("/admin/login");
    }
  }, [adminLoggedIn, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    // 1️⃣ Fetch total voters
    axios.get("http://localhost:5000/api/voters")
      .then(res => {
        if (res.data.success) setTotalVoters(res.data.voters.length);
      })
      .catch(err => console.error("Error fetching voters:", err));

    // 2️⃣ Fetch ongoing election
    axios.get("http://localhost:5000/api/election-status")
      .then(res => {
        if (res.data.success && res.data.status === "Ongoing") {
          setCurrentElection(res.data.election.name);
        } else {
          setCurrentElection("No ongoing election");
        }
      })
      .catch(err => console.error("Error fetching election status:", err));
  }, []);

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
          <li onClick={() => navigate("/admin/helpdesk")}>Help Desk</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        {/* Welcome Banner */}
        <section className="dashboard-welcome">
          <h1>Welcome to Admin Dashboard</h1>
          <p>Manage elections, voters, and monitor blockchain status in real-time.</p>
        </section>

        {/* Voter & Election Overview */}
        <section className="dashboard-section voter-section">
          <h2>Overview</h2>
          <div className="voter-stats">
            <div className="voter-card">
              <h3>Total Voters</h3>
              <p>{totalVoters}</p>
            </div>
            <div className="voter-card">
              <h3>Current Election</h3>
              <p>{currentElection}</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard-section actions-section">
          <h2>Quick Actions</h2>
          <div className="action-chips">
            <div className="chip" onClick={() => navigate("/admin/createelection")}>Create Election</div>
            <div className="chip" onClick={() => navigate("/admin/manage-elections")}>Manage Elections</div>
            <div className="chip" onClick={() => navigate("/admin/candidates")}>Add Candidate</div>
            <div className="chip" onClick={() => navigate("/admin/management")}>Add Voter</div>
            <div className="chip" onClick={() => navigate("/admin/monitor")}>Live Monitor</div>
            <div className="chip" onClick={() => navigate("/admin/results")}>Election Result</div>
            <div className="chip" onClick={() => navigate("/admin/helpdesk")}>Help Desk</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
