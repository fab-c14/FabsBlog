import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw'; // Allow raw HTML rendering
import 'highlight.js/styles/github.css'; // GitHub-like code block styling
import BACKEND_URL from '../config';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate a local preview URL
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', 'fab-c14');
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
    <Container className="mt-8 p-4 bg-white rounded-xl shadow-lg">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Form */}
          <Form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <Form.Group controlId="postTitle">
              <Form.Label className="font-medium">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border-gray-300 py-3 pl-3 shadow-xl"
              />
            </Form.Group>

            {/* Content */}
            <Form.Group controlId="postContent">
              <Form.Label className="font-medium">
                Content (Supports Markdown)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter post content (Markdown supported)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 border-gray-300 rounded shadow-xl"
              />
              <small className="text-gray-500">
                You can use Markdown syntax like:
                <ul>
                  <li><code>**bold**</code> for bold text</li>
                  <li><code>_italic_</code> for italic</li>
                  <li><code>`code`</code> for inline code</li>
                  <li><code>```js</code> for code blocks</li>
                  <li><code>&gt;</code> for blockquotes</li>
                </ul>
              </small>
            </Form.Group>

            {/* Image Upload */}
            <Form.Group controlId="postImage">
              <Form.Label className="font-medium">Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                className="p-1 shadow-xl"
              />
              {imagePreview && (
                <div className="mt-3">
                  <p className="font-medium">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Selected Preview"
                    className="w-full max-h-64 rounded-lg shadow-md object-cover"
                  />
                </div>
              )}
            </Form.Group>

            {/* Markdown Preview Toggle */}
            <Button
              variant="secondary"
              type="button"
              className="mt-3 me-2"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Edit Mode' : 'Preview Mode'}
            </Button>

            <Button variant="primary" type="submit" className="mt-3 w-full">
              Submit
            </Button>
          </Form>

          {/* Markdown Preview */}
          {previewMode && (
            <div className="mt-6 p-4 bg-gray-100 rounded shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Markdown Preview</h3>
              <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                className="prose"
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PostForm;
