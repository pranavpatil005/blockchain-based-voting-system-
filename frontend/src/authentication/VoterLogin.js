import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import axios from 'axios';

const VoterLogin = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const { userLogin } = useUserAuth();

  const showToastMessage = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) setAadhaar(value);
    setOtpSent(false);
    setOtp('');
  };

  // ---------------------------
  // Send OTP
  // ---------------------------
  const handleSendOtp = async () => {
    if (aadhaar.length !== 12) {
      showToastMessage('Aadhaar number must be 12 digits', 'error');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/send-otp', { aadhaar });
      if (!res.data.success) {
        showToastMessage(res.data.message, 'error');
        return;
      }
      setOtpSent(true);
      showToastMessage('OTP sent to your registered mobile number', 'success');
    } catch (err) {
      console.error(err);
      if (err.response) {
        if (err.response.status === 404) {
          showToastMessage('You are not registered', 'error');
        } else {
          showToastMessage(err.response.data.message || 'Server error. Try again later.', 'error');
        }
      } else {
        showToastMessage('Server error. Try again later.', 'error');
      }
    }
  };

  // ---------------------------
  // Verify OTP
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aadhaar || !otp) {
      showToastMessage('Please fill in all fields', 'error');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/verify-otp', { aadhaar, otp });
      if (!res.data.success) {
        showToastMessage(res.data.message, 'error');
        return;
      }

      userLogin();
      showToastMessage('Login Successful!', 'success');
      setTimeout(() => navigate('/voter'), 1000);
    } catch (err) {
      console.error(err);
      if (err.response) {
        switch (err.response.status) {
          case 401:
            showToastMessage(err.response.data.message || 'Invalid OTP', 'error');
            break;
          case 404:
            showToastMessage('You are not registered', 'error');
            break;
          default:
            showToastMessage(err.response.data.message || 'Server error. Try again later.', 'error');
        }
      } else {
        showToastMessage('Server error. Try again later.', 'error');
      }
    }
  };

  // ---------------------------
  // JSX
  // ---------------------------
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        width: '350px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem', color: '#2c5364' }}>🛡️</span>
        </div>

        <h2>Secure Voter Login</h2>
        <p style={{ fontWeight: 'bold', color: '#666', marginBottom: '1.5rem' }}>
          Enter your Aadhaar number and OTP to login
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <label htmlFor="aadhaar">Aadhaar Number</label>
          <input
            type="text"
            id="aadhaar"
            placeholder="Enter your 12-digit Aadhaar number"
            value={aadhaar}
            onChange={handleAadhaarChange}
            maxLength="12"
            inputMode="numeric"
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '0.25rem', fontSize: '1rem' }}
          />

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={otpSent}
            style={{ marginBottom: '1rem', backgroundColor: 'rgb(40, 163, 182)', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
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
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '0.25rem', fontSize: '1rem' }}
              />
            </>
          )}

          <button
            type="submit"
            disabled={!otpSent}
            style={{ backgroundColor: 'rgb(40, 163, 182)', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Login
          </button>
        </form>

        {showToast && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: toastType === 'success' ? '#4caf50' : '#e74c3c',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '5px',
            fontWeight: 'bold',
            zIndex: 9999,
            maxWidth: '300px'
          }}>
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterLogin;
