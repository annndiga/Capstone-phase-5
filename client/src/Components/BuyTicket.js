import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const BuyTicketForm = ({ eventId, onPurchase, updateAvailableTickets }) => {
  const [ticketType, setTicketType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <FormGroup>
        <Label for="ticketType">Ticket Type</Label>
        <Input
          type="select"
          name="ticketType"
          id="ticketType"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="" disabled>
            Select Ticket Type
          </option>
          {ticketTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Input>
        {errors.ticketType && (
          <Alert color="danger">{errors.ticketType}</Alert>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="paymentMethod">Payment Method</Label>
        <Input
          type="select"
          name="paymentMethod"
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </Input>
        {errors.paymentMethod && (
          <Alert color="danger">{errors.paymentMethod}</Alert>
        )}
      </FormGroup>
      <Button color="primary" type="submit" disabled={isSubmitting}>
        Buy Ticket
      </Button>
    </Form>
  );
};

export default BuyTicketForm;
