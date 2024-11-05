import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Pagination, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../config';
import '../index.css'; // Ensure your index.css applies imported Google Fonts

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/posts?page=${currentPage}`);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="mt-5">
      <h1 className="tc f1 mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>Blog Posts</h1>
      <Row>
        {posts.map((post) => (
          <Col xs={12} className="mb-4" key={post._id}>
            <Card className="shadow-3 grow">
              {post.imageUrl && (
                <Card.Img variant="top" src={post.imageUrl} alt={post.title} className="h5 cover" />
              )}
              <Card.Body>
                <Card.Title className="f3" style={{ fontFamily: "'Poppins', sans-serif" }}>{post.title}</Card.Title>
                <Card.Text className="text-gray-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {post.content.substring(0, 150)}...
                </Card.Text>
                <Link to={`/posts/${post._id}`}>
                  <Button variant="outline-primary">Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="flex justify-center mt-4">
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
