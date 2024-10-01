import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); 
    alert('Logout successful!');
    navigate('/SignIn');
  };
  

  return (
    <div className="logout-container">
      <h2>Are you sure you want to logout?</h2>
      <button onClick={handleLogout} className="button-logout">Logout</button>
    </div>
  );
};

export default Logout;
