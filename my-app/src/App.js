import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import OrganizerDashboard from './components/OrganizerDashboard';
import UserDashboard from './components/UserDashboard';
import EventDetails from './components/EventDetails';
import HomePage from './components/HomePage';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import ViewCalendar from './components/ViewCalendar';
// import HomeArea from './components/HomeArea';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <SearchBar />
        <HomePage/>
        <EventList />
        <ViewCalendar />
        <HomePage/>
        {/* <HomeArea/> */}
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
