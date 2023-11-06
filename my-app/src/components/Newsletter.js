import React from "react";
import "../styles/Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <div className="left-column">
          <h1 className="newsletter-title">
            Want to receive updates on events?
          </h1>
          <p className="newsletter-description">
            Sign up to our newsletter and stay up to date.
          </p>
        </div>
        <div className="right-column">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <input
              className="email-input"
              type="email"
              placeholder="Enter Email"
            />
            <button className="subscribe-button">Notify Me</button>
          </div>
          <p>
            <span className="privacy-policy-link">Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
