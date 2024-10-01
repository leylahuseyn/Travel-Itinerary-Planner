import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser && loggedInUser.username === "leylaihus@code.edu.az" && loggedInUser.password === "leyla123") {
    return children; 
  } else {
    return <Navigate to="/" />; 
  }
};

export default ProtectedRoute;
