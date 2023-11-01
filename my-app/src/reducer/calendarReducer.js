import { ADD_TO_CALENDAR, REMOVE_FROM_CALENDAR } from '../actions/calendarActions';

const initialState = {
  events: [],
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CALENDAR:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case REMOVE_FROM_CALENDAR:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    default:
      return state;
  }
};

export default calendarReducer;
