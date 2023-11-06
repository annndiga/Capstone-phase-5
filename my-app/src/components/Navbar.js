import React, { useState, useEffect } from "react";
import { Link,NavLink, useNavigate} from "react-router-dom";
import "../styles/Navbar.css";
import Login from "./Login";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loginOpen, setLoginOpen] = useState(false); 

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLogin = () => {
    setLoginOpen(!loginOpen);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    
  };

  return (
    <div className="nav-container">
      <nav className={nav ? "nav active" : "nav"}>
        <h1>TIKETI TAMASHA</h1>
        <div className="search-container">
        <input
          type="text"
          placeholder="Search Events..."
          value={searchQuery}
          onChange={handleSearch}
        />
         <button onClick={handleSearch}>Search</button>
      </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className={`menu-icon ${menuOpen ? "open" : ""}`}
          htmlFor="menu-btn"
          onClick={toggleMenu}
        >
          <span className="nav-icon"></span>
        </label>

        <li className={`menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <NavLink to="/homepage">Home</NavLink>
          </ul>
          <ul>
            <NavLink to="/upcomingevents">Upcoming Events</NavLink>
          </ul>
          <ul>
            <NavLink to="/featuredevents">Featured Events</NavLink>
          </ul>
          <ul>
            <NavLink to="/createevents">Create Event</NavLink>
          </ul>
          <ul>
            <Link onClick={toggleLogin}>Login</Link>
          </ul>
        </li>
      </nav>

      {loginOpen && (
        <div className="form-container">
          <Login />
          {/* <button className="close-button" onClick={toggleLogin}>
            Close
          </button> */}
        </div>
      )}

      
    </div>
  );
}

export default Navbar;
