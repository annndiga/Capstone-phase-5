import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/UserReviews.css";

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
      <h2>User Reviews</h2>
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
