// EventCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BuyTicketForm from './BuyTicket';  

function EventCard({ event }) {
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!event) {
    return null; // or return a loading indicator, or some default content
  }

  // Safely access properties of the event object
  const {
    id,
    img,
    event_name,
    organizer,
    event_description,
    start_date,
    end_date,
    location,
    category,
    total_tickets_available,
    early_booking_price,
    mvp_price,
    regular_price,
  } = event;

  const handleBuyNow = () => {
    setShowBuyForm(true);
  };

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{event_name}</Card.Title>
        <Card.Text>
          {showDetails && (
            <>
              <p>Organizer: {organizer && organizer.name}</p>
              <p>{event_description}</p>
              <p>
                Date: {start_date} - {end_date}
              </p>
              <p>Location: {location}</p>
              <p>Category: {category}</p>
              <p>Tickets Available: {total_tickets_available}</p>
              <p>Early Booking Price: ${early_booking_price}</p>
              <p>MVP Price: ${mvp_price}</p>
              <p>Regular Price: ${regular_price}</p>

              {/* Place the "Buy Now" button here */}
              <Button variant="danger" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </>
          )}
        </Card.Text>
        <Link to={`/events/${id}`}>
          <Button variant="primary" onClick={handleViewDetails}>
            {showDetails ? 'Hide Details' : 'View Details'}
          </Button>
        </Link>
        {showBuyForm && <BuyTicketForm eventId={id} setShowBuyForm={setShowBuyForm} />}
      </Card.Body>
    </Card>
  );
}

export default EventCard;
