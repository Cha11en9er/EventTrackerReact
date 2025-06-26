import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

// Accept currentUser and handleLogout as props
function Header({ currentUser, handleLogout }) {
  const location = useLocation();

  const onLogoutClick = () => {
    handleLogout(); // Use the logout handler from App.jsx
  };

  // The header now changes based on whether a user is logged in
  const isInfoPage = location.pathname === '/info' && currentUser;

  return (
    <header className="app-header">
      <div className="header-left">
        <span>Events</span>
      </div>
      {isInfoPage && (
        <>
          <div className="header-center">
            {/* Display the username instead of 'main' */}
            <span>Welcome, {currentUser}</span>
          </div>
          <div className="header-right">
            <button onClick={onLogoutClick} className="logout-button">
              logout
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;