import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8 footer">
      <Container>
        <Row className="flex flex-wrap justify-between items-center">
          <Col xs={12} md={6} className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">My Awesome Blog</h2>
            <p className="text-gray-200">Sharing ideas, stories, and insights.</p>
          </Col>
          <Col xs={12} md={6} className="text-center mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Follow Me</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-200 hover:text-white"><FaFacebookF size={24} /></a>
              <a href="#" className="text-gray-200 hover:text-white"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-200 hover:text-white"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-200 hover:text-white"><FaLinkedinIn size={24} /></a>
            </div>
          </Col>
        </Row>
        <div className="mt-8 text-center text-gray-400">
          &copy; 2023 My Awesome Blog. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
