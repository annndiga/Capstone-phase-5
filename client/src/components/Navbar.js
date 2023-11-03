import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpg";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const navigate = useNavigate();

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

  const handleLogout = () => {
    fetch("http://127.0.0.1:5000/logout", {
      method: "POST",
      credentials: "include", // Include credentials in the request
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Logout successful");
          sessionStorage.removeItem("user_id");
          window.location.href = "/"; // Redirect to the desired page
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <nav className={nav ? "nav active" : "nav"}>
      <Link to="/home" className="logo">
        <img src={logo} alt="" />
      </Link>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        htmlFor="menu-btn"
        onClick={toggleMenu}>
        <span className="nav-icon"></span>
      </label>

      <li className={`menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <Link to="/restaurantlist">Restaurants</Link>
        </ul>
        <ul>
          <Link to="/about">About</Link>
        </ul>
        <ul>
          <Link to="/contact">Contact</Link>
        </ul>
        <ul>
          <Link onClick={handleLogout}>Logout</Link>
        </ul>
      </li>
    </nav>
  );
}

export default Navbar;
