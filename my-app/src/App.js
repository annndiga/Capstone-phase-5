import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import EventList from './components/EventList';
import ViewCalendar from './components/ViewCalendar';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Event Ticketing App</h1>
        <SearchBar />
        <EventList />
        <ViewCalendar />
      </div>
    </Provider>
  );
}

export default App;
