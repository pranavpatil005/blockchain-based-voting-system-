// import React, { useState } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import "../css/AdminLayout.css";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Close sidebar when clicking a link
//   const handleLinkClick = () => {
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="admin-wrapper">
//       {/* Top Bar */}
//       <header className="admin-header">
//         <button
//           className="menu-btn"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           &#8942; {/* 3 vertical dots */}
//         </button>
//         <h1 className="admin-title">Admin Panel</h1>
//       </header>

//       {/* Sidebar */}
//       <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
//         <NavLink to="/admin/dashboard" className="sidebar-link" onClick={handleLinkClick}>Dashboard</NavLink>
//         <NavLink to="/admin/home" className="sidebar-link" onClick={handleLinkClick}>Home</NavLink>
//         <NavLink to="/admin/analytics" className="sidebar-link" onClick={handleLinkClick}>Analytics</NavLink>
//         <NavLink to="/admin/auditlogs" className="sidebar-link" onClick={handleLinkClick}>Audit Logs</NavLink>
//         <NavLink to="/admin/blockchain" className="sidebar-link" onClick={handleLinkClick}>Blockchain Explorer</NavLink>
//         <NavLink to="/admin/candidates" className="sidebar-link" onClick={handleLinkClick}>Candidates</NavLink>
//         <NavLink to="/admin/createelection" className="sidebar-link" onClick={handleLinkClick}>Create Election</NavLink>
//         <NavLink to="/admin/results" className="sidebar-link" onClick={handleLinkClick}>Election Results</NavLink>
//         <NavLink to="/admin/helpdesk" className="sidebar-link" onClick={handleLinkClick}>Help Desk</NavLink>
//         <NavLink to="/admin/monitor" className="sidebar-link" onClick={handleLinkClick}>Live Voting Monitor</NavLink>
//         <NavLink to="/admin/smartcontract" className="sidebar-link" onClick={handleLinkClick}>Smart Contract Control</NavLink>
//         <NavLink to="/admin/settings" className="sidebar-link" onClick={handleLinkClick}>System Settings</NavLink>
//         <NavLink to="/admin/management" className="sidebar-link" onClick={handleLinkClick}>Voter Management</NavLink>
//       </aside>

//       {/* Main Content */}
//       <main className="admin-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

// import React, { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import "../css/AdminLayout.css";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLinkClick = () => {
//     setSidebarOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Replace with your auth logic
//     window.location.href = "/";
//   };

//   return (
//     <div className="admin-wrapper">
//       {/* Top Navigation Bar */}
//       <header className="admin-header">
//         <div className="admin-header-left">
//           <button
//             className="menu-btn"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             &#9776; {/* Hamburger menu (black) */}
//           </button>
//           <div className="admin-header-text">
//             <h1>Admin Panel</h1>
          
//           </div>
//         </div>

//         <div className="admin-header-right">
//           <button
//             className="new-election-btn"
//             onClick={() => navigate("/admin/createelection")}
//           >
//             ➕ Election
//           </button>
//           <button
//             className="new-election-btn"
//             onClick={() => navigate("/admin/createelection")}
//           >
//             ➕ Candidates
//           </button>
//           <button
//             className="logout-button"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Slide-out Sidebar */}
//       <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
//         <NavLink to="/admin/dashboard" className="sidebar-link" onClick={handleLinkClick}>Dashboard</NavLink>
//         <NavLink to="/admin/createelection" className="sidebar-link" onClick={handleLinkClick}>Create Election</NavLink>
//         <NavLink to="/admin/candidates" className="sidebar-link" onClick={handleLinkClick}>Candidates</NavLink>
//         <NavLink to="/admin/management" className="sidebar-link" onClick={handleLinkClick}>Voters</NavLink>
//         {/* <NavLink to="/admin/smartcontract" className="sidebar-link" onClick={handleLinkClick}>Smart Contracts</NavLink> */}
//         <NavLink to="/admin/monitor" className="sidebar-link" onClick={handleLinkClick}>Live Monitor</NavLink>
//         <NavLink to="/admin/results" className="sidebar-link" onClick={handleLinkClick}>Election Results</NavLink>
//         <NavLink to="/admin/blockchain" className="sidebar-link" onClick={handleLinkClick}>Blockchain Explorer</NavLink>
//         {/* <NavLink to="/admin/settings" className="sidebar-link" onClick={handleLinkClick}>System Settings</NavLink>
//         <NavLink to="/admin/analytics" className="sidebar-link" onClick={handleLinkClick}>Analytics Reports</NavLink>
//         <NavLink to="/admin/auditlogs" className="sidebar-link" onClick={handleLinkClick}>Audit Logs</NavLink> */}
//         <NavLink to="/admin/helpdesk" className="sidebar-link" onClick={handleLinkClick}>Help Desk</NavLink>
//       </aside>

//       {/* Main Content */}
//       <main className="admin-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;
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
      <header className="admin-header">
        <div className="admin-header-left">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            &#9776; {/* Hamburger menu (black) */}
          </button>

          {/* 🖼️ Website Logo */}
          <div className="logo-container">
            <img
              src="/assets/images/logo2.png"
              alt="Website Logo"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
                marginBottom: "0",
              }}
            />
          </div>

          <div className="admin-header-text">
            <h1>Admin Panel</h1>
          
          </div>
        </div>

        <div className="admin-header-right">
          <button
            className="new-election-btn"
            onClick={() => navigate("/admin/createelection")}
          >
            ➕ Election
          </button>
          <button
            className="new-election-btn"
            onClick={() => navigate("/admin/createelection")}
          >
            ➕ Candidates
          </button>
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Slide-out Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <NavLink to="/admin/dashboard" className="sidebar-link" onClick={handleLinkClick}>Dashboard</NavLink>
        <NavLink to="/admin/createelection" className="sidebar-link" onClick={handleLinkClick}>Create Election</NavLink>
        <NavLink to="/admin/candidates" className="sidebar-link" onClick={handleLinkClick}>Candidates</NavLink>
        <NavLink to="/admin/management" className="sidebar-link" onClick={handleLinkClick}>Voters</NavLink>
        {/* <NavLink to="/admin/smartcontract" className="sidebar-link" onClick={handleLinkClick}>Smart Contracts</NavLink> */}
        <NavLink to="/admin/monitor" className="sidebar-link" onClick={handleLinkClick}>Live Monitor</NavLink>
        <NavLink to="/admin/results" className="sidebar-link" onClick={handleLinkClick}>Election Results</NavLink>
        <NavLink to="/admin/blockchain" className="sidebar-link" onClick={handleLinkClick}>Blockchain Explorer</NavLink>
        {/* <NavLink to="/admin/settings" className="sidebar-link" onClick={handleLinkClick}>System Settings</NavLink>
        <NavLink to="/admin/analytics" className="sidebar-link" onClick={handleLinkClick}>Analytics Reports</NavLink>
        <NavLink to="/admin/auditlogs" className="sidebar-link" onClick={handleLinkClick}>Audit Logs</NavLink> */}
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
