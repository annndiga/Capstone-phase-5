import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-logo">
          <h1>Tiketi Tamasha</h1>
          <p>Your Hub for Exciting Events</p>
        <div className="social-icons">
          <FaFacebookSquare />
          <FaInstagram />
          <FaTwitterSquare />
          <FaGithubSquare />
          <FaDribbbleSquare />
        </div>
      </div>
      <div className="footer-column">
        <h6 className="column-title">SOLUTIONS</h6>
        <ul className="column-list">
          <li>Analytics</li>
          <li>Marketing</li>
          <li>Commerce</li>
          <li>Insights</li>
        </ul>
      </div>
      <div className="footer-column">
        <h6 className="column-title">SUPPORT</h6>
        <ul className="column-list">
          <li>Pricing</li>
          <li>Documentation</li>
          <li>Guides</li>
          <li>API Status</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
