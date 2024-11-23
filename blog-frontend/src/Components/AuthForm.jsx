import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Start loading

    const url = type === 'login' ? `${BACKEND_URL}/api/auth/login` : `${BACKEND_URL}/api/auth/register`;

    try {
      const { data } = await axios.post(url, { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.response?.data?.message || 'Something went wrong. Please try again.'); // Handle errors gracefully
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Row className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Col>
          <h2 className="text-3xl font-playfair rounded-sm px-2 py-2 mb-4 text-center">
            {type === 'login' ? 'Login' : 'Register'}
          </h2>
          {error && (
            <div className="text-red-600 mb-4 text-center font-bold">{error}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label className="font-medium text-lg font-inter">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-lg py-3 hover:text-xl rounded-full border-gray-300 focus:border-blue-400"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label className="font-medium text-lg font-inter">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-lg py-3 hover:text-xl rounded-full border-gray-300 focus:border-blue-400"
                required
              />
            </Form.Group>

            <button
              type="submit"
              className={`w-full py-3 shadow-lg text-lg rounded-xl font-bold font-poppins transition duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
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
