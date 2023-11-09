import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EventDetails() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    // Fetch event details using the eventId
    fetch(`/api/events/${eventId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set the event details in the state
        setEventDetails(data);
      })
      .catch(error => {
        console.error(error);
        // Handle error, e.g., set an error state
      });
  }, [eventId]);

  return (
    <div>
      <h2>Event Details</h2>
      {eventDetails ? (
        <div>
          <p>Event ID: {eventDetails.id}</p>
          <p>Organizer ID: {eventDetails.organizer_id}</p>
          <p>Event Name: {eventDetails.event_name}</p>
          <p>Event Description: {eventDetails.event_description}</p>
          <p>Start Date: {eventDetails.start_date}</p>
          <p>End Date: {eventDetails.end_date}</p>
          <p>Location: {eventDetails.location}</p>
          <p>Category: {eventDetails.category}</p>
          <p>Total Tickets Available: {eventDetails.total_tickets_available}</p>
          <p>Early Booking Price: {eventDetails.early_booking_price}</p>
          <p>MVP Price: {eventDetails.mvp_price}</p>
          <p>Regular Price: {eventDetails.regular_price}</p>
          {/* Add more details based on the fetched data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EventDetails;
