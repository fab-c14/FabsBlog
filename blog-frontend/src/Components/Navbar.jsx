import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure Tailwind CSS is available globally

const AppNavbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="font-bold text-2xl">BlogApp</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto flex items-center space-x-4">
            {!token ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="text-lg hover:text-gray-300 transition duration-200">
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="text-lg hover:text-gray-300 transition duration-200">
                    Register
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link className="text-lg hover:text-gray-300 transition duration-200">
                    Profile
                  </Nav.Link>
                </LinkContainer>
                <Button
                  onClick={handleLogout}
                  variant="danger"
                  className="text-lg px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
