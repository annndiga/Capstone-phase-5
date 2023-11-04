import React, { useState, useEffect } from 'react';

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

function App() {
  const [userCalendar, setUserCalendar] = useState([]);

  useEffect(() => {
    
    fetch('your_api_endpoint_here')
      .then((response) => response.json())
      .then((data) => {
        setUserCalendar(data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <ViewCalendar userCalendar={userCalendar} />
    </div>
  );
}

export default App;
