import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetch("/events", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data); // Initialize filteredEvents with all events
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const nameMatch = event.event_name.toLowerCase().includes(searchQuery.toLowerCase());
      const locationMatch = event.location.toLowerCase().includes(searchLocation.toLowerCase());
      const dateMatch = event.start_date.includes(searchDate);
      return nameMatch || locationMatch || dateMatch;
    });
    setFilteredEvents(filtered);
  }, [searchQuery, searchLocation, searchDate, events]);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Featured Events</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <label style={{ marginRight: '10px', fontSize: '20px' }}>Search by Event:</label>
        <input
          type="text"
          placeholder="Search by event name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <label style={{ marginLeft: '20px', marginRight: '10px', fontSize: '20px' }}>Search by Location:</label>
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        <label style={{ marginLeft: '20px', fontSize: '20px' }}>Search by Date:</label>
        <input
          type="text"
          placeholder="Search by date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
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

export default FeaturedEvents;
