import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { generateJwtToken } from '../utils/jwtUtils'; // Replace with the actual import path



function EventList() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const jwtSecretKey = process.env.REACT_APP_JWT_SECRET_KEY;


    useEffect(() => {
        // Fetch event data from your backend (e.g., using fetch or Axios)
        // Update the 'events' state with the fetched data
        // You can replace this with actual API calls to your server

        const token = generateJwtToken({}, jwtSecretKey);

        fetch('/api/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
    }, [jwtSecretKey]);

    return (
        <div>
            {error && <p>An error occurred: {error}</p>}
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}

export default EventList;