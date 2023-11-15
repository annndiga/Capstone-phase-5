import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./UserReviews.css";

const reviews = [
  {
    id: 1,
    username: 'Dmittry',
    comment: 'Great experience with Tiketi Tamasha!',
    image: 'https://images.unsplash.com/photo-1698681375999-8faa3e824cd9?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D', 
  },
  {
    id: 2,
    username: 'Dylann',
    comment: 'I love using Tiketi Tamasha for event bookings.',
    image: 'https://images.unsplash.com/photo-1698726019068-7c5b9293605c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D', 
  },
  {
    id: 1,
    username: 'Chandri',
    comment: 'Great experience with Tiketi Tamasha!',
    image: 'https://images.unsplash.com/photo-1688020270350-5d0ca3906b4b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D', 
  },
  {
    id: 1,
    username: 'Kaguo',
    comment: 'Great experience with Tiketi Tamasha!',
    image: 'https://images.unsplash.com/photo-1688386007323-a40c059d5855?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D', 
  },
];

const UserReviews = () => {
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
    <div className="user-reviews-container">
      <div className="aboutus-container"style= {{marginTop:'35rem'}}>
            <h1><span style={{color: "black"}}>ABOUT:</span> <span style={{color: "red"}}>TICKETI</span> <span style={{color: "blue"}}>TAMASHA</span> </h1>
            <p>Ticketi Tamasha is a modern-day ticketing application that allows users to buy and sell tickets for various events. Whether you're looking to attend a concert, a sports game, or a theater performance, Ticketi Tamasha has got you covered.</p>
            <p>Our platform is designed to make the ticket buying and selling process as easy and seamless as possible. With just a few clicks, you can browse through a wide selection of events, choose your seats, and purchase your tickets. And if you can't make it to an event, you can easily sell your tickets to someone else on our platform.</p>
            <p>At Ticketi Tamasha, we're committed to providing our users with the best possible experience. That's why we offer 24/7 customer support, secure payment processing, and a user-friendly interface that's easy to navigate. So why wait? Sign up for Ticketi Tamasha today and start experiencing the best in ticketing technology.</p>
        </div>

      <h2 className="reviews-heading" style={{ color: 'red' }}>User Reviews</h2>
      <div className="slider">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="circle-image">
                <img
                  src={review.image}
                  alt={review.username}
                />
              </div>
              <div className="review-content">
                <p className="username">{review.username}</p>
                <p className="comment">{review.comment}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default UserReviews;