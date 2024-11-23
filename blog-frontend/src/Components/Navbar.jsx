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
    <Navbar  expand="lg" className="bg-gray-200 rounded-xl shadow-lg mt-2 border-3 bg-green-200">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-4xl font-poppins font-bold">BlogApp</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto flex items-center space-x-4">
            {!token ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="text-2xl py-3 px-3 rounded-lg hover:bg-red-300 hover:underline transition duration-500 hover:shadow-xl font-inter">
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="text-2xl py-3 px-3 rounded-lg hover:bg-red-300 hover:underline transition duration-500 hover:shadow-xl font-inter">
                    Register
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link className="text-lg py-3 px-3 hover:shadow-xl hover:bg-red-500 rounded-lg hover:underline transition duration-200 font-inter">
                    Profile
                  </Nav.Link>
                </LinkContainer>
                <button
                  onClick={handleLogout}
                  className="text-lg px-3 py-3 bg-red-200 rounded-lg hover:bg-red-500 hover:shadow-xl hover:underline transition duration-200 font-inter"
                >
                  Logout
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
