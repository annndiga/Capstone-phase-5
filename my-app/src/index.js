import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Navbar,
  HomePage,
  Newsletter,
  UserReviews,
  Footer,
  Events,
  FeaturedEvents,
  UpcomingEvents,
  CreateEvent,
  //Login
} from "./components"

ReactDOM.render(
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/homepage" element={<HomePage/>} />
      <Route path="/events" element={<Events/>} />
      <Route path="/featuredevents" element={<FeaturedEvents />} />
      <Route path="/upcomingevents" element={<UpcomingEvents />} />
      <Route path="/createevents" element={<CreateEvent />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
    <Newsletter/>
    <UserReviews/>
    <Footer />
  </Router>,

  document.getElementById("root")
);
