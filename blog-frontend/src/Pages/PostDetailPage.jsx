import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Container, Image, Spinner } from 'react-bootstrap';
import BACKEND_URL from '../config';
import '../index.css'; // For styles and fonts

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
      <div className="flex justify-center items-center h-screen">
        <Spinner animation="border text-blue-300" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!post) {
    return <p className="text-center">Post not found.</p>;
  }

  return (
    <Container className="mt-5">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {post.title}
      </h1>
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          alt={post.title}
          className="w-full mb-4 rounded shadow-lg "
        />
      )}
      <ReactMarkdown
        className="markdown-content text-gray-700"
        remarkPlugins={[remarkGfm]}
      >
        {post.content}
      </ReactMarkdown>
      <p className="text-gray-500 mt-4">
        <strong>Author:</strong> {post.author || 'Anonymous'}
      </p>
      <p className="text-gray-500">
        <strong>Published on:</strong> {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </Container>
  );
};

export default PostDetailPage;
