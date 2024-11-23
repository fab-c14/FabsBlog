import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../config';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'User',
    email: 'email@example.com',
    joinedDate: '2023-01-01',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Destiny',
    bio: 'This is a short bio about the user.',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; // If no token, use fallback user

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(`${BACKEND_URL}/api/auth/profile`, config); // Adjust endpoint as needed
        setUser({
          name: data.name || 'User',
          email: data.email,
          joinedDate: data.joinedDate || 'N/A',
          avatar: data.avatar || user.avatar,
          bio: data.bio || 'No bio provided.',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="shadow-lg border-0 rounded-lg bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <Card.Body>
          <Row className="mb-4">
            {/* Avatar Section */}
            <Col xs={12} md={4} className="flex justify-center items-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mt-5">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Col>

            {/* User Information Section */}
            <Col xs={12} md={8}>
              <h2 className="text-3xl font-playfair font-bold mb-2 text-gray-800">
                {user.name}
              </h2>
              <p className="text-lg text-gray-700 mb-3 font-inter">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-md text-gray-600 mb-3 font-inter">
                <strong>Joined:</strong>{' '}
                {user.joinedDate !== 'N/A'
                  ? new Date(user.joinedDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p className="text-md text-gray-600 font-lora">
                <strong>Bio:</strong> {user.bio}
              </p>
              <hr className="tc red w-50 mb-4 text-black" />

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4">
                <Link
                  to="/edit-profile"
                  className="px-4 py-2 rounded-xl shadow-lg bg-yellow-300 font-poppins font-bold text-gray-800 no-underline hover:bg-yellow-400 transition duration-300"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/create-post"
                  className="px-4 py-2 bg-green-500 rounded-xl shadow-lg font-bold font-poppins text-white no-underline hover:bg-green-600 transition duration-300"
                >
                  Create Post
                </Link>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
