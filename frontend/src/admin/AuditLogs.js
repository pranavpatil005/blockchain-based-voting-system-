import React from 'react';
import '../css/AuditLogs.css';

const AuditLogs = () => {
  // Dummy log data for demonstration
  const logs = [
    {
      timestamp: '2025-07-16 10:45:12',
      user: 'Admin',
      action: 'Created new election: "Presidential 2025"'
    },
    {
      timestamp: '2025-07-16 09:30:55',
      user: 'Admin',
      action: 'Updated candidate list for "State Assembly 2025"'
    },
    {
      timestamp: '2025-07-15 18:22:01',
      user: 'Admin',
      action: 'Viewed blockchain explorer'
    },
    {
      timestamp: '2025-07-15 15:11:48',
      user: 'Admin',
      action: 'Accessed system settings'
    },
    {
      timestamp: '2025-07-14 12:08:26',
      user: 'Admin',
      action: 'Logged in to admin panel'
    }
  ];

  return (
    <div className="audit-log-container">
      <h2>System Audit Logs</h2>
      <p className="subtitle">Real-time record of all administrative actions and events</p>

      <table className="audit-log-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogs;