import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/navbar';
import TrackExercise from './components/trackExercise';
import Statistics from './components/statistics';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');  // Added state for current user

  const handleLogout = () => {
    setIsLoggedIn(false); 
    setCurrentUser('');  // Clear the current user on logout
  };

  const handleLogin = (username) => {  // Modified to accept a username parameter
    setIsLoggedIn(true);
    setCurrentUser(username);  // Set the current user on login
  };

  return (
    <div className="App">
      <Router>
        <div className="appTitle">
          <h1>CFG Fitness App</h1>
        </div>

        {isLoggedIn && <NavbarComponent onLogout={handleLogout} />}

        <div className="componentContainer">
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup onSignup={() => setIsLoggedIn(true)} />} />
            <Route path="/trackExercise" element={isLoggedIn ? <TrackExercise /> : <Navigate to="/login" />} />
            <Route path="/statistics" element={isLoggedIn ? <Statistics currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/trackExercise" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
