import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from your API when the component mounts
    // Replace 'your-api-url' with the actual URL of your API
    fetch('your-api-url')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.eventName}</h3>
              <p>{event.eventDescription}</p>
              <p>Location: {event.location}</p>
              <p>Start Date: {event.startDate}</p>
              <p>End Date: {event.endDate}</p>
              <p>Category: {event.category}</p>
              <p>Available Tickets: {event.availableTickets}</p>
              <p>Price: {event.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default UserDashboard;
