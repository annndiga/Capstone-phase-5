import React from 'react';
import './reg.css';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Payform() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Add your logic here to handle the payment submission
    alert('Payment successful'); // Placeholder for handling the payment

    // You can redirect the user or update the UI based on the payment status
  };

  return (
    <div style={{ margin: '50px auto', maxWidth: '350px' }} className='Myregistration'>
      <Link to="/events" style={{ textDecoration: 'none' }}>
        <h1 style={{ textAlign: 'center' }}>PAYMENT FORM</h1>
      </Link>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Amount"
            style={{ backgroundColor: '#fafafa', border: '1px solid #dbdbdb', borderRadius: '3px', padding: '10px 30px' }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Amount.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Phone number"
            style={{ backgroundColor: '#fafafa', border: '1px solid #dbdbdb', borderRadius: '3px', padding: '10px 30px' }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid phone number.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Link to="/events" style={{ textDecoration: 'none', display: 'block', marginTop: '10px' }}>
            Already made a payment? Return to events.
          </Link>
        </Form.Group>

        <Button variant='success' type="submit" style={{ width: '100%', marginTop: '10px', color: 'black' }} onClick={handleSubmit}>
          M-PESA
        </Button>
      </Form>
    </div>
  );
}

export default Payform;
