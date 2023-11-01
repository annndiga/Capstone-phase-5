export const ADD_TO_CALENDAR = 'ADD_TO_CALENDAR';
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR';

export const addToCalendar = (event) => ({
  type: ADD_TO_CALENDAR,
  payload: event,
});

export const removeFromCalendar = (eventId) => ({
  type: REMOVE_FROM_CALENDAR,
  payload: eventId,
});
