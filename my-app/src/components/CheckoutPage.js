import React from 'react';
import CustomerInformationForm from './CustomerInformationForm';
import PaymentInformationForm from './PaymentInformationForm';
import OrderSummary from './OrderSummary';

function CheckoutPage({ event, ticketCount, totalCost, paymentMethod }) {
  return (
    <div>
      <h2>Checkout</h2>
      <CustomerInformationForm />
      <PaymentInformationForm />
      <OrderSummary event={event} ticketCount={ticketCount} totalCost={totalCost} paymentMethod={paymentMethod} />
      <button>Submit Order</button>
    </div>
  );
}

export default CheckoutPage;
