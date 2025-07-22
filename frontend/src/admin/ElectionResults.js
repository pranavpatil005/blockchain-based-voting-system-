import React, { useEffect, useState } from 'react';
import '../css/ElectionResults.css';

const ElectionResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Simulated data fetch
    setTimeout(() => {
      setResults([
        { name: 'Alice', votes: 320 },
        { name: 'Bob', votes: 250 },
        { name: 'Charlie', votes: 180 }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="results-container">
      <h2>Election Results</h2>
      <p className="note">Final vote count of the completed election</p>
      
      {results.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Candidate Name</th>
              <th>Total Votes</th>
            </tr>
          </thead>
          <tbody>
            {results
              .sort((a, b) => b.votes - a.votes)
              .map((candidate, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.votes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="loading">Loading results...</p>
      )}
    </div>
  );
};

export default ElectionResults;