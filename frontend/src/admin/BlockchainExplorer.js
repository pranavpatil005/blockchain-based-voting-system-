// import React, { useEffect, useState } from 'react';
// import '../css/BlockchainExplorer.css';

// const BlockchainExplorer = () => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     // Simulated blockchain data
//     setTimeout(() => {
//       setTransactions([
//         {
//           hash: '0xabc123',
//           from: '0x1a2b3c...',
//           to: '0x4d5e6f...',
//           action: 'Vote Casted',
//           timestamp: '2025-07-17 14:32:10'
//         },
//         {
//           hash: '0xdef456',
//           from: '0xaaa111...',
//           to: '0xbbb222...',
//           action: 'Election Created',
//           timestamp: '2025-07-17 13:10:54'
//         },
//         {
//           hash: '0xghi789',
//           from: '0x333ccc...',
//           to: '0x444ddd...',
//           action: 'Smart Contract Deployed',
//           timestamp: '2025-07-17 11:45:01'
//         }
//       ]);
//     }, 1000);
//   }, []);

//   return (
//     <div className="explorer-container">
//       <h2>Blockchain Explorer</h2>
//       <p className="note">Track transactions recorded on the blockchain</p>

//       {transactions.length > 0 ? (
//         <table className="explorer-table">
//           <thead>
//             <tr>
//               <th>Tx Hash</th>
//               <th>From</th>
//               <th>To</th>
//               <th>Action</th>
//               <th>Timestamp</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((tx, index) => (
//               <tr key={index}>
//                 <td>{tx.hash}</td>
//                 <td>{tx.from}</td>
//                 <td>{tx.to}</td>
//                 <td>{tx.action}</td>
//                 <td>{tx.timestamp}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="loading">Fetching blockchain transactions...</p>
//       )}
//     </div>
//   );
// };

// export default BlockchainExplorer;
import React, { useEffect, useState } from "react";
import "../css/BlockchainExplorer.css";

const BlockchainExplorer = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const initialTx = [
      { hash: "0xabc123", from: "0x1a2b3c...", to: "0x4d5e6f...", action: "Vote Casted", timestamp: "2025-07-17 14:32:10", status: "Confirmed" },
      { hash: "0xdef456", from: "0xaaa111...", to: "0xbbb222...", action: "Election Created", timestamp: "2025-07-17 13:10:54", status: "Confirmed" },
      { hash: "0xghi789", from: "0x333ccc...", to: "0x444ddd...", action: "Smart Contract Deployed", timestamp: "2025-07-17 11:45:01", status: "Pending" }
    ];
    setTransactions(initialTx);

    const interval = setInterval(() => {
      const newTx = {
        hash: "0x" + Math.random().toString(36).substring(2, 10),
        from: "0x" + Math.random().toString(36).substring(2, 6) + "...",
        to: "0x" + Math.random().toString(36).substring(2, 6) + "...",
        action: ["Vote Casted", "Election Created", "Smart Contract Deployed"][Math.floor(Math.random() * 3)],
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        status: ["Confirmed", "Pending", "Failed"][Math.floor(Math.random() * 3)]
      };
      setTransactions(prev => [newTx, ...prev]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredTx = transactions.filter(tx => 
    (filter === "All" || tx.status === filter) &&
    (tx.hash.toLowerCase().includes(search.toLowerCase()) ||
     tx.from.toLowerCase().includes(search.toLowerCase()) ||
     tx.to.toLowerCase().includes(search.toLowerCase()) ||
     tx.action.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="explorer-container">
      <h2>Blockchain Explorer</h2>
      <p className="note">Track transactions recorded on the blockchain in real-time</p>

      {/* 3D Blockchain Visual */}
      <div className="blockchain-3d">
        <div className="chain">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="block">
              <span>Block #{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by hash, from, to, action..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Transaction Table */}
      {filteredTx.length > 0 ? (
        <table className="explorer-table">
          <thead>
            <tr>
              <th>Tx Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTx.map((tx, index) => (
              <tr key={index} className="transaction-row">
                <td title={tx.hash}>{tx.hash}</td>
                <td title={tx.from}>{tx.from}</td>
                <td title={tx.to}>{tx.to}</td>
                <td>{tx.action}</td>
                <td>{tx.timestamp}</td>
                <td>
                  <span className={`status-badge ${tx.status.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </td>
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
