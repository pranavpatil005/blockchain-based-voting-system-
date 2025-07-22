import React, { useState } from 'react';
import '../css/SmartContractControl.css';

const SmartContractControl = () => {
  const [status, setStatus] = useState('Not Deployed');

  const deployContract = () => {
    // Simulate deploying contract
    setStatus('Deploying...');
    setTimeout(() => {
      setStatus('Deployed Successfully');
    }, 2000);
  };

  const resetContract = () => {
    // Simulate resetting contract
    setStatus('Resetting...');
    setTimeout(() => {
      setStatus('Not Deployed');
    }, 2000);
  };

  return (
    <div className="contract-control-container">
      <h2>Smart Contract Control Panel</h2>
      <p><strong>Status:</strong> <span className={`status ${status.replace(/\s+/g, '-').toLowerCase()}`}>{status}</span></p>
      
      <div className="button-group">
        <button onClick={deployContract} className="deploy-btn">Deploy Contract</button>
        <button onClick={resetContract} className="reset-btn">Reset Contract</button>
      </div>
    </div>
  );
};

export default SmartContractControl;