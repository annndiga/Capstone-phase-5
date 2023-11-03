import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image1 from "../assets/image3.jpeg";
import image2 from "../assets/image2.jpeg";
import "../styles/App.css"; // Create a separate CSS file for About page styles



function About() {
    return (
      <div>
        <Navbar /> {/* Include your custom Navbar component */}
        <div className="about-container">
          <div className="image-container">
            <img src={image1} alt="Event crowd" />
            <img src={image2} alt="Ticket Tamasha venue" />
          </div>
          <h2 className="about-heading">About Ticket Tamasha</h2>
  
          <p className="about-paragraph">
            Welcome to Ticket Tamasha, your ultimate event and ticketing platform. We are a dedicated team of event enthusiasts committed to making your event experiences unforgettable.
          </p>
  
          <p className="about-paragraph">
            Our mission is to provide you with the best event discovery and ticketing solutions so that you can enjoy your favorite events hassle-free.
          </p>
  
          <p className="about-paragraph">
            We believe that every event should be memorable, and we're here to help you find, book, and attend the most exciting events in your area. Ticket Tamasha is your trusted source for all things events.
          </p>
  
          <p className="about-paragraph">
            Join us in the journey of exploring and attending the best events, whether it's concerts, sports, theater, or any other entertainment. Let's make every event a true Tamasha!
          </p>
        </div>
        <div className="path">
          <Footer /> {/* Include your custom Footer component */}
        </div>
      </div>
    );
  }


export default About;
