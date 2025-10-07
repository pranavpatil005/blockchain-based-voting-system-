import React from 'react';
import '../css/AdminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useSessionState from '../hooks/useSessionState';

const AdminLogin = () => {
  // ✅ Replace all normal useState with useSessionState
  const [email, setEmail, clearEmail] = useSessionState('admin_email', '');
  const [password, setPassword, clearPassword] = useSessionState('admin_password', '');
  const [toast, setToast] = useSessionState('admin_toast', { message: '', color: '' });
  const [loading, setLoading, clearLoading] = useSessionState('admin_loading', false);

  const navigate = useNavigate();
  const { login } = useAuth(); // from AuthContext (for admin)

  // ✅ Toast handler
  const showToast = (message, color) => {
    setToast({ message, color });
    setTimeout(() => setToast({ message: '', color: '' }), 5000);
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast('Please fill in all fields', 'red');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/admin-login', {
        email,
        password,
      });

      if (response.data.success) {
        if (response.data.name) {
          sessionStorage.setItem('admin_name', response.data.name); // ✅ store name temporarily
        }

        login(); // ✅ mark admin as logged in (now session-persistent)
        showToast('✅ Login successful!', 'green');

        // ✅ Clear stored fields
        clearEmail();
        clearPassword();
        clearLoading();

        setTimeout(() => navigate('/admin'), 1000);
      } else {
        showToast('❌ Invalid credentials', 'red');
      }
    } catch (err) {
      console.error('Login error:', err);
      showToast(err.response?.data?.message || '❌ Login failed', 'red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* ✅ Toast Notification */}
      {toast.message && (
        <div
          className="toast"
          style={{
            backgroundColor: toast.color === 'green' ? '#4caf50' : '#e74c3c',
          }}
        >
          {toast.message}
        </div>
      )}

      {/* ✅ Login Card */}
      <div className="login-card">
        {/* Website Logo */}
        <div className="logo-container" style={{ marginBottom: '1rem' }}>
          <img
            src="/assets/images/logo2.png"
            alt="Website Logo"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              marginBottom: '10px',
            }}
          />
        </div>

        <h2>Admin Login</h2>
        <p className="subtitle">Enter your email and password to login</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: 'rgb(40, 163, 182)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
