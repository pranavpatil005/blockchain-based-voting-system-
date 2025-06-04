import React, { useState } from 'react';
import '../css/VoterLogin.css';

const VoterLogin = () => {
  const [aadhar, setAadhar] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOtp = () => {
    if (!aadhar) {
      setError('Please enter your Aadhar number');
      setSuccess('');
      return;
    }
    setError('');
    setOtpSent(true);
    setSuccess('');
    alert('OTP sent to your registered email id'); // popup message
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aadhar || !otp) {
      setError('Please fill in all fields');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('Login Successful!');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon-container">
          <span className="icon-shield">🛡️</span>
        </div>
        <h2>Secure Voter Login</h2>
        <p className="subtitle">Enter your Aadhar number and OTP to login</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="aadhar">Aadhar Number</label>
          <input
            type="text"
            id="aadhar"
            placeholder="Enter your Aadhar number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
          />
          <button type="button" onClick={handleSendOtp} disabled={otpSent} style={{ marginBottom: '1rem' }}>
            Send OTP
          </button>

          {otpSent && (
            <>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}

          <button type="submit" disabled={!otpSent}>Login</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
      </div>
    </div>
  );
};

export default VoterLogin;
