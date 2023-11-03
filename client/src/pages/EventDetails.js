import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch event details from your API using the eventId parameter
    // Replace 'your-api-url' with the actual URL of your API
    fetch(`http://127.0.0.1:5000/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
        setLoading(false);
      });
  }, [eventId]);

  return (
    <div>
      <h2>Event Details</h2>
      {loading ? (
        <p>Loading event details...</p>
      ) : event ? (
        <div>
          <h3>{event.eventName}</h3>
          <p>{event.eventDescription}</p>
          <p>Location: {event.location}</p>
          <p>Start Date: {event.startDate}</p>
          <p>End Date: {event.endDate}</p>
          <p>Category: {event.category}</p>
          <p>Available Tickets: {event.availableTickets}</p>
          <p>Price: {event.price}</p>
        </div>
      ) : (
        <p>Event not found.</p>
      )}
    </div>
  );
};

export default EventDetails;