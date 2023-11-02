import { createStore, combineReducers } from 'redux';
import eventReducer from './reducers/eventReducer';

const rootReducer = combineReducers({
  events: eventReducer,
});

const store = createStore(rootReducer);

export default store;
