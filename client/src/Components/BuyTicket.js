// BuyTicketForm.js

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const BuyTicketForm = ({ eventId, onPurchase }) => {
  const [ticketType, setTicketType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [ticketId, setTicketId] = useState(null); // Initialize ticketId with null

  // Updated ticketTypes and paymentMethods arrays
  const ticketTypes = ['MVP', 'Regular', 'Early Booking'];
  const paymentMethods = ['Credit Card', 'PayPal', 'Mpesa'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      // Assuming you have an authentication system that provides a token
      const token = localStorage.getItem('token');

      fetch('/api/tickets/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event_id: eventId,
          ticket_type: ticketType,
          payment_method: paymentMethod,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setPurchaseSuccess(true); // Set purchaseSuccess to true
          setTicketId(data.ticketId); // Set the ticketId from the response
          onPurchase(); // Trigger any necessary action after a successful purchase
        })
        .catch((err) => console.log(err))
        .finally(() => setIsSubmitting(false));
    }
  };

  const validate = () => {
    let errors = {};
    // Add validation logic as needed
    if (!ticketType) {
      errors.ticketType = 'Ticket type is required';
    }
    if (!paymentMethod) {
      errors.paymentMethod = 'Payment method is required';
    }
    return errors;
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* ... (previous form fields) */}
      <FormGroup>
        <Label for="paymentMethod">Payment Method</Label>
        <Input
          type="select"
          name="paymentMethod"
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          {/* ... (previous options) */}
        </Input>
        {errors.paymentMethod && (
          <Alert color="danger">{errors.paymentMethod}</Alert>
        )}
      </FormGroup>
      <Button color="primary" type="submit" disabled={isSubmitting}>
        Buy Ticket
      </Button>

      {/* Display the link after a successful purchase */}
      {purchaseSuccess && (
        <div>
          <p>Congratulations! You've successfully purchased a ticket.</p>
          <Link to={`/tickets/receipt/${ticketId}`} target="_blank" download>
            Download Receipt
          </Link>
        </div>
      )}
    </Form>
  );
};

export default BuyTicketForm;
