import React, { useState } from 'react';
import './App.css';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      onLogin(); 
    } else {
      setError('Invalid email or password. Please check your credentials or sign up.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome Back to FlexNet</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-hint">
          <p>Don't have an account? <span onClick={onSwitchToSignup} className="link-text">Sign up here</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
