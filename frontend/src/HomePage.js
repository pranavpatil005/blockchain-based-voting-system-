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








const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % 5);
  }, 2500);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const cards = document.querySelectorAll("#dev-carousel .dev-card");
  cards.forEach((card, index) => {
    const offset = (index - activeIndex + cards.length) % cards.length;
    let transform = "";
    let zIndex = 0;
    let opacity = 1;

    if (offset === 0) {
      transform = "translateX(0) scale(1.2)";
      zIndex = 3;
      opacity = 1;
    } else if (offset === 1 || offset === cards.length - 1) {
      transform = `translateX(${offset === 1 ? "220px" : "-220px"}) scale(1)`;
      zIndex = 2;
      opacity = 0.8;
    } else {
      transform = `translateX(${offset === 2 ? "400px" : "-400px"}) scale(0.9)`;
      zIndex = 1;
      opacity = 0.5;
    }

    card.style.transform = transform;
    card.style.zIndex = zIndex;
    card.style.opacity = opacity;
  });
}, [activeIndex]);










  
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
                          <img src="/assets/images/Vote.png" alt="About Us" />
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
                              VoteChain brings transparency to economic decisions, reducing corruption and ensuring public trust in how resources and trade policies are managed.
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
                              By securing health-related voting, VoteChain ensures fair, data-driven decisions on funding, research, and public healthcare priorities.
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
                              VoteChain empowers communities to shape social justice and welfare policies through transparent, bias-free participation.
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
                              It ensures citizen voices guide foreign relations and global cooperation through trusted, accountable voting processes.
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
                              It enables students, educators, and citizens to influence education policies with secure, verifiable, and inclusive voting.
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
                              VoteChain promotes transparent decision-making on family welfare, childcare, and community support programs.
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


{/* Developer Carousel Section */}
{/* Developer Carousel */}
<div id="dev-carousel-section">
  <h2 id="dev-carousel-title">Meet Our Developers</h2>

  <div id="dev-carousel">
    {[
      {
        name: "Durvankur Gajanan Sonar",
        img: "/assets/images/members/durvankur.jpg",
        linkedin: "https://www.linkedin.com/in/durvankursonar",
        github: "https://github.com/durvankursonar",
      },
      {
        name: "Pranav Prahlad Patil",
        img: "/assets/images/members/pranav.jpg",
        linkedin: "https://www.linkedin.com/in/pranav-patil-4003b9210/",
        github: "https://github.com/pranavpatil005",
      },
      {
        name: "Nikita Mahesh Kurkure",
        img: "/assets/images/members/nikita.jpg",
        linkedin: "https://www.linkedin.com/in/nikita-kurkure-08a7a1345/",
        github: "https://github.com/nikitakurkure-2004",
      },
      {
        name: "Liji Mohan Varghese",
        img: "/assets/images/members/liji.jpg",
        linkedin: "http://www.linkedin.com/in/liji-varghese-398b15257",
        github: "https://github.com/Lizz6780",
      },
      {
        name: "Vivek Vijay Chaudhari",
        img: "/assets/images/members/vivek.jpg",
        linkedin: "https://www.linkedin.com/in/vivek-chaudhari",
        github: "https://github.com/vvcvivek",
      },
    ].map((member, i) => (
      <div id={`dev-card-${i}`} className="dev-card" key={i}>
        <img src={member.img} alt={member.name} id="dev-photo" />
        <h3 id="dev-name">{member.name}</h3>
        <div id="dev-links">
          <a
            id="dev-linkedin"
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              id="dev-icon"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn"
            />
            LinkedIn
          </a>
          <a
            id="dev-github"
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              id="dev-icon"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
            />
            GitHub
          </a>
        </div>
      </div>
    ))}
  </div>
</div>




            {/* Footer Start */}
           <footer className="main-footer">
  <div className="container">
    <div className="row">
      {/* Logo and Title */}
      <div className="col-lg-4 col-md-6">
        <div className="footer-brand">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            alt="Logo"
            className="footer-logo-img"
          />
          
          <p className="footer-tagline">
            Empowering democracy through blockchain-based transparency, security, and trust.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="col-lg-2 col-md-6">
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Contact Info */}
      <div className="col-lg-3 col-md-6">
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> Maharashtra, India</li>
            <li><i className="fas fa-envelope"></i> xyz@gmail.com</li>
            <li><i className="fas fa-phone-alt"></i> +91 1234567890</li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="col-lg-3 col-md-6">
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="mailto:support@votechain.in">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Footer bottom */}
  <div className="footer-bottom">
    <div className="container">
      <p>© {new Date().getFullYear()} VoteChain | All Rights Reserved</p>
    </div>
  </div>
</footer>

            {/* Footer End */}
          </div>
        );
      };



      export default App;
