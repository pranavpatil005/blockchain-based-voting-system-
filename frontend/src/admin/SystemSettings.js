// import React, { useState } from 'react';
// import '../css/SystemSettings.css';

// const SystemSettings = () => {
//   const [settings, setSettings] = useState({
//     registrationDeadline: '2025-08-01',
//     votingDuration: '24',
//     enableEmailNotifications: true,
//     enableTwoFactor: false
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSettings(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSave = () => {
//     alert('Settings saved successfully!');
//     console.log('Saved settings:', settings);
//   };

//   return (
//     <div className="settings-container">
//       <h2>System Settings</h2>

//       <div className="form-group">
//         <label>Registration Deadline</label>
//         <input
//           type="date"
//           name="registrationDeadline"
//           value={settings.registrationDeadline}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Voting Duration (hours)</label>
//         <input
//           type="number"
//           name="votingDuration"
//           value={settings.votingDuration}
//           onChange={handleChange}
//           min="1"
//           max="72"
//         />
//       </div>

//       <div className="form-group checkbox-group">
//         <label>
//           <input
//             type="checkbox"
//             name="enableEmailNotifications"
//             checked={settings.enableEmailNotifications}
//             onChange={handleChange}
//           />
//           Enable Email Notifications
//         </label>
//       </div>

//       <div className="form-group checkbox-group">
//         <label>
//           <input
//             type="checkbox"
//             name="enableTwoFactor"
//             checked={settings.enableTwoFactor}
//             onChange={handleChange}
//           />
//           Enable Two-Factor Authentication
//         </label>
//       </div>

//       <button className="save-btn" onClick={handleSave}>
//         Save Settings
//       </button>
//     </div>
//   );
// };

// export default SystemSettings;
import React, { useState, useEffect } from "react";
import "../css/SystemSettings.css";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    registrationDeadline: "2025-08-01",
    votingDeadline: "2025-08-02",
    votingDuration: 24,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enableTwoFactor: false,
    darkMode: false
  });

  const [saveMessage, setSaveMessage] = useState("");
  const [registrationProgress, setRegistrationProgress] = useState(0);
  const [votingCountdown, setVotingCountdown] = useState("");

  // Stats
  const [stats, setStats] = useState({
    totalVoters: 0,
    votesCast: 0,
    activeElections: 0
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Save settings
  const handleSave = () => {
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
    console.log("Saved settings:", settings);
  };

  // Countdown for voting & stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(settings.votingDeadline);
      const diff = end - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setVotingCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setVotingCountdown("Voting Ended");
      }

      // Simulate registration progress and stats
      const progress = Math.min(100, Math.floor(Math.random() * 80 + 20));
      setRegistrationProgress(progress);

      setStats({
        totalVoters: Math.min(1000, stats.totalVoters + Math.floor(Math.random() * 5)),
        votesCast: Math.min(500, stats.votesCast + Math.floor(Math.random() * 3)),
        activeElections: 1
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.votingDeadline, stats.totalVoters, stats.votesCast]);

  return (
    <div className={`settings-container ${settings.darkMode ? "dark-mode" : ""}`}>
      <h2>System Settings</h2>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card total-voters">
          <h3>Total Registered Voters</h3>
          <p>{stats.totalVoters}</p>
        </div>
        <div className="card votes-cast">
          <h3>Votes Cast</h3>
          <p>{stats.votesCast}</p>
        </div>
        <div className="card active-elections">
          <h3>Active Elections</h3>
          <p>{stats.activeElections}</p>
        </div>
      </div>

      {/* Registration Deadline */}
      <div className="form-group">
        <label>Registration Deadline</label>
        <input
          type="date"
          name="registrationDeadline"
          value={settings.registrationDeadline}
          onChange={handleChange}
        />
        <div className="progress-bar">
          <div className="fill" style={{ width: `${registrationProgress}%` }}>
            {registrationProgress}%
          </div>
        </div>
      </div>

      {/* Voting Deadline */}
      <div className="form-group">
        <label>Voting Deadline</label>
        <input
          type="date"
          name="votingDeadline"
          value={settings.votingDeadline}
          onChange={handleChange}
        />
        <p className="countdown">Time left: {votingCountdown}</p>
      </div>

      {/* Voting Duration */}
      <div className="form-group">
        <label>Voting Duration (hours)</label>
        <input
          type="number"
          name="votingDuration"
          value={settings.votingDuration}
          onChange={handleChange}
          min="1"
          max="72"
        />
      </div>

      {/* Notifications */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="enableEmailNotifications"
            checked={settings.enableEmailNotifications}
            onChange={handleChange}
          />
          Enable Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="enableSMSNotifications"
            checked={settings.enableSMSNotifications}
            onChange={handleChange}
          />
          Enable SMS Notifications
        </label>
      </div>

      {/* Two-Factor */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="enableTwoFactor"
            checked={settings.enableTwoFactor}
            onChange={handleChange}
          />
          Enable Two-Factor Authentication
        </label>
      </div>

      {/* Dark Mode */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
          Dark Mode
        </label>
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Settings
      </button>
      {saveMessage && <p className="save-message">{saveMessage}</p>}
    </div>
  );
};

export default SystemSettings;

