import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'; // ✅ Import UserAuthContext
import '../css/VoterLogin.css';

const VoterLogin = () => {
  const [aadhar, setAadhar] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const { userLogin } = useUserAuth(); // ✅ Get userLogin from context

  const showToastMessage = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleSendOtp = () => {
    if (!aadhar) {
      showToastMessage('Please enter your Aadhar number', 'error');
      return;
    }
    const randomOtp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(String(randomOtp));
    setOtpSent(true);
    showToastMessage('OTP sent to your mobile number registered on Aadhar card', 'success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aadhar || !otp) {
      showToastMessage('Please fill in all fields', 'error');
      return;
    }
    if (otp !== generatedOtp) {
      showToastMessage('Invalid OTP. Please try again.', 'error');
      return;
    }
    // ✅ Set user as logged in
    userLogin();
    showToastMessage('Login Successful!', 'success');
    setTimeout(() => {
      navigate('/voter'); // Redirect to voter dashboard
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon-container">
          <span className="icon-shield">🛡️</span>
        </div>
        <h2>Secure Voter Login</h2>
        <p className="subtitle">Enter your Aadhar number and OTP to login</p>

        {generatedOtp && (
          <p style={{ color: '#333', fontWeight: 'bold' }}>
            Your OTP (for testing): {generatedOtp}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="aadhar">Aadhar Number</label>
          <input
            type="text"
            id="aadhar"
            placeholder="Enter your Aadhar number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={otpSent}
            style={{ marginBottom: '1rem', backgroundColor: 'rgb(40, 163, 182)' }}
          >
            {otpSent ? 'OTP Sent' : 'Send OTP'}
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

          <button
            type="submit"
            style={{ backgroundColor: 'rgb(40, 163, 182)' }}
            disabled={!otpSent}
          >
            Login
          </button>
        </form>

        {/* Toast message */}
        {showToast && (
          <div
            className="toast"
            style={{
              backgroundColor: toastType === 'success' ? '#4caf50' : '#e74c3c',
            }}
          >
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterLogin;
