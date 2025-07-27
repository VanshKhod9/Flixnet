import React, { useState } from 'react';
import './App.css';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.find(user => user.email === email);

    if (userExists) {
      setError('User with this email already exists');
      return;
    }

    const newUser = { email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setSuccess('Account created successfully! You can now login.');
    setTimeout(() => {
      onSwitchToLogin();
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Create Your FlexNet Account</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSignup}>
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="input-field"
          />
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <div className="login-hint">
          <p>Already have an account? <span onClick={onSwitchToLogin} className="link-text">Login here</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 