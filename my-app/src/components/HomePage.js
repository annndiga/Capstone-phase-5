import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Homepage = () => {
  const images = [
    'https://images.unsplash.com/photo-1643759543584-fb6f448d42d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Mzc0NDd8MHwxfHNlYXJjaHwyM3x8ZXZlbnRzfGVufDB8fHx8MTY5ODg2MDg0M3ww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450',
    'https://plus.unsplash.com/premium_photo-1683121128953-9a7f08b82198?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Mzc0NDd8MHwxfHNlYXJjaHwzM3x8ZXZlbnRzfGVufDB8fHx8MTY5ODg2MDg1OHww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450',
    'https://images.unsplash.com/photo-1569863959165-56dae551d4fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Mzc0NDd8MHwxfHNlYXJjaHwzOHx8ZXZlbnRzfGVufDB8fHx8MTY5ODg2MDg1OHww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450',
    'https://images.unsplash.com/photo-1691621184150-1bca7e99d052?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fEJKSk10dGVESkE0fHxlbnwwfHx8fHw%3D',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div style={{ position: 'relative' }}>
    {/* <div
      className="image-text"
      style={{
        position: 'absolute',
        top: '14%',
        left: '40%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'black',
        padding: '20px',
        borderRadius: '5px',
        zIndex: 2,
        fontSize: '2px', 
      }}
    >
        
      </div> */}
      <h2>Why Tiketi Tamasha?</h2>
      <p>  is a leading provider of online payment and e-ticketing 
          solutions in the region.</p>
      <Slider {...settings} style={{ zIndex: 1 }}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ display: 'block ', margin: '0 auto', width: '90%', height: '70' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Homepage;
