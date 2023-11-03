import React, { useState, useEffect } from 'react';
import './EventButton.css';
import axios from 'axios';

function EventList({ addToCalendar }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get('/api/events') 
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (events.length === 0) {
    return (
      <div>
        <h2>Events</h2>
        <p>No events available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Events</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <button className="add-to-calendar-button" onClick={() => addToCalendar(event)}>
            Add to Calendar
          </button>
        </div>
      ))}
    </div>
  );
}

export default EventList;