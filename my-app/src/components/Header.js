import React, { useState } from 'react';
import '../App.css';

const Header = () => {
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserSignupFields, setShowUserSignupFields] = useState(false);
  const [showUserLoginFields, setShowUserLoginFields] = useState(true);

  const [organizerForm, setOrganizerForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOrganizerClick = () => {
    setShowOrganizerModal(true);
    setShowUserSignupFields(false);
    setShowUserLoginFields(true);
  };

  const handleUserClick = () => {
    setShowUserModal(true);
    setShowUserSignupFields(false);
    setShowUserLoginFields(true);
  };

  const handleUserSignupClick = () => {
    setShowUserSignupFields(true);
    setShowUserLoginFields(false);
  };

  const handleUserLoginClick = () => {
    setShowUserSignupFields(false);
    setShowUserLoginFields(true);
  };

  const handleOrganizerSubmit = (e) => {
    e.preventDefault();
    if (showUserSignupFields) {
      // Handle user signup as an organizer
    } else {
      // Handle user login as an organizer
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (showUserSignupFields) {
      // Handle user signup
    } else {
      // Handle user login
    }
  };

  return (
    <header>
      <h1>TIKETI TAMASHA</h1>
      <nav>
        <ul>
          <li><a href="#">Upcoming Events</a></li>
          <li><a href="#">Featured Events</a></li>
          <li><a href="#" onClick={handleOrganizerClick}>Create Event</a></li>
          <li><a href="#" onClick={handleUserClick}>Login / Sign Up</a></li>
        </ul>
      </nav>
      {showOrganizerModal && (
        <div className="modal">
          <h2>{showUserSignupFields ? 'Sign Up as an Organizer' : 'Login as an Organizer'}</h2>
          <form onSubmit={handleOrganizerSubmit}>
            {showUserSignupFields && (
              <input
                type="text"
                placeholder="Name"
                value={organizerForm.name}
                onChange={(e) =>
                  setOrganizerForm({ ...organizerForm, name: e.target.value })
                }
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={organizerForm.email}
              onChange={(e) =>
                setOrganizerForm({ ...organizerForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={organizerForm.password}
              onChange={(e) =>
                setOrganizerForm({ ...organizerForm, password: e.target.value })
              }
            />
            {showUserSignupFields && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={organizerForm.confirmPassword}
                onChange={(e) =>
                  setOrganizerForm({
                    ...organizerForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
            )}
            <button type="submit">{showUserSignupFields ? 'Sign Up' : 'Login'}</button>
          </form>
          {showUserSignupFields ? (
            <p>If you already have an account, <a href="#" onClick={handleUserLoginClick}>Login</a></p>
          ) : (
            <p>If you don't have an account, <a href="#" onClick={handleUserSignupClick}>Sign Up</a></p>
          )}
          <button onClick={() => setShowOrganizerModal(false)}>Close</button>
        </div>
      )}
      {showUserModal && (
        <div className="modal">
          <h2>{showUserSignupFields ? 'Sign Up as a User' : 'Login as a User'}</h2>
          <form onSubmit={handleUserSubmit}>
            {showUserSignupFields && (
              <input
                type="text"
                placeholder="Name"
                value={userForm.name}
                onChange={(e) =>
                  setUserForm({ ...userForm, name: e.target.value })
                }
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
            />
            {showUserSignupFields && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={userForm.confirmPassword}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    confirmPassword: e.target.value,
                  })
                }
              />
            )}
            <button type="submit">{showUserSignupFields ? 'Sign Up' : 'Login'}</button>
          </form>
          {showUserSignupFields ? (
            <p>If you already have an account, <a href="#" onClick={handleUserLoginClick}>Login</a></p>
          ) : (
            <p>If you don't have an account, <a href="#" onClick={handleUserSignupClick}>Sign Up</a></p>
          )}
          <button onClick={() => setShowUserModal(false)}>Close</button>
        </div>
      )}
    </header>
  );
};

export default Header;
