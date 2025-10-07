import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import axios from 'axios';
import useSessionState from '../hooks/useSessionState';

const VoterLogin = () => {
  // ✅ Use session state instead of normal useState
  const [aadhaar, setAadhaar, clearAadhaar] = useSessionState('voter_aadhaar', '');
  const [otpSent, setOtpSent, clearOtpSent] = useSessionState('voter_otp_sent', false);
  const [otp, setOtp, clearOtp] = useSessionState('voter_otp', '');
  const [generatedOtp, setGeneratedOtp, clearGeneratedOtp] = useSessionState('voter_generated_otp', '');

  const [toastMsg, setToastMsg] = useSessionState('voter_toast_msg', '');
  const [toastType, setToastType] = useSessionState('voter_toast_type', 'success');
  const [showToast, setShowToast] = useSessionState('voter_show_toast', false);

  const navigate = useNavigate();
  const { userLogin } = useUserAuth();

  // ✅ Clear any leftover toast when component mounts
  useEffect(() => {
    setShowToast(false);
    setToastMsg('');
    setToastType('success');
  }, []);

  // ✅ Toast handler
  const showToastMessage = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  // ✅ Aadhaar input change
  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) setAadhaar(value);
    setOtpSent(false);
    setGeneratedOtp('');
    setOtp('');
  };

  // ✅ Send OTP request
  const handleSendOtp = async () => {
    if (aadhaar.length !== 12) {
      showToastMessage('Aadhaar number must be 12 digits', 'error');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/check-voter', { aadhaar });

      if (!res.data.success) {
        showToastMessage(res.data.message, 'error');
        return;
      }

      setGeneratedOtp(res.data.otp); // OTP from backend
      setOtpSent(true);
      showToastMessage('OTP sent (shown here for testing)', 'success');
    } catch (error) {
      console.error(error);
      showToastMessage('Server error. Try again later.', 'error');
    }
  };

  // ✅ Submit login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!aadhaar || !otp) {
      showToastMessage('Please fill in all fields', 'error');
      return;
    }

    if (otp !== generatedOtp) {
      showToastMessage('Invalid OTP. Please try again.', 'error');
      return;
    }

    userLogin();
    showToastMessage('Login Successful!', 'success');

    // ✅ Clear session storage after login
    clearAadhaar();
    clearOtpSent();
    clearOtp();
    clearGeneratedOtp();

    setTimeout(() => navigate('/voter'), 1000);
  };

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
          <img 
            src="/assets/images/logo2.png" 
            alt="Website Logo" 
            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
          />
        </div>

        <h2>Secure Voter Login</h2>
        <p style={{ fontWeight: 'bold', color: '#666', marginBottom: '1.5rem' }}>
          Enter your Aadhaar number and OTP to login
        </p>

        {/* ✅ Show OTP on screen (testing only) */}
        {generatedOtp && (
          <p style={{ color: '#333', fontWeight: 'bold' }}>
            Your OTP (for testing): {generatedOtp}
          </p>
        )}

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

        {/* ✅ Toast */}
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
