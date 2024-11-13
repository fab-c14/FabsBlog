import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'User',
    email: 'email@example.com',
    joinedDate: '2023-01-01',
    Avtar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Destiny',
    bio: 'This is a short bio about the user.',
  }; // Mocking user data

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0">
        <Card.Body>
          <Row className="mb-4">
            <Col xs={12} md={4} className="flex justify-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mt-5">
               
                <img
                  src={user.Avtar}
                  alt="User Avatar"
                  className="w-full h-full object-cover center"
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
              <Link  className="mr-2 px-2 py-3 rounded-xl shadow-xl disabled no-underline bg-yellow-300 font-bold hover:border-2 hover:border-green-200">
                Edit Profile
              </Link>
              <Link className='px-2 py-3 button bg-green-500 rounded-xl shadow-xl  font-bold grow text-black no-underline hover:border-2 hover:border-yellow-200 ' to="/create-post">Create Post</Link>
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
