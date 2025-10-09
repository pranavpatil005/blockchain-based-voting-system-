      // src/App.js
      import React, { useState, useEffect } from 'react';
      import { useNavigate } from 'react-router-dom';
      import axios from 'axios';
      import './App.css';


      import { FaWallet } from "react-icons/fa";

      const App = () => {
        const navigate = useNavigate();
        const handleLogin = () => navigate("/voter/login");
  const [election, setElection] = useState(null);
  const [status, setStatus] = useState("Loading...");

  const [timeLeft, setTimeLeft] = useState(null);
  const [lastElection, setLastElection] = useState(null);

  const calculateTimeLeft = (endDate) => {
      const now = new Date();
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const diff = end - now;
      if (diff <= 0) return null;

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    // 🛰️ Fetch election data
    // 🛰️ Fetch election status
useEffect(() => {
  axios
    .get("http://localhost:5000/api/election-status")
    .then((res) => {
      if (res.data.success) {
        setElection(res.data.election);
        setStatus(res.data.status);
        if (res.data.status === "Ongoing" && res.data.election) {
          setTimeLeft(calculateTimeLeft(res.data.election.to_date));
        }
      } else {
        setStatus("Error");
      }
    })
    .catch(() => setStatus("Error"));
}, []);



    useEffect(() => {
      axios
        .get("http://localhost:5000/api/active-election")
        .then((res) => {
          if (res.data.success) {
            setElection(res.data.election);
            setStatus(res.data.status);
            if (res.data.status === "Ongoing" && res.data.election) {
              setTimeLeft(calculateTimeLeft(res.data.election.to_date));
            }
          }
        })
        .catch(() => setStatus("Error fetching election"));
    }, []);

    // ⏳ Countdown Timer
    useEffect(() => {
      if (!election || status !== "Ongoing") return;
      const timer = setInterval(() => {
        const updated = calculateTimeLeft(election.to_date);
        setTimeLeft(updated);
        if (!updated) setStatus("Election Ended");
      }, 1000);
      return () => clearInterval(timer);
    }, [election, status]);
      

        useEffect(() => {
          axios.get('http://localhost:5000/api/latest-ended-election')
            .then(res => {
              if (res.data.success) {
                setLastElection(res.data.election);
              }
            })
            .catch(err => console.log(err));
        }, []);

      const [account, setAccount] = useState(null);

      const connectWallet = async () => {
        if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
          } catch (err) {
            console.error("Wallet connection failed", err);
          }
        } else {
          alert("MetaMask not installed. Please install it to connect.");
        }
      };

        return (
          <div>
            {/* Header Start */}
            <header className="main-header" style={{ marginTop: '3100px' }}>
              <div className="header-sticky">
                <nav className="navbar navbar-expand-lg">
                  <div
                    className="container"
                    style={{ display: 'flex', alignItems: 'center', height: '250px' }}
                  >
                    {/* Logo Left */}
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}> 
                
                
                
        <img 
          src="/assets/images/logo2.png" 
          alt="Website Logo" 
          style={{ width: '60px', height: '60px', objectFit: 'contain' }}
        />


      VOTECHAIN</div>

                    <div style={{ flex: 1 }}></div>

                


                  </div>
            <div className="header-btn" style={{ display: 'flex', justifyContent: 'space-between', width: '280px' }}>
        <a onClick={handleLogin} className="btn-default btn-register">
          Register to Vote
        </a>
    <a
    onClick={connectWallet}
    className={`btn-default btn-wallet ${account ? 'connected' : ''}`}
    style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
  >
    <FaWallet />connect wallet
  </a>


      </div>


                </nav>
                <div className="responsive-menu"></div>
              </div>
            </header>


         <div className="hero parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="hero-content">
                <div className="section-title dark-section">
                  {/* Main Heading */}
                  <h1
                    className="text-anime-style-2"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00e5ff";
                      e.currentTarget.style.textShadow =
                        "1px 1px 10px rgba(0,229,255,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.textShadow =
                        "2px 2px 5px rgba(240, 223, 223, 0.5)";
                    }}
                    style={{
                      fontSize: "80px",
                      textShadow:
                        "2px 2px 5px rgba(240, 223, 223, 0.5)",
                      marginBottom: "50px",
                      marginTop: "80px",
                      transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                  >
                    Blockchain based E-Voting System
                  </h1>

                  <hr
                    style={{
                      color: "white",
                      marginBottom: "50px",
                      opacity: 0.6,
                    }}
                  />

                  {/* Subheading */}
                  <h1 className="text-anime-style-2">
                    Be the change{" "}
                    <span style={{ display: "inline-block" }}>
                      you want to see
                    </span>
                  </h1>

                  <p
                    className="para"
                     onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fbff00ff";
                      e.currentTarget.style.textShadow =
                        "1px 1px 10px rgba(0,229,255,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.textShadow =
                        "2px 2px 5px rgba(240, 223, 223, 0.5)";
                    }}
                    style={{
                      fontSize: "20px",
                      textShadow:
                        "2px 2px 5px rgba(240, 223, 223, 0.5)",
                      marginBottom: "50px",
                      marginTop: "80px",
                      transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                  >
                    At the heart of democracy lies the power of the people. By
                    contributing to our mission, you become an essential part of
                    driving positive change, shaping policies, and creating a
                    brighter future for everyone.
                  </p>
                </div>

                {/* --- Election Status Section --- */}
               <div  style={{ textAlign: "center", padding: "50px" }}>
  {status === "Loading..." && (
    <h2 style={{ color: "gray" }}>Loading election status...</h2>
  )}
  {status === "Error" && (
    <h2 style={{ color: "red" }}>Error fetching election status</h2>
  )}

  {status === "Ongoing" && election && (
    <>
      <h2 style={{ color: "#16a34a", fontWeight: "bold" }}>
        🟢 Ongoing Election: {election.name}
      </h2>

      {timeLeft && (
        <div
        className="countdown-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            margin: "25px 0",
          }}
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
            className="countdown-wrapper"
              key={unit}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "6px",
                textAlign: "center",
                minWidth: "70px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderBottom: "4px solid #38bdf8",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#38bdf8",
                  marginBottom: "5px",
                }}
              >
                {String(value).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#333",
                  letterSpacing: "1px",
                }}
              >
                {unit.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      )}

      <p style={{ color: "#d1fae5" }}>
        Ends on {new Date(election.to_date).toLocaleString()}
      </p>
    </>
  )}

  {status === "Upcoming" && election && (
    <>
      <h2 style={{ color: "#facc15", fontWeight: "bold" }}>
        🟡 Upcoming Election: {election.name}
      </h2>
      <p style={{ color: "#fff", marginTop: "10px" }}>
        Starts on{" "}
        <strong>{new Date(election.from_date).toLocaleString()}</strong>
      </p>
    </>
  )}

  {status === "No Elections Scheduled" && (
    <h2 style={{ color: "#ef4444", fontWeight: "bold" }}>
      🔴 No Upcoming Elections
    </h2>
  )}
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
            {/* Hero Section End */}



    {/* Resultttt */}
        
   {/* Result Section */}
<div className="results-wrapper">
  <div className="winner-section">
    {lastElection?.candidates?.length > 0 ? (
      <>
        {/* Title */}
        <div className="winner-title">
          <h1 className="results-heading">Results of Last Ended Election</h1>
          <h2 className="election-name">{lastElection.name}</h2>
        </div>

        {/* Winner */}
        {(() => {
          const winner = lastElection.candidates.reduce((prev, curr) =>
            Number(curr.votes) > Number(prev.votes) ? curr : prev
          );

          return (
            <div className="winner-card-vertical">
              <div className="winner-photo-wrapper">
                <img
                  src={winner.photo || "/images/default-user.png"}
                  alt={winner.name}
                  className="winner-photo-vertical glow-photo"
                />
              </div>
              <h3 className="winner-name-vertical">{winner.name}</h3>
              <div className="winner-party-horizontal">
                <img
                  src={winner.party_logo || "/images/default-party.png"}
                  alt={winner.party}
                  className="party-logo-horizontal"
                />
                <span className="winner-party-name-horizontal">{winner.party}</span>
              </div>
              <div className="winner-votes-vertical">
                Votes: <span>{winner.votes}</span>
              </div>
              <div className="winner-text-label">Winner</div>
            </div>
          );
        })()}

        {/* Other Candidates */}
        <div className="other-candidates">
          {lastElection.candidates
            .filter((c) => {
              const winner = lastElection.candidates.reduce((prev, curr) =>
                Number(curr.votes) > Number(prev.votes) ? curr : prev
              );
              return c.id !== winner.id;
            })
            .map((c, i) => (
              <div key={i} className="candidate-card-mini hover-up">
                <img
                  src={c.photo || "/images/default-user.png"}
                  alt={c.name}
                  className="candidate-photo-mini"
                />
                <h4 className="candidate-name-mini">{c.name}</h4>
                <div className="candidate-party-horizontal">
                  <img
                    src={c.party_logo || "/images/default-party.png"}
                    alt={c.party}
                    className="candidate-party-logo-horizontal"
                  />
                  <span className="candidate-party-name-horizontal">{c.party}</span>
                </div>
                <div className="candidate-votes-mini">
                  Votes: <span>{c.votes}</span>
                </div>
              </div>
            ))}
        </div>
      </>
    ) : (
      <p className="winner-placeholder">
        {lastElection ? "No candidates found for last election" : "Results are Not Declared yet"}
      </p>
    )}
  </div>
</div>


            {/* Our Supporters Section End */}





            {/* About Us Section Start */}
            <div className="about-us">
              <div className="container">
                <div className="row align-items-center">

                  <div className="col-lg-6">
                    {/* About Us Image Start */}
                    <div className="about-us-image">
                      {/* About Image Start */}
                      <div className="about-image">
                        <figure className="image-anime">
                          <img src="/assets/images/blockchain.jpeg" alt="About Us" />
                        </figure>
                      </div>
                      {/* About Image End */}

                      {/* About Image Info Start */}
                      <div className="about-image-info">
                        <h2>about us</h2>
                        <h3>Blockchain based E-Voting System</h3>
                        <p>by Students of G.H. Raisoni College of Engineering and Management, Jalgaon.</p>
                      </div>
                      {/* About Image Info End */}
                    </div>
                    {/* About Us Image End */}
                  </div>

                  <div className="col-lg-6">
                    {/* About Us Content Start */}
                    <div className="about-us-content">
                      {/* Section Title Start */}
                      <div className="section-title">
                        <h3 className="">About Us</h3>
                        <h2 className="text-anime-style-2" >
                          <span>BLOCKCHAIN</span> based E-Voting System
                        </h2>
                        <p style={{ fontSize: '17px' }}>
                          We are building a secure, transparent, and decentralized voting platform powered by blockchain technology. Our system ensures that every vote is recorded immutably, eliminating fraud and enhancing trust in the democratic process. Designed for scalability and accessibility, it makes voting easier, faster, and safer for everyone.

                        </p>
                      </div>
                      {/* Section Title End */}

                      

                      {/* About Us List Start */}
                      <div className="about-us-list">
                        <ul>
                          <li>Tamper-Proof Voting – Every vote is securely stored on the blockchain, making it impossible to alter or delete.
                          </li>
                          <li>Voter Anonymity – Ensures privacy while maintaining full transparency of the process.
                          </li>
                          <li>Decentralized & Transparent – Results can be verified by anyone without relying on a central authority.
                          </li>
                          <li>Easy & Accessible – Users can vote using just their digital wallet from anywhere.
                          </li>
                          <li> Cost-Effective & Scalable – Reduces election costs while handling millions of voters securely.</li>
                        </ul>
                      </div>
                      {/* About Us List End */}


                    </div>
                    {/* About Us Content End */}
                  </div>

                </div>
              </div>
            </div>
            {/* About Us Section End */}


        



            <div className="our-campaign">
              <div className="container">
                <div className="row section-row align-items-center">
                  <div className="col-lg-6">
                    {/* Section Title Start */}
                    <div className="section-title section-title-left">
                      <h3 className="wow fadeInUp">Our campaign</h3>
                      <h2 className="text-anime-style-2" 
                      >
                        Our mission and vision: building a <span>better tomorrow</span>
                      </h2>
                    </div>
                    {/* Section Title End */}
                  </div>



                </div>



                <div className="row">
                  <div className="col-lg-12">
                    {/* Campaign List Start */}
                    <div className="campaign-list">
                      {/* Campaign Item Start */}
                      <div className="campaign-item">
                        <div className="campaign-image">
                          <img src={`${process.env.PUBLIC_URL}/assets/images/campaign-1.jpg`} alt="Campaign 1" />

                        </div>
                        <div className="campaign-content">
                          <div className="campaign-icon">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/icon-campaign-1.svg`} alt="Icon 1" />
                          </div>
                          <div className="campaign-content-info">
                            <h3>Economic</h3>
                            <p>
                              Efficiently orchestrate resource sucking human capital
                              whereas future-proof outsourcing. Credibly actualize one.
                            </p>
                          </div>

                        </div>
                      </div>
                      {/* Campaign Item End */}

                      {/* Campaign Item Start */}
                      {/* Campaign Item Start */}
                      <div className="campaign-item ">
                        <div className="campaign-image">
                          {/* public/assets/images/campaign-2.jpg */}
                          <img src="/assets/images/campaign-2.jpg" alt="Medical campaign" />
                        </div>

                        <div className="campaign-content">
                          <div className="campaign-icon">
                            <img src="/assets/images/icon-campaign-2.svg" alt="Medical icon" />
                          </div>

                          <div className="campaign-content-info">
                            <h3>Medical</h3>
                            <p>
                              Seamlessly redefine standard compliant ROI for seamless web-readiness.
                              Collab transition sticky testing procedures.
                            </p>
                          </div>


                        </div>
                      </div>
                      {/* Campaign Item End */}

                      {/* Campaign Item Start */}
                      <div className="campaign-item">
                        <div className="campaign-image">
                          <img src="/assets/images/campaign-3.jpg" alt="Social campaign" />
                        </div>

                        <div className="campaign-content">
                          <div className="campaign-icon">
                            <img src="/assets/images/icon-campaign-3.svg" alt="Social icon" />
                          </div>

                          <div className="campaign-content-info">
                            <h3>Social</h3>
                            <p>
                              Continually foster inexpensive systems with principle-centered value.
                              Interactively matrix cross-media methods of empowerment.
                            </p>
                          </div>


                        </div>
                      </div>
                      {/* Campaign Item End */}

                      {/* Campaign Item Start */}
                      <div className="campaign-item">
                        <div className="campaign-image">
                          <img src="/assets/images/campaign-4.jpg" alt="Foreign policy campaign" />
                        </div>

                        <div className="campaign-content">
                          <div className="campaign-icon">
                            <img src="/assets/images/icon-campaign-4.svg" alt="Foreign policy icon" />
                          </div>

                          <div className="campaign-content-info">
                            <h3>Foreign policy</h3>
                            <p>
                              Monotonically provide access to superior outsourcing after cross-media convergence.
                              Interactively incentivize open source.
                            </p>
                          </div>


                        </div>
                      </div>
                      {/* Campaign Item End */}

                      {/* Campaign Item Start */}
                      <div className="campaign-item">
                        <div className="campaign-image">
                          <img src="/assets/images/campaign-5.jpg" alt="Education campaign" />
                        </div>

                        <div className="campaign-content">
                          <div className="campaign-icon">
                            <img src="/assets/images/icon-campaign-5.svg" alt="Education icon" />
                          </div>

                          <div className="campaign-content-info">
                            <h3>Education</h3>
                            <p>
                              Efficiently orchestrate resource sucking human capital whereas
                              future-proof outsourcing. Credibly actualize.
                            </p>
                          </div>


                        </div>
                      </div>
                      {/* Campaign Item End */}

                      {/* Campaign Item Start */}
                      <div className="campaign-item">
                        <div className="campaign-image">
                          <img src="/assets/images/campaign-6.jpg" alt="Family campaign" />
                        </div>

                        <div className="campaign-content">
                          <div className="campaign-icon">
                            <img src="/assets/images/icon-campaign-6.svg" alt="Family icon" />
                          </div>

                          <div className="campaign-content-info">
                            <h3>Family</h3>
                            <p>
                              Efficiently implement user-centric for cross-media relationship.
                              Authoritatively productive turnkey functionality.
                            </p>
                          </div>


                        </div>
                      </div>
                      {/* Campaign Item End */}


                    </div>
                    {/* Campaign List End */}

                    {/* Section Footer Text Start */}
                    <div
                      className="section-footer-text wow fadeInUp"
                      data-wow-delay="0.2s"
                    >
                      <p>
                        Be the change your community needs -{" "}
                        <a href="contact.html">get involved with us today!</a>
                      </p>
                    </div>
                    {/* Section Footer Text End */}
                  </div>
                </div>
              </div>
            </div>




            {/* Footer Start */}
            <footer className="main-footer">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    {/* Footer Header Start */}
                    <div className="footer-header">
                      <div className="section-title dark-section">
                        <h2 className="text-anime-style-2" >
                          <span> BLOCKCHAIN</span> based E-Voting System
                        </h2>

                      </div>


                    </div>
                    
                    {/* Footer Header End */}
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                      alt="Logo"
                    />
                  </div>
                  <div className="col-lg-1 col-md-1"></div>

                  <div className="col-lg-3 col-md-3">
                    {/* About Footer Start */}
                    <div className="about-footer">
                      <div className="footer-logo">
                        <img src="images/footer-logo.svg" alt="" />
                      </div>
                      <div className="about-footer-content">
                        <p style={{ textAlign: 'justify' }}>
                          A Blockchain-based E-Voting System ensures secure, transparent, and tamper-proof elections by storing votes on an immutable distributed ledger.
                          It enhances trust, prevents fraud, and enables verifiable results while maintaining voter privacy.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-1"></div>


                  <div className="col-lg-3 col-md-3">
                    <div className="footer-links">
                      <h3>Developed By :</h3>

                      <ul>
                        <li><a href="#">Durvankur Gajanan Sonar</a></li>
                        <li><a href="#">Pranav Prahlad Patil</a></li>
                        <li><a href="#">Nikita Mahesh Kurkure</a></li>
                        <li><a href="#">Liji Mohan Varghese</a></li>
                        <li><a href="#">Vivek Vijay Chaudhari</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">

                  </div>

                </div>
              </div>

              <div className="footer-copyright">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="copyright-text">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
            {/* Footer End */}
          </div>
        );
      };



      export default App;
