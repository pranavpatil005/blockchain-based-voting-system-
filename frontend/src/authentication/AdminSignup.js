import React, { useState } from 'react';
import '../css/AdminLogin.css'; // reusing the same styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin-signup', {
        name,
        email,
        password,
      });

      if (response.data.success) {
      setSuccess(response.data.message);
      alert('Your account has been created successfully');  
      navigate('/adminlogin');
    } else {
      setError('Signup failed');
    }
  } catch (err) {
    console.error('Signup error:', err);
    setError(err.response?.data?.message || 'Signup failed');
  }
  };

  return (
    <div className="login-container">
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

          <button type="submit">Sign Up</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <p className="subtitle">
          Already have an account <a href="/adminlogin">Login</a> here
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
