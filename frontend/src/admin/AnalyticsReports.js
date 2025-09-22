import React, { useEffect, useState } from "react";
import "../css/AnalyticsReports.css";
import confetti from "canvas-confetti";

const AnalyticsReports = () => {
  const initialData = {
    totalVoters: 1200,
    votesCast: 980,
    turnoutPercentage: ((980 / 1200) * 100).toFixed(2),
    activeElections: 2,
    candidatesParticipated: 24
  };

  const [data, setData] = useState({
    totalVoters: 0,
    votesCast: 0,
    turnoutPercentage: 0,
    activeElections: 0,
    candidatesParticipated: 0
  });

  useEffect(() => {
    const duration = 1000;
    const steps = 50;
    let currentStep = 0;

    const animate = setInterval(() => {
      currentStep++;
      setData({
        totalVoters: Math.floor((initialData.totalVoters / steps) * currentStep),
        votesCast: Math.floor((initialData.votesCast / steps) * currentStep),
        turnoutPercentage: ((initialData.turnoutPercentage / steps) * currentStep).toFixed(2),
        activeElections: Math.floor((initialData.activeElections / steps) * currentStep),
        candidatesParticipated: Math.floor((initialData.candidatesParticipated / steps) * currentStep)
      });

      // Confetti if votesCast crosses 900
      if (currentStep === steps && initialData.votesCast > 900) {
        confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
      }

      if (currentStep >= steps) clearInterval(animate);
    }, duration / steps);
  }, []);

  // Tilt effect for cards
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    card.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg) scale(1.05)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div className="analytics-container">
      <h2>Analytics & Reports</h2>

      <div className="analytics-cards">
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h3>Total Registered Voters</h3>
          <p>{data.totalVoters}</p>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h3>Total Votes Cast</h3>
          <p>{data.votesCast}</p>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h3>Voter Turnout</h3>
          <p>{data.turnoutPercentage}%</p>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${data.turnoutPercentage}%` }}></div>
          </div>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h3>Active Elections</h3>
          <p>{data.activeElections}</p>
        </div>
        <div className="card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <h3>Candidates Participated</h3>
          <p>{data.candidatesParticipated}</p>
        </div>
      </div>

      <div className="report-section">
        <h3>System Report Summary</h3>
        <p>
          The voting system is fully operational with secure, tamper-proof
          blockchain records. Interactive dashboards with animated analytics
          ensure transparency and real-time insights.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsReports;
