import React from "react";
import Typed from "react-typed";
import "../styles/Hero.css";
import { Link } from "react-router-dom";

const HomePage= () => {
  return (
    <div className="hero-container">
      <div className="w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="hero-title"> Discover Exciting Events.</p>
        <h1 className=" text-4xl font-bold "></h1>
        <div className="typed-container">
          <p className="hero-subtitle">Find, Book, and Enjoy a Wide Range of Events and Shows.</p>
          <Typed
            className="typed-text"
            strings={["Concerts", "Conferences", "Sports", "Arts", "and More"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="hero-description">
          Monitor your data analytics to make ourselves better for you.
        </p>
        <Link to="/Upcomingevents">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
