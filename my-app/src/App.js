import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes
import Header from './components/Header';
import OrganizerDashboard from './components/OrganizerDashboard';
import UserDashboard from './components/UserDashboard';
import EventDetails from './components/EventDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/organizer" element={<OrganizerDashboard />} /> 
          <Route path="/user" element={<UserDashboard />} /> 
          <Route path="/event/:eventId" element={<EventDetails />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
