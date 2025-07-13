import React, { useState } from 'react';
import '../css/AdminLogin.css'; // reuse same CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ message: '', color: '' }); // toast state
  const navigate = useNavigate();

  const showToast = (message, color) => {
    setToast({ message, color });
    setTimeout(() => setToast({ message: '', color: '' }), 5000); // auto hide
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast('Please fill in all fields', 'red');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin-signup', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        showToast('✅ Account created successfully!', 'green');
        setTimeout(() => navigate('/adminlogin'), 1000); // redirect after success
      } else {
        showToast('❌ Signup failed', 'red');
      }
    } catch (err) {
      console.error('Signup error:', err);
      showToast(err.response?.data?.message || '❌ Signup failed', 'red');
    }
  };

  return (
    <div className="login-container">
      {/* Toast */}
      {toast.message && (
        <div
          className="toast"
          style={{ backgroundColor: toast.color === 'green' ? '#4caf50' : '#e74c3c' }}
        >
          {toast.message}
        </div>
      )}

      <div className="login-card">
        <div className="icon-container">
          <span className="icon-shield">🛡️</span>
        </div>
        <h2>Admin Signup</h2>
        <p className="subtitle">Enter your name, email, and password to register</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button type="submit" style={{ backgroundColor: 'rgb(40, 163, 182)' }}>Sign Up</button>
        </form>

        <p className="subtitle">
          Already have an account? <a href="/adminlogin">Login</a> here
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
