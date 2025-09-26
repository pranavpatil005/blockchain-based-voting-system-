// src/App.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();
  const [activeElection, setActiveElection] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const handleLogin = () => navigate("/voterlogin");

  const calculateTimeLeft = (endDate) => {
  const now = new Date();
  const end = new Date(endDate + 'T23:59:59'); // consider endDate till 23:59:59
  const difference = end.getTime() - now.getTime();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
};


  useEffect(() => {
  axios.get("http://localhost:5000/api/active-election-candidates")
    .then(res => {
      if (res.data.success) {
        setActiveElection({
          name: res.data.electionName,
          from_date: res.data.from_date,
          to_date: res.data.to_date,
          candidates: res.data.candidates
        });
        setTimeLeft(calculateTimeLeft(res.data.to_date));
      } else {
        setActiveElection(null);
        setTimeLeft(null);
      }
    })
    .catch(() => {
      setActiveElection(null);
      setTimeLeft(null);
    });
}, []);

  // Timer update
  useEffect(() => {
    if (!activeElection) return;

    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft(activeElection.to_date);
      setTimeLeft(updatedTime);

      if (!updatedTime) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeElection]);

  
  return (
    <div>
      {/* Header Start */}
      <header className="main-header" style={{ marginTop: '3300px' }}>
        <div className="header-sticky">
          <nav className="navbar navbar-expand-lg">
            <div
              className="container"
              style={{ display: 'flex', alignItems: 'center', height: '250px' }}
            >
              {/* Logo Left */}
              <a className="navbar-brand" href="#">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                  alt="Logo"
                  style={{ width: '150px', height: '50px' }} // adjust as needed
                />

              </a>

              {/* Spacer */}
              <div style={{ flex: 1 }}></div>

              {/* Connect Wallet Button Right */}


              <div className="navbar-toggle"></div>
            </div>
            <div className="header-btn">
              <a href="donation.html" className="btn-default" >
                Connect Wallet
              </a>
              <a onClick={handleLogin} className="btn-default" style={{ marginLeft: '8px', cursor: 'pointer' }} >
                Register to Vote
              </a>


            </div>
          </nav>
          <div className="responsive-menu"></div>
        </div>
      </header>
      {/* Header End */}
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright-text">
                BLOCKCHAIN BASED E-VOTING SYSTEM
              </div>
            </div>
          </div>
        </div>
      </div>

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
                      marginBottom: '50px'
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
                <div className="header-btn">
                  <a onClick={handleLogin} class="btn-default btn-highlighted">Register to Vote</a>
                </div>
                <div>
                  {/* Election Status */}
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    {activeElection && timeLeft ? (
                      <>
                        <p style={{
                          color: '#27ae60',
                          fontWeight: 'bold',
                          fontSize: '22px',
                          letterSpacing: '1px',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}>
                          🚨 ELECTION ONGOING 🚨
                        </p>

                        {/* Countdown Timer */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
                          {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{String(value).padStart(2, '0')}</div>
                              <div>{unit.toUpperCase()}</div>
                            </div>
                          ))}
                        </div>

                        {/* Vote Button */}
                        <div style={{ marginTop: '15px' }}>
                          <button className="btn-primary" onClick={() => navigate("/castvote")}>Vote Now</button>
                        </div>
                      </>
                    ) : (
                      <p style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '22px',
                        letterSpacing: '1px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                      }}>
                        ELECTION ENDED
                      </p>
                    )}
                  </div>
                </div>





                <span
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => {
                    const element = document.getElementById("resultsSection");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  See Results!
                </span>




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
                {/* Section Title Start */}
                <div className="section-title dark-section">
                  {/* <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Results are <span>Not Declared  </span>yet
                  </h2> */}
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Winner is <br></br><span>Durvankur Sonar  </span>
                  </h2>
                </div>

              </div>
              {/* Supporters Content End */}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              {/* Supporters Counter List Start */}
              <div className="supporters-counter-list">
                <div className="supporters-counter-item">
                  <img src="images/icon-supporter-1.svg" alt="" />
                  <h2><span className="counter">501</span></h2>
                  <p>Durvankur Sonar</p>
                </div>
                <div className="supporters-counter-item">
                  <img src="images/icon-supporter-2.svg" alt="" />
                  <h2><span className="counter">131</span></h2>
                  <p>Pranav Patil</p>
                </div>
                <div className="supporters-counter-item">
                  <img src="images/icon-supporter-3.svg" alt="" />
                  <h2><span className="counter">612</span></h2>
                  <p>Liji Varghese</p>
                </div>
                <div className="supporters-counter-item">
                  <img src="images/icon-supporter-4.svg" alt="" />
                  <h2><span className="counter">400</span></h2>
                  <p>Nikita Kurkure</p>
                </div>

              </div>
              {/* Supporters Counter List End */}
            </div>
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

            <div className="col-lg-3 col-md-4">
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
            <div className="col-lg-2 col-md-2">

            </div>

            <div className="col-lg-2 col-md-2">
              <div className="footer-links">
                <h3>Developed By :</h3>
              </div>
            </div>

            <div className="col-lg-3 col-md-4">
              <div className="footer-links">


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
