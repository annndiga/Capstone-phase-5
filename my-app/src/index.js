import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Navbar,
  HomePage,
  Newsletter,
  UserReviews,
  Footer,
  FeaturedEvents,
  UpcomingEvents,
  CreateEvent,
  //Login
} from "./components"

ReactDOM.render(
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/Homepage" element={<HomePage />} />
      <Route path="/featured events" element={<FeaturedEvents />} />
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
