import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import {
  FaVoteYea,
  FaUserPlus,
  FaSignOutAlt,
  FaWallet
} from "react-icons/fa";
import "../css/AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Replace with your actual admin wallet address
  const ADMIN_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  // ✅ Connect wallet manually
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected. Please install MetaMask.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const userAddress = accounts[0].toLowerCase();

      if (userAddress !== ADMIN_ADDRESS.toLowerCase()) {
        alert("Unauthorized wallet address. Access denied.");
        navigate("/");
        return;
      }

      setAccount(userAddress);
      setError("");
      console.log("✅ Admin wallet connected:", userAddress);
    } catch (err) {
      console.error("Wallet connection failed:", err);
      setError("Wallet connection failed. Please try again.");
    }
  };

  // ✅ Auto-check wallet connection on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();

          if (accounts.length > 0) {
            const userAddress = accounts[0].address.toLowerCase();

            if (userAddress !== ADMIN_ADDRESS.toLowerCase()) {
              
            } else {
              setAccount(userAddress);
            }
          }
        } catch (error) {
          console.error("Error checking wallet:", error);
        }
      }
    };

    checkConnection();
  }, [navigate]);

  // ✅ Handle logout (disconnect admin)
  const handleLogout = () => {
    setAccount(null);
    navigate("/");
  };

  // ✅ Close sidebar when a link is clicked
  const handleLinkClick = () => setSidebarOpen(false);

  // ✅ Show wallet connect screen if not connected
  if (!account) {
    return (
      <div className="wallet-connect-screen"  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
  }}>
        <h2>🔒 Admin Access Restricted</h2>
        <p>Please connect the authorized admin wallet to continue.</p>
        <button onClick={connectWallet} className="btn-default btn-wallet">
          <FaWallet style={{ marginRight: "5px" }} />
          Connect Wallet
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }

  // ✅ Main layout when wallet is connected
  return (
    <div className="admin-wrapper">
      {/* Top Navigation Bar */}
      <header className="admin-main-header">
        <div className="header-container">
          {/* Left Section: Hamburger + Logo + Title */}
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

          {/* Right Section: Action Buttons */}
          <div className="header-buttons-container">
            <button
              className="btn-default btn-register"
              onClick={() => navigate("/admin/createelection")}
            >
              <FaVoteYea style={{ marginRight: "5px" }} /> Election
            </button>

            <button
              className="btn-default btn-register"
              onClick={() => navigate("/admin/candidates")}
            >
              <FaUserPlus style={{ marginRight: "5px" }} /> Candidates
            </button>

            <button
              className={`btn-default btn-wallet ${account ? "connected" : ""}`}
              onClick={connectWallet}
            >
              <FaWallet style={{ marginRight: "5px" }} />
              {account
                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect Wallet"}
            </button>

            <button
              className="btn-default btn-logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt style={{ marginRight: "5px" }} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <NavLink
          to="/admin/dashboard"
          className="sidebar-link"
          onClick={handleLinkClick}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/createelection"
          className="sidebar-link"
          onClick={handleLinkClick}
        >
          Create Election
        </NavLink>
        <NavLink
          to="/admin/manage-elections"
          className="sidebar-link"
          onClick={handleLinkClick}
        >
          Manage Elections
        </NavLink>
        <NavLink
          to="/admin/candidates"
          className="sidebar-link"
          onClick={handleLinkClick}
        >
          Candidates
        </NavLink>
        <NavLink
          to="/admin/management"
          className="sidebar-link"
          onClick={handleLinkClick}
        >
          Voters
        </NavLink>
        <NavLink
          to="/admin/monitor"
          className="sidebar-link"
          onClick={handleLinkClick}
        >
          Live Monitor
        </NavLink>
        <NavLink
          to="/admin/results"
          className="sidebar-link"
          onClick={handleLinkClick}
        >
          Election Results
        </NavLink>
        
        <NavLink
          to="/admin/helpdesk"
          className="sidebar-link"
          onClick={handleLinkClick}
        >
          Help Desk
        </NavLink>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
