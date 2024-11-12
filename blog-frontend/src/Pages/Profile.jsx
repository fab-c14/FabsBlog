import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
              <p className="text-md text-gray-600 ">
                <strong>Bio:</strong> {user.bio}
              </p>
              <hr className='tc red w-50 mb-4 text-black' />
              <span className='tc mb-3'>
              <Link  className="mr-2 disabled grow px-2 py-3 b text-black rounded-xl bg-yellow grow">
                Edit Profile
              </Link>
              <Link className='px-2 py-3 button bg-green-500 rounded-xl b grow text-black' to="/create-post">Settings</Link>
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
