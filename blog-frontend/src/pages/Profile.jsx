import React from 'react';
import { Container } from 'react-bootstrap';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Mocking user data

  return (
    <Container>
      <h1>Welcome, {user?.name || 'User'}</h1>
      <p>Email: {user?.email || 'email@example.com'}</p>
    </Container>
  );
};

export default ProfilePage;
