export const addToCalendar = (event) => {
    return { type: 'ADD_TO_CALENDAR', payload: event };
  };
  
  export const searchEvents = (query) => {
    return { type: 'SEARCH_EVENTS', payload: query };
  };
  