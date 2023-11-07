import React from 'react';

function OrderSummary({ event, ticketCount, totalCost, paymentMethod }) {
  return (
    <div>
      <h3>Order Summary</h3>
      <p>Event: {event.name}</p>
      <p>Tickets: {ticketCount}</p>
      <p>Total Cost: {totalCost}</p>
      <p>Payment Method: {paymentMethod}</p>
    </div>
  );
}

export default OrderSummary;
