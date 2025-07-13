import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { UserAuthProvider } from './context/UserAuthContext'; // ✅ import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserAuthProvider> {/* ✅ wrap with UserAuthProvider */}
        <App />
      </UserAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
