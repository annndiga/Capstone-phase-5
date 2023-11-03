import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recover from "./components/Recover";
import About from "./pages/About";
import Header from "./pages/Header"
import EventDetails from './pages/EventDetails';
import Signup from './pages/Signup';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        {/* <HomeArea/> */}
        <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/about" element={<About />} />
        <Route path="/header" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event/:eventId" element={<EventDetails />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;