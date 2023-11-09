import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function EventCard(props) {
  const { event } = props;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={event.img} />
      <Card.Body>
        <Card.Title>{event.event_name}</Card.Title>
        <Card.Text>
          <p>Organizer: {event.organizer.name}</p>
          <p>{event.event_description}</p>
          <p>
            Date: {event.start_date} - {event.end_date}
          </p>
          <p>Location: {event.location}</p>
          <p>Category: {event.category}</p>
          <p>Tickets Available: {event.total_tickets_available}</p>
          <p>Early Booking Price: ${event.early_booking_price}</p>
          <p>MVP Price: ${event.mvp_price}</p>
          <p>Regular Price: ${event.regular_price}</p>
        </Card.Text>
        <Button variant="primary">View Details</Button>
        <Button variant="danger">Buy Now</Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;