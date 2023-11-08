import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth, logout } from './auth';

// const LoggedInLinks = () => {
//   return (
//     <>
//       <Nav.Link href="/">Home</Nav.Link>
//       <Nav.Link href="/" onClick={() => {logout()}}>logout</Nav.Link>
//       <Nav.Link href="/about us">About Us</Nav.Link>
//       <NavDropdown title="Events" id="navbarScrollingDropdown">
//         <NavDropdown.Item href="/events">Events</NavDropdown.Item>
//         <NavDropdown.Item href="#action4">calender
//         </NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="#action5">payment</NavDropdown.Item>
//       </NavDropdown>
//       <Nav.Link href="#">contact us</Nav.Link>
//     </>
//   )
// }

// const LoggedoutLinks = () => {
//   return (
//     <>
//       <Nav.Link href="/">Home</Nav.Link>
//       <Nav.Link href="/login">Login</Nav.Link>
//       <Nav.Link href="/register">Register</Nav.Link>
//     </>
//   )
// }


function TheNav() {
  const [logged] = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><span style={{color: 'red'}}>TICKETI</span> <span style={{color: 'blue'}}>TAMASHA</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/" onClick={() => {logout()}}>logout</Nav.Link>
        <Nav.Link href="/about us">About Us</Nav.Link>
        <NavDropdown title="Events" id="navbarScrollingDropdown">
        <NavDropdown.Item href="/events">Events</NavDropdown.Item>
        <NavDropdown.Item href="#action4">calender
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">payment</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#">contact us</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TheNav;