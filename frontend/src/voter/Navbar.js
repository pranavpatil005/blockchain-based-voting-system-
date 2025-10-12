// src/voter/Navbar.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useUserAuth } from "../context/UserAuthContext";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");
  const { userLogout } = useUserAuth();
  const [account, setAccount] = useState(null);
  const [userData, setUserData] = useState(null);

  // ✅ Fetch logged-in user's data
  useEffect(() => {
    const storedAadhaar = localStorage.getItem("aadhaar"); // store Aadhaar after login
    if (storedAadhaar) {
      axios
        .get("http://localhost:5000/api/voters")
        .then((res) => {
          if (res.data.success) {
            const user = res.data.voters.find(
              (v) => v.aadhaar === storedAadhaar
            );
            if (user) setUserData(user);
          }
        })
        .catch((err) => console.error("Error fetching voter data:", err));
    }
  }, []);

 

  const handleLogout = () => {
    userLogout();
    localStorage.removeItem("aadhaar");
    navigate("/");
  };

  return (
    <header className="navbar-main">
      <div className="navbar-container">
        {/* Left User Info / Logo */}
        <div className="navbar-logo" style={{ cursor: "pointer" }}>
          {userData?.photo ? (
            <img
              src={userData.photo}
              alt="User"
              className="navbar-logo-img"
              style={{
                borderRadius: "50%",
                width: "55px",
                height: "55px",
                objectFit: "cover",
                border: "2px solid #00e5ff",
              }}
            />
          ) : (
            <img
              src="/assets/images/logo2.png"
              alt="Website Logo"
              className="navbar-logo-img"
            />
          )}
          <span className="navbar-logo-text">
            {userData ? userData.name : "VOTECHAIN"}
          </span>
        </div>

        {/* Center Links */}
        <ul className="navbar-links">
          <li
            className={isActive("/voter")}
            onClick={() => navigate("/voter")}
          >
            Home
          </li>
          <li
            className={isActive("/candidates")}
            onClick={() => navigate("/candidates")}
          >
            Candidates
          </li>
          <li
            className={isActive("/castvote")}
            onClick={() => navigate("/castvote")}
          >
            Vote
          </li>

          <li
            className={isActive("/voterhelpdesk")}
            onClick={() => navigate("/voterhelpdesk")}
          >
            Help
          </li>
        </ul>

        {/* Right Buttons */}
        <div className="navbar-buttons">
         

          <a
            onClick={handleLogout}
            className="btn-default btn-register"
            style={{ marginTop: "5px",
    
    
   
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px"}}
          ><FaSignOutAlt />
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
