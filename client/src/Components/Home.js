import { Link } from 'react-router-dom';
import './Home.css';
import React from 'react';
import videoBg from '../assets/video (1080p).mp4';

function Home() {
  return (
    <div className="home-container">
      <video autoPlay muted loop className="background-video">
        <source src= {videoBg} type="video/mp4" />
      </video>
      <div className="button-container">
        <Link to="/register" className="btn" id='mybtn'>
          Get started
        </Link>
        </div> 
    </div>
  );
}

export default Home;