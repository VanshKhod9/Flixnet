import React, { useState, useEffect } from 'react';
import Home from './Home';
import Movies from './Movies';
import TVShows from './TVShows';
import Login from './Login';
import Signup from './Signup';
import Support from './Support';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const loginStatus = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      setUserEmail(email);
      setCurrentPage('home');
    }
  }, []);

  const handleLogin = () => {
    const email = localStorage.getItem('userEmail');
    setIsLoggedIn(true);
    setUserEmail(email);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setShowProfileDropdown(false);
    setCurrentPage('login');
  };

  const handleSwitchToSignup = () => {
    setCurrentPage('signup');
  };

  const handleSwitchToLogin = () => {
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home searchQuery={searchQuery} />;
      case 'movies':
        return <Movies searchQuery={searchQuery} />;
      case 'tvshows':
        return <TVShows searchQuery={searchQuery} />;
      case 'support':
        return <Support />;
      case 'signup':
        return <Signup onSignup={handleLogin} onSwitchToLogin={handleSwitchToLogin} />;
      default:
        return <Login onLogin={handleLogin} onSwitchToSignup={handleSwitchToSignup} />;
    }
  };

  return (
    <div className="app-container">
      {isLoggedIn && (
        <div className="navbar">
          <div className="logo" onClick={() => setCurrentPage('home')}>
            FlixNet
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button onClick={() => setCurrentPage('movies')}>Movies</button>
          <button onClick={() => setCurrentPage('tvshows')}>TV Shows</button>
          <button onClick={() => setCurrentPage('support')}>Support</button>
          <div className="profile-container">
            <div 
              className="profile-button"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              onMouseEnter={() => setShowProfileDropdown(true)}
            >
              <span className="profile-icon">👤</span>
            </div>
            {showProfileDropdown && (
              <div 
                className="profile-dropdown"
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <div className="profile-email">{userEmail}</div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="page-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
