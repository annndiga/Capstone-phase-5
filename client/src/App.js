import RegistrationForm from './Components/RegistrationForm';
import TheNav from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import EventList from './Components/EventList';
import AddEvent from './Components/AddEvent';
import EventDetails from './Components/EventDetails';
import AboutUs from './Components/AboutUs';
import Contact from './Components/Contact';

function App() {
  return (
    <div className="App">
      <TheNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/events" element={<EventList/>} />
        <Route path="/addevent" element={<AddEvent/>} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/about-us" element={<AboutUs />} /> {/* Add the About Us route */}
        <Route path="/contact-us" element={<Contact />} /> {/* Add the About Us route */}
      </Routes>
    </div>
  );
}

export default App;
