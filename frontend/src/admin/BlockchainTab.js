import React from 'react';
import '../css/Tabs.css';

const BlockchainTab = () => (
  <div className="tab-blockchain">
    <h3>Blockchain Monitor</h3>
    <div className="stats-cards">
      <div className="card"><h4>Block Height</h4><p>1,234,567</p></div>
      <div className="card"><h4>Network Hash Rate</h4><p>2.5 TH/s</p></div>
      <div className="card"><h4>Active Nodes</h4><p>8,542</p></div>
      <div className="card"><h4>Avg Block Time</h4><p>12.3 s</p></div>
    </div>

    <div className="health-summary">
      <p>Network Health Score</p><div className="progress-bar"><div style={{width: '98.7%'}} /></div>
      <ul>
        <li>Consensus Algorithm: Proof of Stake</li>
        <li>Pending Transactions: 1,247</li>
        <li>Gas Price: 20 Gwei</li>
        <li>TPS (Current): 847</li>
        <li>Block Size Limit: 2 MB</li>
      </ul>
    </div>

    <h4>Recent Blocks</h4>
    <table>
      <thead><tr><th>Height</th><th>Hash</th><th>Time</th><th>Txns</th><th>Validator</th><th>Gas Used</th><th>Size</th></tr></thead>
      <tbody>
        <tr><td>1,234,567</td><td>0x7f9f…1385</td><td>2024‑01‑25 14:32:15</td><td>247</td><td>0x742d…8D4</td><td>8,234,567</td><td>1.2 MB</td></tr>
        <tr><td>1,234,566</td><td>0x8a1b…4396</td><td>2024‑01‑25 14:32:03</td><td>189</td><td>0x8D4C…Cc66</td><td>6,789,123</td><td>0.9 MB</td></tr>
        {/* more rows */}
      </tbody>
    </table>

    <h4>Recent Voting Transactions</h4>
    <table>
      <thead><tr><th>Txn Hash</th><th>Type</th><th>From</th><th>Election</th><th>Time</th><th>Status</th><th>Gas Used</th></tr></thead>
      <tbody>
        <tr><td>0xa1b2…3456</td><td>Vote Cast</td><td>0x742d…8D4</td><td>Presidential Election 2024</td><td>2024‑01‑25 14:32:45</td><td className="status confirmed">confirmed</td><td>21,000</td></tr>
        {/* more rows */}
      </tbody>
    </table>
  </div>
);

export default BlockchainTab;
