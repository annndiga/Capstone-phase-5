import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import calendarReducer from './reducers/calendarReducer';
import eventSearchReducer from './reducers/eventSearchReducer';
import EventList from './components/EventList';
import Calendar from './components/Calendar';
import EventSearch from './components/EventSearch';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  eventSearch: eventSearchReducer,
});

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={EventList} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/event-search" component={EventSearch} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
