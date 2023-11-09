import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './AddEvent.css'; 

const AddEvent = () => {
    const [organizer_id, setOrganizerId] = useState('');
    const [event_name, setEventName] = useState('');
    const [event_description, setEventDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [total_tickets_available, setTotalTicketsAvailable] = useState('');
    const [early_booking_price, setEarlyBookingPrice] = useState('');
    const [mvp_price, setMvpPrice] = useState('');
    const [regular_price, setRegularPrice] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/events')
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organizer_id,
                    event_name,
                    event_description,
                    start_date,
                    end_date,
                    location,
                    category,
                    total_tickets_available,
                    early_booking_price,
                    mvp_price,
                    regular_price,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    setOrganizerId('');
                    setEventName('');
                    setEventDescription('');
                    setStartDate('');
                    setEndDate('');
                    setLocation('');
                    setCategory('');
                    setTotalTicketsAvailable('');
                    setEarlyBookingPrice('');
                    setMvpPrice('');
                    setRegularPrice('');
                    setIsSubmitting(false);
                })
                .catch((err) => console.log(err));
        }
    }, [organizer_id, event_name, event_description, start_date, end_date, location, category, total_tickets_available, early_booking_price, mvp_price, regular_price, errors, isSubmitting]);
    

//handle event function that will handle the submit event by making a post request to the server on the backend
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate());
        setIsSubmitting(true);
    };

    const validate = () => {
        let errors = {};
        if (!organizer_id) {
            errors.organizer_id = 'Organizer ID is required';
        }
        if (!event_name) {
            errors.event_name = 'Event name is required';
        }
        if (!event_description) {
            errors.event_description = 'Event description is required';
        }
        if (!start_date) {
            errors.start_date = 'Start date is required';
        }
        if (!end_date) {
            errors.end_date = 'End date is required';
        }
        if (!location) {
            errors.location = 'Location is required';
        }
        if (!category) {
            errors.category = 'Category is required';
        }
        if (!total_tickets_available) {
            errors.total_tickets_available = 'Total tickets available is required';
        }
        if (!early_booking_price) {
            errors.early_booking_price = 'Early booking price is required';
        }
        if (!mvp_price) {
            errors.mvp_price = 'MVP price is required';
        }
        if (!regular_price) {
            errors.regular_price = 'Regular price is required';
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    organizer_id,
                    event_name,
                    event_description,
                    start_date,
                    end_date,
                    location,
                    category,
                    total_tickets_available,
                    early_booking_price,
                    mvp_price,
                    regular_price,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    setOrganizerId('');
                    setEventName('');
                    setEventDescription('');
                    setStartDate('');
                    setEndDate('');
                    setLocation('');
                    setCategory('');
                    setTotalTicketsAvailable('');
                    setEarlyBookingPrice('');
                    setMvpPrice('');
                    setRegularPrice('');
                    setIsSubmitting(false);
                })
                .catch((err) => console.log(err));
        }
    }, [organizer_id, event_name, event_description, start_date, end_date, location, category, total_tickets_available, early_booking_price, mvp_price, regular_price, errors, isSubmitting]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'organizer_id':
                setOrganizerId(value);
                break;
            case 'event_name':
                setEventName(value);
                break;
            case 'event_description':
                setEventDescription(value);
                break;
            case 'start_date':
                setStartDate(value);
                break;
            case 'end_date':
                setEndDate(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'total_tickets_available':
                setTotalTicketsAvailable(value);
                break;
            case 'early_booking_price':
                setEarlyBookingPrice(value);
                break;
            case 'mvp_price':
                setMvpPrice(value);
                break;
            case 'regular_price':
                setRegularPrice(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h1>Add Event</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                        <div className="add-event-form">
                            <h1>Add Event</h1>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="organizer_id">Organizer ID</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="text"
                                        name="organizer_id"
                                        id="organizer_id"
                                        value={organizer_id}
                                        onChange={handleChange}
                                    />
                                    
                                    {errors.organizer_id && <Alert className="alert-message" color="danger">{errors.organizer_id}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="event_name">Event Name</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="text"
                                        name="event_name"
                                        id="event_name"
                                        value={event_name}
                                        onChange={handleChange}
                                    />
                                    {errors.event_name && <Alert className="alert-message" color="danger">{errors.event_name}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="event_description">Event Description</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="textarea"
                                        name="event_description"
                                        id="event_description"
                                        value={event_description}
                                        onChange={handleChange}
                                    />
                                    {errors.event_description && <Alert className="alert-message" color="danger">{errors.event_description}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="start_date">Start Date</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="date"
                                        name="start_date"
                                        id="start_date"
                                        value={start_date}
                                        onChange={handleChange}
                                    />
                                    {errors.start_date && <Alert className="alert-message" color="danger">{errors.start_date}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="end_date">End Date</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="date"
                                        name="end_date"
                                        id="end_date"
                                        value={end_date}
                                        onChange={handleChange}
                                    />
                                    {errors.end_date && <Alert className="alert-message" color="danger">{errors.end_date}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="location">Location</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="text"
                                        name="location"
                                        id="location"
                                        value={location}
                                        onChange={handleChange}
                                    />
                                    {errors.location && <Alert className="alert-message" color="danger">{errors.location}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="category">Category</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="text"
                                        name="category"
                                        id="category"
                                        value={category}
                                        onChange={handleChange}
                                    />
                                    {errors.category && <Alert className="alert-message" color="danger">{errors.category}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="total_tickets_available">Total Tickets Available</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="number"
                                        name="total_tickets_available"
                                        id="total_tickets_available"
                                        value={total_tickets_available}
                                        onChange={handleChange}
                                    />
                                    {errors.total_tickets_available && <Alert className="alert-message" color="danger">{errors.total_tickets_available}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="early_booking_price">Early Booking Price</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="number"
                                        name="early_booking_price"
                                        id="early_booking_price"
                                        value={early_booking_price}
                                        onChange={handleChange}
                                    />
                                    {errors.early_booking_price && <Alert className="alert-message" color="danger">{errors.early_booking_price}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="mvp_price">MVP Price</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="number"
                                        name="mvp_price"
                                        id="mvp_price"
                                        value={mvp_price}
                                        onChange={handleChange}
                                    />
                                    {errors.mvp_price && <Alert className="alert-message" color="danger">{errors.mvp_price}</Alert>}
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label className="form-label" for="regular_price">Regular Price</Label>
                                    <Input
                                        className="form-control"
                                        required
                                        type="number"
                                        name="regular_price"
                                        id="regular_price"
                                        value={regular_price}
                                        onChange={handleChange}
                                    />
                                    {errors.regular_price && <Alert className="alert-message" color="danger">{errors.regular_price}</Alert>}
                                </FormGroup>
                                <Button className="register-button" color="primary" onClick={handleSubmit}>
                                    Add Event
                                </Button>
                            </Form>
                        </div>
                </FormGroup>
            </Form>
            <h1>Events</h1>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Organizer ID</th>
                        <th>Event Name</th>
                        <th>Event Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Total Tickets Available</th>
                        <th>Early Booking Price</th>
                        <th>MVP Price</th>
                        <th>Regular Price</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.organizer_id}</td>
                            <td>{event.event_name}</td>
                            <td>{event.event_description}</td>
                            <td>{event.start_date}</td>
                            <td>{event.end_date}</td>
                            <td>{event.location}</td>
                            <td>{event.category}</td>
                            <td>{event.total_tickets_available}</td>
                            <td>{event.early_booking_price}</td>
                            <td>{event.mvp_price}</td>
                            <td>{event.regular_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddEvent;

