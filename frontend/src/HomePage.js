import React from "react";
import "./css/HomePage.css";
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const handleRegister = () => alert("Redirecting to Register...");
  const handleLogin = ()=> {
        navigate("/voterlogin"); 
    };
    
  const handleAbout = ()=> {navigate("/about");  };
  const handleAdmin = () => navigate("/adminlogin");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">📊 VOTECHAIN</span>
        </div>
        
        <div className="navbar-right">
          <button className="wallet-button">Connect Wallet</button>
          <button className="admin-button" onClick={handleAdmin}>Admin</button>
          <button className="admin-button" onClick={handleAbout}>About</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero bg" style={{
    backgroundImage: `url("https://images.unsplash.com/photo-1581092160610-7c1c5b1d7fd2?auto=format&fit=crop&w=1400&q=80")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    
  }}>
        <h1>Secure Voting on the Blockchain</h1>
        <p>
          Transparent, tamper-proof, and accessible voting system powered by
          blockchain technology.
        </p>
        <div className="hero-buttons">
         
          <button className="login-button" onClick={handleLogin}>
            Register to Vote →
          </button>
        </div>
        <div className="status" >
  <span className="badge" style={{backgroundColor: '#117622ff'}}></span>
  Election Status: Ongoing
</div>

      </section>

    </div>
  );
}

export default App;