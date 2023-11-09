import RegistrationForm from './Components/RegistrationForm';
import TheNav from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import EventList from './Components/EventList';
import AddEvent from './Components/AddEvent';

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

      </Routes>
    </div>
  );
}

export default App;
