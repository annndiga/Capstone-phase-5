import React from 'react';
import { connect } from 'react-redux';

function ViewCalendar({ userCalendar }) {
  return (
    <div>
      <h2>My Calendar</h2>
      {userCalendar.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  userCalendar: state.events.userCalendar,
});

export default connect(mapStateToProps)(ViewCalendar);
