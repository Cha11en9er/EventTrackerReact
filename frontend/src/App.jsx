import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import IntroPage from './pages/IntroPage/IntroPage';
import AuthPage from './pages/AuthPage/AuthPage';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import './App.css';
import axios from 'axios';

const BackgroundManager = () => {
  const location = useLocation();
  useEffect(() => {
    document.body.className = '';
    switch (location.pathname) {
      case '/':
        document.body.classList.add('home-bg');
        break;
      case '/info':
        document.body.classList.add('info-bg');
        break;
      default:
        document.body.classList.add('home-bg');
        break;
    }
  }, [location.pathname]);
  return null;
};

// A wrapper to protect routes that require a logged-in user
const ProtectedRoute = ({ currentUser, children }) => {
  if (!currentUser) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  // State to hold the current logged-in user's username
  const [currentUser, setCurrentUser] = useState(null);

  // Function to handle user login
  const handleLogin = async (username) => {
    // This will throw an error if login fails, to be caught in LoginPage
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      username: username,
    });
    // If login is successful, set the current user
    setCurrentUser(response.data.username);
  };

  const handleRegister = async (username, password) => {
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      username: username,
      password: password,
    });
    setCurrentUser(response.data.username);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setCurrentUser(null); // Clear the user state
  };

  return (
    <Router>
      <BackgroundManager />
      <div className="app-container">
        {currentUser && (
          <Header currentUser={currentUser} handleLogout={handleLogout} />
        )}
        <main className="page-content">
          <Routes>
            <Route
              path="/"
              element={<IntroPage handleLogin={handleLogin} />}
            />
            <Route
              path="/login"
              element={<AuthPage handleLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<AuthPage handleRegister={handleRegister} />}
            />
            <Route
              path="/schedule"
              element={<SchedulePage />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;