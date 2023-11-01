import { SEARCH_EVENTS } from '../actions/eventSearchActions';

const initialState = {
  searchResults: [],
};

const eventSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_EVENTS:
      // Implement your logic to fetch and store search results based on criteria.
      return {
        ...state,
        searchResults: action.payload, // Set the fetched results from the action payload.
      };
    default:
      return state;
  }
};

export default eventSearchReducer;

