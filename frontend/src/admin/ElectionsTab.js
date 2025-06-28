import React from 'react';
import '../css/Tabs.css';

const ElectionsTab = () => (
  <div className="tab-elections">
    <div className="tab-header">
      <h3>Election Management</h3>
      <button className="create-btn">+ Create Election</button>
    </div>

    {/* Reuse election cards as in DashboardTab, but show all elections */}
    <div className="election">
      <div>
        <h4>Presidential Election 2024 <span className="status">active</span></h4>
        <p>National presidential election for 2024</p>
        <p>Period: 2024-01-15 – 2024-01-30</p>
        <p>Voting Progress: 5,420 / 8,500 votes (63.8% turnout)</p>
        <p>Smart Contract: 0x742d…3b8D4</p>
        <div className="candidate-tags">
          <span>John Smith</span><span>Jane Doe</span><span>Bob Johnson</span>
        </div>
      </div>
      <div className="actions">
        <button>Results</button><button>Edit</button><button>Pause</button>
      </div>
    </div>

    {/* More entries for “pending” and “completed” elections */}
  </div>
);

export default ElectionsTab;
