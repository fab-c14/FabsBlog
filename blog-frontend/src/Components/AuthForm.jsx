import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const url = type === 'login' ? `${BACKEND_URL}/api/auth/login` : `${BACKEND_URL}/api/auth/register`;

    try {
      const { data } = await axios.post(url, { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Row className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Col>
          <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            {type === 'login' ? 'Welcome Back!' : 'Create an Account'}
          </h2>
          {error && (
            <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Label className="text-lg font-inter text-gray-600">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
                required
                style={{ fontSize: '18px' }} // Increased input font size
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-6">
              <Form.Label className="text-lg font-inter text-gray-600">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
                required
                style={{ fontSize: '18px' }} // Increased input font size
              />
            </Form.Group>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-lg font-poppins font-bold text-white transition duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Register'}
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
