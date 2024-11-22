import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import 'highlight.js/styles/github.css';
import { Container, Image, Spinner, Row, Col, Alert, Button } from 'react-bootstrap';
import BACKEND_URL from '../config';
import '../index.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/posts/${id}`);
        setPost(data);
      } catch (err) {
        setError('Failed to load the post. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-gray-500">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
        <div className="text-center mt-3">
          <Button variant="primary" as={Link} to="/">
            Back to Blog List
          </Button>
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          Post not found.
        </Alert>
        <div className="text-center mt-3">
          <Button variant="primary" as={Link} to="/">
            Back to Blog List
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-8 p-5 bg-white rounded-lg shadow-lg">
      {/* Title Section */}
      <Row className="mb-4">
        <Col>
          <h1 className="text-4xl font-bold text-center mb-3">{post.title}</h1>
          <p className="text-center text-gray-500 italic">
            Published on {new Date(post.createdAt).toLocaleDateString()} by{' '}
            <span className="font-semibold">{post.author || 'Anonymous'}</span>
          </p>
        </Col>
      </Row>

      {/* Image Section */}
      {post.imageUrl && (
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              className="w-full rounded-lg shadow-lg"
            />
          </Col>
        </Row>
      )}

      {/* Content Section */}
      <Row>
        <Col>
          <div className="p-4 rounded-lg shadow-sm bg-gray-100">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}
              components={{
                ul: ({ children, ...props }) => (
                  <ul className="list-disc pl-6" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="list-decimal pl-6" {...props}>
                    {children}
                  </ol>
                ),
                table: ({ children, ...props }) => (
                  <table className="table-auto border-collapse border border-gray-300" {...props}>
                    {children}
                  </table>
                ),
                th: ({ children, ...props }) => (
                  <th className="border border-gray-300 px-4 py-2 bg-gray-200" {...props}>
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td className="border border-gray-300 px-4 py-2" {...props}>
                    {children}
                  </td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </Col>
      </Row>

      {/* Author Info */}
      <Row className="mt-5">
        <Col>
          <div className="p-3 bg-gray-50 rounded-lg shadow-md">
            <p className="text-gray-700">
              <strong>Author:</strong> {post.author || 'Anonymous'}
            </p>
            <p className="text-gray-700">
              <strong>Published on:</strong> {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Col>
      </Row>

      {/* Back Button */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="primary" as={Link} to="/" className="mt-3">
            Back to Blog List
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetailPage;
