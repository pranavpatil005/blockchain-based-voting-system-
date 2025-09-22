// import React from 'react';
// import '../css/AuditLogs.css';

// const AuditLogs = () => {
//   // Dummy log data for demonstration
//   const logs = [
//     {
//       timestamp: '2025-07-16 10:45:12',
//       user: 'Admin',
//       action: 'Created new election: "Presidential 2025"'
//     },
//     {
//       timestamp: '2025-07-16 09:30:55',
//       user: 'Admin',
//       action: 'Updated candidate list for "State Assembly 2025"'
//     },
//     {
//       timestamp: '2025-07-15 18:22:01',
//       user: 'Admin',
//       action: 'Viewed blockchain explorer'
//     },
//     {
//       timestamp: '2025-07-15 15:11:48',
//       user: 'Admin',
//       action: 'Accessed system settings'
//     },
//     {
//       timestamp: '2025-07-14 12:08:26',
//       user: 'Admin',
//       action: 'Logged in to admin panel'
//     }
//   ];

//   return (
//     <div className="audit-log-container">
//       <h2>System Audit Logs</h2>
//       <p className="subtitle">Real-time record of all administrative actions and events</p>

//       <table className="audit-log-table">
//         <thead>
//           <tr>
//             <th>Timestamp</th>
//             <th>User</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log, index) => (
//             <tr key={index}>
//               <td>{log.timestamp}</td>
//               <td>{log.user}</td>
//               <td>{log.action}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AuditLogs;
import React, { useEffect, useState } from "react";
import "../css/AuditLogs.css";
import confetti from "canvas-confetti";

const logTypes = ["All", "Login", "Election", "Candidate", "System", "Blockchain"];

const initialLogs = [
  { timestamp: "2025-07-16 10:45:12", user: "Admin", action: 'Created new election: "Presidential 2025"', type: "Election" },
  { timestamp: "2025-07-16 09:30:55", user: "Admin", action: 'Updated candidate list for "State Assembly 2025"', type: "Candidate" },
  { timestamp: "2025-07-15 18:22:01", user: "Admin", action: "Viewed blockchain explorer", type: "Blockchain" },
  { timestamp: "2025-07-15 15:11:48", user: "Admin", action: "Accessed system settings", type: "System" },
  { timestamp: "2025-07-14 12:08:26", user: "Admin", action: "Logged in to admin panel", type: "Login" }
];

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Simulate live log streaming
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < initialLogs.length) {
        const newLog = { ...initialLogs[index] };
        setLogs(prev => [newLog, ...prev]);
        if (newLog.type === "Election") {
          confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => 
    (filter === "All" || log.type === filter) &&
    (log.user.toLowerCase().includes(search.toLowerCase()) || log.action.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="audit-log-container">
      <h2>System Audit Logs</h2>
      <p className="subtitle">Real-time record of all administrative actions</p>

      <div className="controls">
        <div className="filter-buttons">
          {logTypes.map(type => (
            <button 
              key={type} 
              className={filter === type ? "active" : ""} 
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-wrapper">
        <table className="audit-log-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => (
              <tr key={index} className="fade-in">
                <td>{log.timestamp}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
