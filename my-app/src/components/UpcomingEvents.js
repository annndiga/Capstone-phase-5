import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
   
    fetch(``)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data); 
      })
      .catch((error) => {
        console.error('Error fetching upcoming events:', error);
      });
  }, []);

  useEffect(() => {
    
    const filtered = events.filter((event) => {
      const nameMatch = event.eventName.toLowerCase().includes(searchQuery.toLowerCase());
      const locationMatch = event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const dateMatch = event.startDate.includes(searchQuery);
      return nameMatch || locationMatch || dateMatch;
    });
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <input
        type="text"
        placeholder="Search by event name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="slider">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.imageUrl} alt={event.eventName} />
            <h3>{event.eventName}</h3>
            <p>{event.startDate}</p>
            <p>{event.location}</p>
            <p>{event.endDate}</p>
            <p>{event.category}</p>
            <p>{event.availableTickets}</p>
            <p>{event.price}</p>
            <Link to="/checkout">
            <button
                style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                }}
            >
                Book Ticket
            </button>
            </Link>

            <Link to={`/event/${event.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
