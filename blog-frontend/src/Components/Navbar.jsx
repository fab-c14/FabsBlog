import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
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
    <Navbar
      expand="lg"
      className="bg-gray-200 rounded-xl shadow-lg mt-2 p-4 border border-gray-300"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand
            className="text-4xl font-poppins font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-transform duration-300 hover:scale-110"
          >
            BlogApp
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 text-gray-700 focus:outline-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto flex items-center space-x-6">
            {!token ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="text-lg text-gray-700 py-2 px-4 rounded-lg border border-gray-700 hover:text-white hover:bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-300 ease-in-out shadow-md font-inter">
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="text-lg text-gray-700 py-2 px-4 rounded-lg border border-gray-700 hover:text-white hover:bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-300 ease-in-out shadow-md font-inter">
                    Register
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link className="text-lg text-gray-700 py-2 px-4 rounded-lg border border-gray-700 hover:text-white hover:bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-300 ease-in-out shadow-md font-inter">
                    Profile
                  </Nav.Link>
                </LinkContainer>
                <button
                  onClick={handleLogout}
                  className="text-lg px-4 py-2 text-gray-700 border border-gray-700 rounded-lg hover:text-white hover:bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 transition-all duration-300 ease-in-out shadow-md font-inter"
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
