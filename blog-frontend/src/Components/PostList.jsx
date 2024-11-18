import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BACKEND_URL from '../config';
import '../index.css'; // Ensure fonts and custom styles are imported

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/posts?page=${currentPage}`);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="mt-5">
      <h1
        className="text-center text-4xl font-bold py-3 mb-4 rounded shadow-xl bg-red-300"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Blog Posts
      </h1>
      <Row>
        {posts.map((post) => (
          <Col xs={12} md={6} lg={4} key={post._id} className="mb-4">
            <div
              className="bg-gray-100 p-4 rounded-lg shadow-xl border hover:transform hover:scale-125 hover:z-10 hover:bg-yellow-100 hover:shadow-2xl transition duration-300 relative"
              style={{ overflow: 'hidden' }}
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="rounded mb-3 w-full h-40 object-cover"
                />
              )}
              <h2
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {post.title}
              </h2>

              {/* Markdown Rendering */}
              <ReactMarkdown
                className="markdown-content text-gray-700 mb-4"
                remarkPlugins={[remarkGfm]}
              >
                {typeof post.content === 'string'
                  ? post.content.substring(0, 100) + '...'
                  : 'Invalid content format'}
              </ReactMarkdown>

              <div className="text-center">
              <Link
                to={`/posts/${post._id}`}
                className="text-blue-500 hover:underline font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Read More
              </Link>

              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Container>
  );
};

export default PostList;
