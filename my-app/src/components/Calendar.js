import React from 'react';

const Calendar = ({ events, addToCalendar, removeFromCalendar }) => {
  return (
    <div>
      <h2>My Calendar</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name}
            <button onClick={() => removeFromCalendar(event.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
