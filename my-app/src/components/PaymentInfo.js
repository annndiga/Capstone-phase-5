import React, { useState } from 'react';

function PaymentInformationForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  return (
    <form>
      <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
      <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCVV(e.target.value)} />
      <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
    </form>
  );
}

export default PaymentInformationForm;

