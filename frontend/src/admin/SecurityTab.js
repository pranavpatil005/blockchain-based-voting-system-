import React from 'react';
import '../css/Tabs.css';

const SecurityTab = () => (
  <div className="tab-security">
    <div className="tab-header">
      <h3>Security & Audit</h3>
      <div className="actions-right">
        <button className="export-btn">Export Report</button>
        <button className="audit-btn">Run Audit</button>
      </div>
    </div>

    <div className="stats-cards">
      <div className="card"><h4>Security Score</h4><p>94/100<br/><span>Excellent</span></p></div>
      <div className="card"><h4>Active Vulnerabilities</h4><p>1<br/><span>Critical & High</span></p></div>
      <div className="card"><h4>Contracts Audited</h4><p>12<br/><span>Last: 2024‑01‑20</span></p></div>
      <div className="card"><h4>Compliance Score</h4><p>98%<br/><span>Regulatory compliance</span></p></div>
    </div>

    <h4>Vulnerability Assessment</h4>
    <div className="vuln-levels">
      <div>Critical: 0</div><div>High: 1</div><div>Medium: 3</div><div>Low: 7</div>
    </div>

    <h4>Smart Contract Security</h4>
    <table>
      <thead><tr><th>Name</th><th>Address</th><th>Version</th><th>Status</th><th>Vulns</th><th>Gas Opt</th><th>Last Audit</th><th>Actions</th></tr></thead>
      <tbody>
        <tr><td>VotingCore</td><td>0x742d…3b8D4</td><td>v2.1.0</td><td>secure</td><td>0</td><td>95%</td><td>2024‑01‑15</td><td><button>View</button><button>Audit</button></td></tr>
        {/* more rows */}
      </tbody>
    </table>

    <h4>Security Event Log</h4>
    <ul className="event-log">
      <li>
        <div className="log-icon">⚠️</div>
        <div>
          <p><strong>Suspicious voting pattern detected</strong><br/>Multiple votes from similar IP ranges in Presidential Election</p>
          <small>medium · 2024-01-25 14:30:15 · investigating</small>
        </div>
      </li>
      {/* more logs */}
    </ul>
  </div>
);

export default SecurityTab;
