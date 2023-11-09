import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './login.css';
import { login } from './auth';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          login(data.access_token);
          
        })
        .catch((error) => {
          console.error('There was an error logging in: ', error.message);
        })
        .finally(() => {
          // Clear the form fields after the request is completed
          setUsername('');
          setPassword('');
          
        });
    }
    setValidated(true);
  };
  

  return (
    <div style={{ margin: '50px auto', maxWidth: '350px' }} className='Myregistration'>
      <h1 style={{ textAlign: 'center' }}>LOGIN</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ backgroundColor: '#fafafa', border: '1px solid #dbdbdb', borderRadius: '3px', padding: '8px 12px' }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: '#fafafa', border: '1px solid #dbdbdb', borderRadius: '3px', padding: '10px 30px' }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: '20%', marginTop: '10px'}}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;