import React from 'react';
import '../css/Tabs.css';

const DashboardTab = () => (
  <div className="tab-dashboard">
    <div className="overview-cards">
      <div className="card">
        <h2>Total Elections</h2><p>12<br/><span>+2 from last month</span></p>
      </div>
      <div className="card">
        <h2>Registered Voters</h2><p>15,420<br/><span>+180 this week</span></p>
      </div>
      <div className="card">
        <h2>Total Votes Cast</h2><p>8,934<br/><span>58% turnout rate</span></p>
      </div>
      <div className="card">
        <h2>Network Status</h2><p className="healthy">Healthy<br/><span>Last block: 2 minutes ago</span></p>
      </div>
    </div>

    <div className="active-elections">
      <h3>Active Elections</h3>
      <div className="election">
        <div>
          <h4>Presidential Election 2024 <span className="status">active</span></h4>
          <p>2024-01-15 – 2024-01-30 | 5,420 votes | 63.8% turnout</p>
        </div>
        <div className="progress-bar">
          <div style={{width: '63.8%'}} />
        </div>
        <div className="actions">
          <button>View</button><button>Manage</button>
        </div>
      </div>
      {/* Add additional election entries here */}
    </div>

    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <ul>
        <li><span>✔️</span> Block #1,234,567 mined successfully <small>2 minutes ago</small></li>
        <li><span>📩</span> 1,247 votes cast in Presidential Election 2024 <small>5 minutes ago</small></li>
        <li><span>👤</span> 23 new voters registered <small>1 hour ago</small></li>
        <li><span>⚠️</span> Network congestion detected – resolved <small>3 hours ago</small></li>
      </ul>
    </div>
  </div>
);

export default DashboardTab;
