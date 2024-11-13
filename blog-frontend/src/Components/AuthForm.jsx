import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = type === 'login' ? `${BACKEND_URL}/api/auth/login` : `${BACKEND_URL}/api/auth/register`;
    try {
      const { data } = await axios.post(url, { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error('Authentication error', error);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Row className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg rounded-2xl">
        <Col>
          <h2 className="text-3xl rounded-sm px-2 py-2 b mb-4 text-center">{type === 'login' ? 'Login' : 'Register'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label className="font-medium text-lg">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-md b rounded-lg py-3 hover:text-xl"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label className="font-medium text-lg">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-md  b rounded-lg  py-3 hover:text-xl "
              />
            </Form.Group>

            <button
              type="submit"
              className="w-full b py-3 bg-green text-lg rounded-xl hover:bg-red-500 border-green shadow-outer grow  hover:border-x-8 border-purple-600 transition duration-400"
            >
              {type === 'login' ? 'Login' : 'Register'}
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
