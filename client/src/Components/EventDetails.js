import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css';
import BuyTicketForm from './BuyTicket'; 

const formatDate = (dateString) => {
  // Implement your date formatting logic here
  // For example, you can use the Date object methods
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

function EventDetails() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [cart, setCart] = useState([]);

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

  const updateAvailableTickets = () => {
    // Fetch the updated event details after a ticket is bought
    fetch(`/api/events/${eventId}`)
      .then(response => response.json())
      .then(data => {
        setEventDetails(data);
      })
      .catch(error => {
        console.error(error);
        // Handle error, e.g., set an error state
      });
  };

  const handleBuyNow = () => {
    // Toggle the visibility of the buy ticket form
    setShowBuyForm(!showBuyForm);
  };

  const addToCart = (ticket) => {
    setCart([...cart, ticket]);
  };

  return (
    <div className="event-details-container">
      <h2>Event Details</h2>
      {eventDetails ? (
        <div className="event-details-info">
          <p>Event ID: {eventDetails.id}</p>
          <p>Organizer ID: {eventDetails.organizer_id}</p>
          <p>Event Name: {eventDetails.event_name}</p>
          <p>Event Description: {eventDetails.event_description}</p>
          <p>Start Date: {formatDate(eventDetails.start_date)}</p>
          <p>End Date: {formatDate(eventDetails.end_date)}</p>
          <p>Location: {eventDetails.location}</p>
          <p>Category: {eventDetails.category}</p>
          <p>Total Tickets Available: {eventDetails.total_tickets_available}</p>
          <p>Early Booking Price: ${Number(eventDetails.early_booking_price).toFixed(2)}</p>
          <p>MVP Price: ${Number(eventDetails.mvp_price).toFixed(2)}</p>
          <p>Regular Price: ${Number(eventDetails.regular_price).toFixed(2)}</p>

          {/* "Buy Now" button */}
          <button onClick={handleBuyNow}>Buy Now</button>

          {/* Render the BuyTicketForm based on visibility state */}
          {showBuyForm && (
            <BuyTicketForm
              eventId={eventId}
              onPurchase={() => setShowBuyForm(false)}
              updateAvailableTickets={updateAvailableTickets}
            />
          )}

          {/* Add more details based on the fetched data */}
        </div>
      ) : (
        <div className="loading-spinner">
          {/* Use your preferred loading spinner component here */}
          Loading...
        </div>
      )}
    </div>
  );
}

export default EventDetails;
