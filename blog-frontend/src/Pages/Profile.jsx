import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'User',
    email: 'email@example.com',
    joinedDate: '2023-01-01',
    bio: 'This is a short bio about the user.',
  }; // Mocking user data

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0">
        <Card.Body>
          <Row className="mb-4">
            <Col xs={12} md={4} className="flex justify-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
               
                <img
                  src="/default-avatar.png"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Col>
            <Col xs={12} md={8}>
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <p className="text-lg text-gray-700 mb-3">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-md text-gray-600 mb-3">
                <strong>Joined:</strong> {new Date(user.joinedDate).toLocaleDateString()}
              </p>
              <p className="text-md text-gray-600 mb-4">
                <strong>Bio:</strong> {user.bio}
              </p>
              <Button variant="primary" className="mr-2">
                Edit Profile
              </Button>
              <Button variant="outline-secondary">Settings</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
