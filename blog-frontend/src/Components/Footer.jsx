import React from 'react';
import { Container, Row, Col,TabContainer } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
  return (
  <footer className=" bg-gradient-to-r from-blue-400 to-purple-700 text-white py-8 footer center shadow-lg">
    <Container className=' '>
        <Row>
          <Col lg={12} md={6} sm={3} className="text-center">
            <h2 className="text-xl font-bold mb-2">Follow Me</h2>
            <div className="flex justify-center space-x-4 mt-3">
              <a href="#" className="text-gray-800 hover:text-red-200"><FaTwitter size={30} /></a>
              <a href="#" className="text-gray-800 hover:text-red-200"><FaInstagram size={30} /></a>
              <a href="#" className="text-gray-800 hover:text-red-200"><FaLinkedinIn size={30} /></a>
            </div>
          </Col>
          <div className="mt-8 text-center bg-gradient-to-l from-green-800 to-blue-200 font-bold mt-3 shadow-xl rounded-lg">
          &copy; 2024-25 Fab-c14 Blog. All rights reserved.
          </div>
        </Row>
        
      </Container>
    </footer>
  );
};

export default Footer;
