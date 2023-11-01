export const SEARCH_EVENTS = 'SEARCH_EVENTS';

export const searchEvents = (criteria) => ({
  type: SEARCH_EVENTS,
  payload: criteria,
});
