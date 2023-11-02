const initialState = {
    events: [
      { id: 1, name: 'Event 1', description: 'Description for Event 1' },
      { id: 2, name: 'Event 2', description: 'Description for Event 2' },
      // Add more events here
    ],
    userCalendar: [],
    searchResults: [],
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CALENDAR':
        return {
          ...state,
          userCalendar: [...state.userCalendar, action.payload],
        };
      case 'SEARCH_EVENTS':
        const query = action.payload.toLowerCase();
        const searchResults = state.events.filter((event) =>
          event.name.toLowerCase().includes(query)
        );
        return {
          ...state,
          searchResults,
        };
      default:
        return state;
    }
  };
  
  export default eventReducer;
  