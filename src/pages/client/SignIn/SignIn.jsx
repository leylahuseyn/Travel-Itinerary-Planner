import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../SignIn/signin.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
    const foundUser = registeredUsers.find(user => user.username === username && user.password === password);
  
    if (!foundUser) {
      alert('Invalid credentials. Please check your username and password.');
      return;
    }
  
    if (username === "leylaihus@code.edu.az" && password === "leyla123") {
      alert('Admin page login successful!');
      
      localStorage.setItem('loggedInUser', JSON.stringify({ username, password }));
      navigate('/admin/TourReservation');
      return;
    }
    localStorage.setItem('loggedInUser', JSON.stringify({ username, password }));
  
    alert('Login successful!');
    navigate('/'); 
  };
  

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <input
                type="text"
                placeholder="Username (Email)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className='button-signin' type="submit">Login</button>
          </form>
          <div className="register-link mt-3">
            Don't have an account? <Link to='/SignUp'>Register</Link>
          </div>
        </div>
        <div className='mt-5'> 
          <Link className='button-home' to='/'>Go Home</Link> 
        </div>
      </div>
    </div>
  );
};

export default SignIn;
