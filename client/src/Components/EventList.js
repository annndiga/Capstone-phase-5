import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
// import { generateJwtToken } from '../utils/jwtUtils'; // Replace with the actual import path

function EventList() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    // const jwtSecretKey = process.env.REACT_APP_JWT_SECRET_KEY;

    useEffect(() => {
        // const jwtToken = generateJwtToken(jwtSecretKey);
        fetch('/api/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Set the 'events' state with the fetched data
            setEvents(data);
        })
        .catch(error => {
            setError(error.message);
            console.error(error);
        });
    }, []);

    return (
        <div className="event-list">
            {error && <p>An error occurred: {error}</p>}
            <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '1rem', marginTop:'65rem' }}>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}
export default EventList;