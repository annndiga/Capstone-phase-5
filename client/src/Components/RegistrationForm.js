import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './reg.css';

import { Link } from 'react-router-dom';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [serverResponse,setServerResponse]=useState('')
    const [show,setShow]=useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setServerResponse(data.message)
                setShow(true) 
            })
            .catch((error) => {
                console.error('There was an error creating a new user: ', error.message);
            });
    };
    
    return (
        <div style={{ margin: '50px auto', maxWidth: '350px' }} className='Myregistration'>
            
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <h1 style={{ textAlign: 'center' }}>REGISTER</h1>
            </Link>
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{}}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ backgroundColor: '#fafafa', border: '1px solid #dbdbdb', borderRadius: '3px', padding: '10px 30px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid username.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ backgroundColor: '#fafafa', border: '1px solid #dbdbdb', borderRadius: '3px', padding: '10px 30px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
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
                    <Link to="/login" style={{ textDecoration: 'none', display: 'block', marginTop: '10px' }}>
                        Already have an account? Login here.
                    </Link>
                </Form.Group>

                <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '10px' }} onClick={handleSubmit}>
                    Register
                </Button>
                {show ?<> <Alert variant="success" onClose={() => setShow(false)} style={{marginTop: '10px'}} dismissible>{serverResponse}</Alert></>:null}
            </Form>
        </div>
    );
};

export default RegistrationForm;
