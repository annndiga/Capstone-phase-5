import React, { useEffect, useState } from "react";
import styled from "styled-components";

const EventPageContainer = styled.div`
  width: 700px;
  height: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const EventForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: center; 
  gap: 10px; 

  label {
    font-size: 16px;
  }

  input,
  select {
    font-size: 16px;
  }

  button {
    font-size: 16px;
    background-color: green;
    color: white;
    border: none;
    padding: 5px 10px; 
    border-radius: 5px;
  }
`;

export { EventPageContainer, EventForm};
function EventPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    organizer_id: "",
    event_name: "",
    event_description: "",
    start_date: "",
    end_date: "",
    location: "",
    category: "",
    total_tickets_available: "",
    early_booking_price: "",
    mvp_price: "",
    regular_price: "",
  });
  const [loggedInOrganizer, setLoggedInOrganizer] = useState(false);
  
  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loggedInOrganizer) {
      alert("Organizer must be logged in to create an event.");
      return;
    }
    fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => {
        if (response.status === 201) {
          alert("Event created successfully!");
          setNewEvent({
            organizer_id: "",
            event_name: "",
            event_description: "",
            start_date: "",
            end_date: "",
            location: "",
            category: "",
            total_tickets_available: 0,
            early_booking_price: 0,
            mvp_price: 0,
            regular_price: 0,
          });
        } else if (response.status === 409) {
          alert("Event already exists");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  

  return (
    <EventPageContainer>
    <div>
      {/* <h1>Event Page</h1> */}
      <div>
        {/* <h2>Events</h2> */}
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.event_name}</li>
          ))}
        </ul>
      </div>
      
      <div>
        {/* <h2>Create New Event</h2> */}
        <EventForm onSubmit={handleSubmit}>
          <div>
            <label>Organizer ID:</label>
            <input
              type="text"
              value={newEvent.organizer_id}
              onChange={handleInputChange}
              name="organizer_id"
              // placeholder="Organizer ID"
            />
          </div>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              value={newEvent.event_name}
              onChange={handleInputChange}
              name="event_name"
              // placeholder="Event Name"
            />
          </div>
          <div>
            <label>Event Description:</label>
            <input
              type="text"
              value={newEvent.event_description}
              onChange={handleInputChange}
              name="event_description"
              // placeholder="Event Description"
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={newEvent.start_date}
              onChange={handleInputChange}
              name="start_date"
              placeholder="Start Date"
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              value={newEvent.end_date}
              onChange={handleInputChange}
              name="end_date"
              placeholder="End Date"
            />
          </div>
          <div>
            <label>Event Location:</label>
            <input
              type="text"
              value={newEvent.location}
              onChange={handleInputChange}
              name="location"
              // placeholder="Event Location"
            />
          </div>
          <div>
            <label>Event Category:</label>
            <select
              value={newEvent.category}
              onChange={handleInputChange}
              name="category"
              placeholder="Event Category"
            >
              <option value="Art">Art</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Business">Business</option>
              <option value="Conference">Conference</option> 
            </select>
          </div>
          <div>
            <label>Total Tickets Available:</label>
            <input
              type="number"
              value={newEvent.total_tickets_available}
              onChange={handleInputChange}
              name="total_tickets_available"
              // placeholder="Total Tickets Available"
            />
          </div>
          <div>
            <label>Early Booking Price:</label>
            <input
              type="number"
              value={newEvent.early_booking_price}
              onChange={handleInputChange}
              name="early_booking_price"
              // placeholder="Early Booking Price"
            />
          </div>
          <div>
            <label>MVP Price:</label>
            <input
              type="number"
              value={newEvent.mvp_price}
              onChange={handleInputChange}
              name="mvp_price"
              // placeholder="MVP Price"
            />
          </div>
          <div>
            <label>Regular Price:</label>
            <input
              type="number"
              value={newEvent.regular_price}
              onChange={handleInputChange}
              name="regular_price"
              // placeholder="Regular Price"
            />
          </div>
          <button type="submit">Create Event</button>
          
        </EventForm>
      </div>
    </div>
    </EventPageContainer>
  );
}

export default EventPage;
