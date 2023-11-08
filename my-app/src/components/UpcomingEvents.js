import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetch('')
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
      <h2 style={{ textAlign: 'center' }}>Upcoming Events</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px',fontSize: '20px' }}>
        <label style={{ marginRight: '10px' }}>Search by name:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <label style={{ marginLeft: '10px', marginRight: '10px' ,fontSize: '20px'}}>Search by Location:</label>
        <input type="text"  />

        <label style={{ marginLeft: '10px',fonSize:'20px' }}>Search by Date:</label>
        <input type="date"  />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card" style={{ width: '30%', margin: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
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
