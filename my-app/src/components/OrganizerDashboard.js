import React, { useState } from 'react';

const OrganizerDashboard = () => {
  const [eventData, setEventData] = useState({
    event_name: 'Event 1',
    eventDescription: 'Description 1',
    start_date: '2023-10-26',
    end_date: '2023-10-27',
    location: 'Location 1',
    category: 'Category 1',
    availableTickets: 100,
    price: 50.0,
    total_tickets_available: 100, 
    early_booking_price: 50.0,     
    mvp_price: 70.0,              
    regular_price: 90.0,          
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();

    // Here, you can submit the event data to your server or perform any required actions.
    // You may use Axios, fetch, or any other method to send the data.

    // Example: Sending data to the server (replace with your server URL)
    fetch('your-server-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server as needed
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  return (
    <div>
      <h2>Organizer Dashboard</h2>
      <form onSubmit={handleCreateEvent}>
        {/* ... (previous form fields) ... */}

        {/* New fields */}
        <label>Total Tickets Available:
          <input
            type="number"
            value={eventData.total_tickets_available}
            onChange={(e) => setEventData({ ...eventData, total_tickets_available: parseInt(e.target.value, 10) })}
          />
        </label>

        <label>Early Booking Price:
          <input
            type="number"
            value={eventData.early_booking_price}
            onChange={(e) => setEventData({ ...eventData, early_booking_price: parseFloat(e.target.value) })}
          />
        </label>

        <label>MVP Price:
          <input
            type="number"
            value={eventData.mvp_price}
            onChange={(e) => setEventData({ ...eventData, mvp_price: parseFloat(e.target.value) })}
          />
        </label>

        <label>Regular Price:
          <input
            type="number"
            value={eventData.regular_price}
            onChange={(e) => setEventData({ ...eventData, regular_price: parseFloat(e.target.value) })}
          />
        </label>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default OrganizerDashboard;
