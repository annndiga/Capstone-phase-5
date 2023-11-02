import React from 'react';
import { connect } from 'react-redux';
import { addToCalendar } from '../redux/actions/eventActions';
import './EventButton.css'; // Import the CSS file

function EventList({ events, addToCalendar }) {
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

const mapStateToProps = (state) => ({
  events: state.events.events,
});

const mapDispatchToProps = (dispatch) => ({
  addToCalendar: (event) => dispatch(addToCalendar(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
