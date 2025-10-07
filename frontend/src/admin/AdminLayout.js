import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../css/AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Replace with your auth logic
    window.location.href = "/";
  };

  return (
    <div className="admin-wrapper">
      {/* Top Navigation Bar */}
      <header className="admin-main-header">
        <div className="header-container">
          {/* Left: Hamburger + Logo + Title */}
          <div className="header-left">
            <button
              id="menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              &#9776;
            </button>
            <img
              src="/assets/images/logo2.png"
              alt="Logo"
              className="header-logo"
            />
            <span className="header-title">Admin Panel</span>
          </div>

          {/* Right: Buttons Container */}
         <div className="header-buttons-container">
  <button
    className="btn-default btn-register"
    onClick={() => navigate("/admin/createelection")}
  >
    ➕ Election
  </button>
  <button
    className="btn-default btn-register"
    onClick={() => navigate("/admin/candidates")}
  >
    ➕ Candidates
  </button>
  <button
    className="btn-default btn-wallet"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>

        </div>
      </header>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <NavLink to="/admin/dashboard" className="sidebar-link" onClick={handleLinkClick}>Dashboard</NavLink>
        <NavLink to="/admin/createelection" className="sidebar-link" onClick={handleLinkClick}>Create Election</NavLink>
        <NavLink to="/admin/manage-elections" className="sidebar-link" onClick={handleLinkClick}>Manage Elections</NavLink>
        <NavLink to="/admin/candidates" className="sidebar-link" onClick={handleLinkClick}>Candidates</NavLink>
        <NavLink to="/admin/management" className="sidebar-link" onClick={handleLinkClick}>Voters</NavLink>
        <NavLink to="/admin/monitor" className="sidebar-link" onClick={handleLinkClick}>Live Monitor</NavLink>
        <NavLink to="/admin/results" className="sidebar-link" onClick={handleLinkClick}>Election Results</NavLink>
        <NavLink to="/admin/blockchain" className="sidebar-link" onClick={handleLinkClick}>Blockchain Explorer</NavLink>
        <NavLink to="/admin/helpdesk" className="sidebar-link" onClick={handleLinkClick}>Help Desk</NavLink>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
