import React, { useState } from 'react';
import '../css/AdminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // <-- use useAuth hook here

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Login submitted with:', email, password);  // check inputs

  setError('');
  setSuccess('');

  if (!email || !password) {
    setError('Please fill in all fields');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/admin-login', {
      email,
      password,
    });
    console.log('Login response:', response.data);  // log entire response

    if (response.data.success) {
      setSuccess(response.data.message);

      if (response.data.name) {
        localStorage.setItem('name', response.data.name);
        console.log('Saved name to localStorage:', response.data.name);
      } else {
        console.log('No name found in response');
      }

      login();
      navigate('/welcome');
    } else {
      setError('Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError(err.response?.data?.message || 'Login failed');
  }
};



  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon-container">
          <span className="icon-shield">🛡️</span>
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

          <button type="submit">Login</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
