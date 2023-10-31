import React, { useState } from 'react';
import './App.css';


const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic, e.g., API calls

    // After successful login, set isUserLoggedIn to true
    setIsUserLoggedIn(true);
    setUsername('');
    setPassword('');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic, e.g., API calls

    // After successful signup, set isUserLoggedIn to true
    setIsUserLoggedIn(true);
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
  };

  return (
    <div>
      {!isUserLoggedIn ? (
        <div>
          {/* <h1>Welcome to the Events Website</h1> */}
          <img src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg" alt="Events" />
          {!isSignup ? (
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <p>
                Don't have an account?{' '}
                <span onClick={() => setIsSignup(true)}>Sign up</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <h2>Signup</h2>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit">Signup</button>
              <p>
                Already have an account?{' '}
                <span onClick={() => setIsSignup(false)}>Login</span>
              </p>
            </form>
          )}
        </div>
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <h2>Events</h2>
          <button onClick={() => setIsUserLoggedIn(false)}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
