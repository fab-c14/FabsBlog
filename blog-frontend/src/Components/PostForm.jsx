import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', 'fab-c14'); // Mock author ID
    if (image) formData.append('image', image);

    try {
      await axios.post(`${BACKEND_URL}/api/posts`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/'); // Redirect after successful post creation
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error('Post creation error', error);
    }
  };

  return (
    <Container className="mt-8 p-4 bg-white rounded shadow-md">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className="space-y-4">
            <Form.Group controlId="postTitle">
              <Form.Label className="font-medium">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border-gray-300 rounded"
              />
            </Form.Group>

            <Form.Group controlId="postContent">
              <Form.Label className="font-medium">Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 border-gray-300 rounded"
              />
            </Form.Group>

            <Form.Group controlId="postImage">
              <Form.Label className="font-medium">Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="p-1"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-full">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostForm;
