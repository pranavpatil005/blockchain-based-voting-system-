import React, { useEffect, useState } from 'react';
import '../css/BlockchainExplorer.css';

const BlockchainExplorer = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulated blockchain data
    setTimeout(() => {
      setTransactions([
        {
          hash: '0xabc123',
          from: '0x1a2b3c...',
          to: '0x4d5e6f...',
          action: 'Vote Casted',
          timestamp: '2025-07-17 14:32:10'
        },
        {
          hash: '0xdef456',
          from: '0xaaa111...',
          to: '0xbbb222...',
          action: 'Election Created',
          timestamp: '2025-07-17 13:10:54'
        },
        {
          hash: '0xghi789',
          from: '0x333ccc...',
          to: '0x444ddd...',
          action: 'Smart Contract Deployed',
          timestamp: '2025-07-17 11:45:01'
        }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="explorer-container">
      <h2>Blockchain Explorer</h2>
      <p className="note">Track transactions recorded on the blockchain</p>

      {transactions.length > 0 ? (
        <table className="explorer-table">
          <thead>
            <tr>
              <th>Tx Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.hash}</td>
                <td>{tx.from}</td>
                <td>{tx.to}</td>
                <td>{tx.action}</td>
                <td>{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="loading">Fetching blockchain transactions...</p>
      )}
    </div>
  );
};

export default BlockchainExplorer;