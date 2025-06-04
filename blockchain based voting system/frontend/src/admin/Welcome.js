import React from 'react';

const Welcome = () => {
  const adminName = localStorage.getItem('name') || 'Admin';

  return (
    <div>
      <h1>Hello, {adminName}!</h1>
      <p>Welcome to the admin dashboard.</p>
    </div>
  );
};

export default Welcome;
