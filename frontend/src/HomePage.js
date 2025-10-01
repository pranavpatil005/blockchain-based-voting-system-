// src/App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';


import { FaWallet } from "react-icons/fa";

const App = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/voter/login");

  const [activeElection, setActiveElection] = useState(null);
  const [lastElection, setLastElection] = useState(null);
  const [election, setElection] = useState(null);
  const [status, setStatus] = useState('Loading...');
  const [timeLeft, setTimeLeft] = useState(null);

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate); // directly use the DB date
    end.setHours(23, 59, 59, 999); // end of that day

    const diff = end.getTime() - now.getTime();

    if (diff > 0) {
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    return null;
  };



  useEffect(() => {
    axios.get('http://localhost:5000/api/active-election')
      .then(res => {
        if (res.data.election) {
          setElection(res.data.election);
          setStatus('Election Ongoing');
          setTimeLeft(calculateTimeLeft(res.data.election.to_date));
        } else {
          setElection(null);
          setStatus('Election Ended');
        }
      })
      .catch(() => setStatus('Error fetching election'));

  }, []);

  // Countdown timer
  useEffect(() => {
    if (!election) return;
    const timer = setInterval(() => {
      const updated = calculateTimeLeft(election.to_date);
      setTimeLeft(updated);
      if (!updated) setStatus('Election Ended');
      else setStatus('Election Ongoing');
    }, 1000);
    return () => clearInterval(timer);
  }, [election]);


  const castVote = (id) => {
    axios.post('http://localhost:5000/api/cast-vote', { candidate_id: id })
      .then(() => alert('Vote recorded successfully'))
      .catch(() => alert('Error casting vote'));
  };

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
              <a className="navbar-brand" href="#">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logo2.png`}
                  alt="Logo"
                  style={{ width: '120px', height: '80px' }} 
                />

              </a>

              <div style={{ flex: 1 }}></div>

           


            </div>
       <div className="header-btn" style={{ display: 'flex', justifyContent: 'space-between', width: '280px' }}>
  <a onClick={handleLogin} className="btn-default btn-register">
    Register to Vote
  </a>
<a 
  onClick={connectWallet} 
  className={`btn-default btn-wallet ${account ? 'connected' : ''}`} 
  style={{ cursor: "pointer" }}
>
  <FaWallet className="wallet-icon" />
  {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
</a>

</div>


          </nav>
          <div className="responsive-menu"></div>
        </div>
      </header>


      {/* Hero Section Start */}
      <div className="hero parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">

              <div className="hero-content">
                <div className="section-title dark-section">
                  <h1
                    className="text-anime-style-2"
                    data-cursor="-opaque"
                    style={{
                      fontSize: '80px',
                      textShadow: '2px 2px 5px rgba(240, 223, 223, 0.5)',
                      marginBottom: '50px',
                      marginTop: '80px',
                    }}
                  >
                    Blockchain based E-Voting System
                  </h1>
                  <hr style={{ color: 'white', marginBottom: '50px' }}></hr>

                  <h1 className="text-anime-style-2" data-cursor="-opaque">

                    Be the change<span> you want to see</span>
                  </h1>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    At the heart of democracy lies the power of the people. By contributing
                    to our mission, you become an essential part of driving positive
                    change, shaping policies, and creating a brighter future for everyone.
                  </p>
                </div>
                {status === "Election Ongoing" ? (
                  <div className="header-btn">
                    <a onClick={handleLogin} class="btn-default btn-highlighted">Register to Vote</a>
                  </div>
                ) : (<span></span>
                )}
                <div>
                  {/* Election Status */}
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    {/* <h1>Blockchain Based E-Voting System</h1> */}
                    <h2
                      style={{
                        color: status === "Election Ongoing" ? "green" : "red",
                        fontWeight: "bold",
                        fontSize: "28px",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
                      }}
                    >
                      {status}
                    </h2>


                    {election && timeLeft && status === 'Election Ongoing' && (
                      <>
                        <h3 class="text-info">Election: {election.name}</h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "15px",
                            margin: "20px 0"
                          }}
                        >
                          {Object.entries(timeLeft).map(([unit, value], index) => {
                            // Alternate colors (red for DAYS/MINS, blue for HOURS/SEC)
                            const isRed = unit === "days" || unit === "minutes";
                            const color = isRed ? "#e74c3c" : "#2937b9ff";

                            return (
                              <div
                                key={unit}
                                style={{
                                  background: "#fff",
                                  padding: "15px",
                                  borderRadius: "4px",
                                  textAlign: "center",
                                  minWidth: "70px",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                  borderBottom: `4px solid ${color}`
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "28px",
                                    fontWeight: "bold",
                                    color: color,
                                    marginBottom: "5px"
                                  }}
                                >
                                  {String(value).padStart(2, "0")}
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    color: "#333",
                                    letterSpacing: "1px"
                                  }}
                                >
                                  {unit.toUpperCase()}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                      </>
                    )}
                  </div>

                </div>



                {status === "Election Ongoing" ? (
                  <span></span>
                ) : (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 25px",
                      color: "#fff",
                      backgroundColor: "#1fbb27",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#16a520")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1fbb27")}
                    onClick={() => {
                      const element = document.getElementById("resultsSection");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    See Results!
                  </span>
                )}




              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Hero Section End */}

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
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
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


      {/* Our Supporters Section Start */}
      <div className="our-supporters parallaxie" id="resultsSection">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-12">
              {/* Supporters Content Start */}
              <div className="supporters-content">
                <div className="section-title dark-section">
                  {status === "Election Ended" ? (
                    lastElection?.candidates?.length > 0 ? (
                      <div>
                        <h5 style={{color:"white", marginBottom:"30px"}}>Results of Last Ended Election</h5>
                        <h2>
                          Winner is<br></br> <span>
                            {lastElection.candidates.reduce((prev, current) =>
                              prev.votes > current.votes ? prev : current
                            ).name}
                          </span>
                        </h2>
                      </div>
                    ) : (
                      <h2>No candidates found for last election</h2>
                    )
                  ) : (
                    <h2>Results are Not Declared yet</h2>
                  )}


                </div>
              </div>
              {/* Supporters Content End */}
            </div>
          </div>



          <div className="container">


            {lastElection ? (
              <div className="row justify-content-center">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="supporters-counter-list d-flex justify-content-center flex-wrap">
                    {lastElection.candidates.map((c, i) => (
                      <div key={i} className="supporters-counter-item text-center mx-2">
                        <img src={`images/icon-supporter-${i + 1}.svg`} alt="" />
                        <h2>
                          <span className="counter">{c.votes}</span>
                        </h2>
                        <p>{c.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">No past election data available</p>
            )}
          </div>

        </div>
      </div>

      {/* Our Supporters Section End */}



      <div className="our-campaign">
        <div className="container">
          <div className="row section-row align-items-center">
            <div className="col-lg-6">
              {/* Section Title Start */}
              <div className="section-title section-title-left">
                <h3 className="wow fadeInUp">Our campaign</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
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
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
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

const styles = {
  countdownContainer: {
    display: 'flex',
    justifyContent: 'center', // center horizontally
    alignItems: 'center',     // center vertically within parent if needed
    gap: '0px',               // remove space between boxes
    padding: '20px',
    borderRadius: '10px',
  },
  timeUnitContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  numberBox: {
    backgroundColor: '#FFFFFF',
    width: '100px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  number: {
    fontSize: '3.5em',
    fontWeight: '700',
    lineHeight: '1',
  },
  underline: {
    width: '60%',
    height: '5px',
    borderRadius: '2px',
    marginTop: '5px',
  },
  label: {
    color: '#FFFFFF',
    fontSize: '1.2em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },





};



export default App;
