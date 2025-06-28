import React from 'react';
import '../css/Tabs.css';

const VotersTab = () => (
  <div className="tab-voters">
    <div className="tab-header">
      <h3>Voter Management</h3>
      <button className="create-btn">+ Add Voter</button>
    </div>

    <div className="stats-cards">
      <div className="card"><h4>Total Voters</h4><p>15,420<br/><span>+180 this week</span></p></div>
      <div className="card"><h4>Verified</h4><p>14,892<br/><span>96.6% of total</span></p></div>
      <div className="card"><h4>Pending</h4><p>485</p></div>
      <div className="card"><h4>Suspended</h4><p>43</p></div>
    </div>

    <div className="voter-table">
      <table>
        <thead>
          <tr><th>Email</th><th>Wallet</th><th>Status</th><th>Reg Date</th><th>History</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>john.doe@example.com</td><td>0x742d…8D4</td><td className="status verified">verified</td>
            <td>2024-01-10</td><td>3 elections</td><td><button>View</button></td>
          </tr>
          <tr>
            <td>bob.johnson@example.com</td><td>0x925a…0532</td><td className="status pending">pending</td>
            <td>2024-01-15</td><td>0 elections</td><td><button>View</button><button>Verify</button></td>
          </tr>
          {/* Repeat similar rows */}
        </tbody>
      </table>
    </div>
  </div>
);

export default VotersTab;
