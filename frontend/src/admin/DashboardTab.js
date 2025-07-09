import React from 'react';
import '../css/Tabs.css';

const DashboardTab = () => (
  <div className="tab-dashboard">
    {/* Overview Cards */}
    <div className="overview-cards">
      <div className="card">
        <h4>Total Elections</h4>
        <p>12<br /><span>+2 from last month</span></p>
      </div>
      <div className="card">
        <h4>Registered Voters</h4>
        <p>15,420<br /><span>+180 this week</span></p>
      </div>
      <div className="card">
        <h4>Total Votes Cast</h4>
        <p>8,934<br /><span>58% turnout rate</span></p>
      </div>
      <div className="card">
        <h4>Network Status</h4>
        <p className="healthy">Healthy<br /><span>Last block: 2 minutes ago</span></p>
      </div>
    </div>

    {/* Active Elections Section */}
    <div className="active-elections">
      <h3>Active Elections</h3>
      <p>Currently running and upcoming elections</p>

      <div className="election">
        <div>
          <h4>Presidential Election 2024 <span className="status active">active</span></h4>
          <p>2024-01-15 – 2024-01-30</p>
          <p>5,420 votes &nbsp; | &nbsp; 63.8% turnout</p>
        </div>
        <div className="progress-bar"><div style={{ width: '63.8%' }} /></div>
        <div className="actions">
          <button>View</button>
          <button>Manage</button>
        </div>
      </div>

      <div className="election">
        <div>
          <h4>City Council Election <span className="status active">active</span></h4>
          <p>2024-01-20 – 2024-02-05</p>
          <p>2,314 votes &nbsp; | &nbsp; 55.1% turnout</p>
        </div>
        <div className="progress-bar"><div style={{ width: '55.1%' }} /></div>
        <div className="actions">
          <button>View</button>
          <button>Manage</button>
        </div>
      </div>

      <div className="election">
        <div>
          <h4>School Board Election <span className="status pending">pending</span></h4>
          <p>2024-02-01 – 2024-02-15</p>
          <p>0 votes &nbsp; | &nbsp; 0% turnout</p>
        </div>
        <div className="progress-bar"><div style={{ width: '0%' }} /></div>
        <div className="actions">
          <button>View</button>
          <button>Manage</button>
        </div>
      </div>
    </div>

    {/* Recent Activity Section */}
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <p>Latest blockchain transactions and system events</p>
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
