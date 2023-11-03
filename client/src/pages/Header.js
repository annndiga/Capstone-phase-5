import React, { useState } from 'react';


const Header = () => {
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserSignupFields, setShowUserSignupFields] = useState(false);

  const handleOrganizerClick = () => {
    setShowOrganizerForm(true);
    setShowUserForm(false);
    setShowUserSignupFields(false);
  };

  const handleUserClick = () => {
    setShowUserForm(true);
    setShowOrganizerForm(false);
    setShowUserSignupFields(false);
  };

  const handleUserSignupClick = () => {
    setShowUserSignupFields(true);
  };

  const handleUserLoginClick = () => {
    setShowUserSignupFields(false);
  };

  const handleCloseClick = () => {
    setShowOrganizerForm(false);
    setShowUserForm(false);
  };

  return (
    <header style={headerStyles}>
      <h1>TIKETI TAMASHA</h1>
      <nav>
        <ul style={navStyles}>
          <li style={listItemStyles}>
            <a href="#">Home Area</a>
          </li>
          <li style={listItemStyles}>
            <a href="#">Upcoming Events</a>
          </li>
          <li style={listItemStyles}>
            <a href="#">Featured Events</a>
          </li>
          <li style={listItemStyles}>
            <a href="#" onClick={handleOrganizerClick} style={linkStyles}>
              Create Event
            </a>
          </li>
          <li style={listItemStyles}>
            <a href="#" onClick={handleUserClick} style={linkStyles}>
              Login / Sign Up
            </a>
          </li>
        </ul>
      </nav>
      {showOrganizerForm && (
        <div className="modal" style={modalStyles}>
          <h2>{showUserSignupFields ? 'Sign Up as an Organizer' : 'Login as an Organizer'}</h2>
          <form>
            {showUserSignupFields && (
              <input type="text" placeholder="Name" />
            )}
            <input type="company email" placeholder="Company Email" />
            <input type="password" placeholder="Password" />
            {showUserSignupFields && (
              <input type="password" placeholder="Confirm Password" />
            )}
            <button type="submit">
              {showUserSignupFields ? 'Sign Up' : 'Login'}
            </button>
          </form>
          {showUserSignupFields ? (
            <p>If you already have an account, <a href="#" onClick={handleUserLoginClick}>Login</a></p>
          ) : (
            <p>If you don't have an account, <a href="#" onClick={handleUserSignupClick}>Sign Up</a></p>
          )}
          <button onClick={handleCloseClick}>Close</button>
        </div>
      )}
      {showUserForm && (
        <div className="modal" style={modalStyles}>
          <h2>{showUserSignupFields ? 'Sign Up as a User' : 'Login as a User'}</h2>
          <form>
            {showUserSignupFields && (
               <input type="email" placeholder="Email" />
            )}
            <input type="text" placeholder="User name" />
           
            <input type="password" placeholder="Password" />
            {showUserSignupFields && (
              <input type="password" placeholder="Confirm Password" />
            )}
            <button type="submit">
              {showUserSignupFields ? 'Sign Up' : 'Login'}
            </button>
          </form>
          {showUserSignupFields ? (
            <p>If you already have an account, <a href="#" onClick={handleUserLoginClick}>Login</a></p>
          ) : (
            <p>If you don't have an account, <a href="#" onClick={handleUserSignupClick}>Sign Up</a></p>
          )}
          <button onClick={handleCloseClick}>Close</button>
        </div>
      )}
    </header>
  );
};

const headerStyles = {
  backgroundColor: 'pink',
  padding: '10px',
  borderRadius: '10px',
  textAlign: 'center',
};

const navStyles = {
  display: 'flex',
  listStyle: 'none',
  padding: '0',
  justifyContent: 'center',
};

const listItemStyles = {
  margin: '0 10px',
};

const linkStyles = {
  textDecoration: 'none',
  color: 'black',
};

const modalStyles = {
  backgroundColor: ' #ec6868',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
export default Header;