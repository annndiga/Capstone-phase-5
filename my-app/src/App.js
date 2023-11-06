import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
import OrganizerDashboard from './components/OrganizerDashboard';
import UserDashboard from './components/UserDashboard';
import EventDetails from './components/EventDetails';
import HomePage from './components/HomePage';

// import EventList from './components/EventList';
// import ViewCalendar from './components/ViewCalendar';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Login from './components/Login';
import Signup from './components/Signup';
// import UpcomingEvents from './components/UpcomingEvents';
import FeaturedEvents from './components/FeaturedEvents';
import CreateEvent from './components/CreateEvent';
import UserReviews from './components/UserReviews';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <HomePage/>
        {/* <UpcomingEvents/> */}
        {/* <EventList /> */}
        {/* <ViewCalendar /> */}
        <UserReviews/>
        <Newsletter/>
        <Footer/>
        <Routes>
        {/* <Route path="/upcomingevents" element={<UpcomingEvents/>} /> */}
          <Route path="/Featuredevents" element={<FeaturedEvents/>} />
          <Route path="/createevents" element={<CreateEvent/>} />
          <Route path="/organizer" element={<OrganizerDashboard />} /> 
          <Route path="/user" element={<UserDashboard />} /> 
          <Route path="/event/:eventId" element={<EventDetails />} /> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;