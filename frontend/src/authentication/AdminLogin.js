import React, { useEffect } from 'react';
import '../css/AdminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useSessionState from '../hooks/useSessionState';

const AdminLogin = () => {
  const [email, setEmail, clearEmail] = useSessionState('admin_email', '');
  const [password, setPassword, clearPassword] = useSessionState('admin_password', '');
  
  const [toastMsg, setToastMsg] = useSessionState('admin_toast_msg', '');
  const [toastType, setToastType] = useSessionState('admin_toast_type', 'success');
  const [showToast, setShowToast] = useSessionState('admin_show_toast', false);

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Clear any leftover toast on mount
  useEffect(() => {
    setShowToast(false);
    setToastMsg('');
    setToastType('success');
  }, []);

  const showToastMessage = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToastMessage('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/admin-login', { email, password });

      // Frontend-controlled success
      sessionStorage.setItem('admin_name', email);
      login();
      showToastMessage('✅ Login successful!', 'success');

      clearEmail();
      clearPassword();

      setTimeout(() => navigate('/admin'), 1000);
    } catch (err) {
      console.error(err);

      // Frontend decides error message regardless of backend
      if (err.response) {
        showToastMessage('❌ Invalid credentials or server error', 'error');
      } else if (err.request) {
        showToastMessage('❌ Server not responding', 'error');
      } else {
        showToastMessage('❌ Login failed', 'error');
      }
    } finally {
      setLoading(false);
    }
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

        <h2>Admin Login</h2>
        <p style={{ fontWeight: 'bold', color: '#666', marginBottom: '1.5rem' }}>
          Enter your email and password to login
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '0.5rem', fontSize: '1rem' }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '1rem', fontSize: '1rem' }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: 'rgb(40, 163, 182)', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Toast */}
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

export default AdminLogin;
