import React, { useState } from 'react';
import Home from './Home';
import Movies from './Movies';
import TVShows from './TVshows';
import Login from './Login';
import Support from './Support';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');

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
      default:
        return <Login onLogin={() => setCurrentPage('home')} />;
    }
  };

  return (
    <div className="app-container">
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
      </div>
      <div className="page-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
