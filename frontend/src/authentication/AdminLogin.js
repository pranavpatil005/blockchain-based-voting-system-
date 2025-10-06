// import React, { useState } from 'react';
// import '../css/AdminLogin.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [toast, setToast] = useState({ message: '', color: '' }); // toast state
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const showToast = (message, color) => {
//     setToast({ message, color });
//     setTimeout(() => setToast({ message: '', color: '' }), 5000); // hide after 5s
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Login submitted with:', email, password);

//     if (!email || !password) {
//       showToast('Please fill in all fields', 'red');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/admin-login', {
//         email,
//         password,
//       });
//       console.log('Login response:', response.data);

//       if (response.data.success) {
//         if (response.data.name) {
//           localStorage.setItem('name', response.data.name);
//         }

//         login();
//         showToast('✅ Login successful!', 'green'); // green toast
//         setTimeout(() => navigate('/admin'), 1000); // wait before redirect
//       } else {
//         showToast('❌ Invalid credentials', 'red'); // red toast
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       showToast(err.response?.data?.message || '❌ Login failed', 'red'); // red toast
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* Toast */}
//       {toast.message && (
//         <div
//           className="toast"
//           style={{ backgroundColor: toast.color === 'green' ? '#4caf50' : '#e74c3c' }}
//         >
//           {toast.message}
//         </div>
//       )}

//       <div className="login-card">
//         <div className="icon-container">
//           <span className="icon-shield">🛡️</span>
//         </div>
//         <h2>Admin Login</h2>
//         <p className="subtitle">Enter your email and password to login</p>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">Email Address</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button type="submit" style={{ backgroundColor: 'rgb(40, 163, 182)' }}>Login</button>
//         </form>
       
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from 'react';
import '../css/AdminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ message: '', color: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const showToast = (message, color) => {
    setToast({ message, color });
    setTimeout(() => setToast({ message: '', color: '' }), 5000);
  };

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
          localStorage.setItem('name', response.data.name);
        }

        login();
        showToast('✅ Login successful!', 'green');
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
      {/* Toast Notification */}
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

      {/* Login Card */}
      <div className="login-card">
<<<<<<< HEAD
         <div style={{ marginBottom: '1rem' }}>
          <img 
            src="/assets/images/logo2.png" 
            alt="Website Logo" 
            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
=======
        {/* Website Logo */}
        <div className="logo-container">
          <img
            src="/assets/images/logo2.png"
            alt="Website Logo"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              marginBottom: '10px',
            }}
>>>>>>> e1810c0397a734366593613416d7d4c5f9b3e0fe
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
