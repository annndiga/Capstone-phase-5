import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

function Events() {
  const [events, setEvents] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <h1 style={{ textAlign: "center" }}>Events</h1>
      {events.map((event) => (
        <div key={event.id} style={{ width: "30%", margin: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
          <h2>{event.event_name}</h2>
          <p>Description: {event.event_description}</p>
          <p>Start Date: {event.start_date}</p>
          <p>End Date: {event.end_date}</p>
          <p>Location: {event.location}</p>
          <p>Category: {event.category}</p>
          <p>Total Tickets Available: {event.total_tickets_available}</p>
          <p>Early Booking Price: {event.early_booking_price}</p>
          <p>MVP Price: {event.mvp_price}</p>
          <p>Regular Price: {event.regular_price}</p>
          <Link to="/checkout">
            <button className="book-button">Book Ticket</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Events;
