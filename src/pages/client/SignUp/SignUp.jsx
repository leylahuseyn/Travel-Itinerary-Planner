import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../SignUp/signUp.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    return email.includes('@');
  };
  const handleRegister = (e) => {
    e.preventDefault();
  
    if (!isValidEmail(username)) {
      alert('Invalid email. Please include "@" in the email.');
      return;
    }
  
    const newUser = { username, password };
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
    if (existingUsers.some(user => user.username === username)) {
      alert('This email is already registered.');
      return;
    }
  
    
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    
    alert('Registration successful! You can now log in.');
  };
  
  
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-box">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
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
            <button className='button-signin' type="submit">Register</button>
          </form>
          <div className="register-link mt-3">
            <Link to='/SignIn'>Login</Link>
          </div>
        </div>
      <div className='mt-5'> 
          <Link className='gohome' to='/'>Go Home</Link> 
      </div>
      </div>
    </div>
  );
};

export default Register;
