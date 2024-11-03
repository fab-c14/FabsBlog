import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../config';
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/posts?page=${currentPage}`);
        setPosts(data.posts);
        console.log(data.posts);
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
    <Container>
      <Row>
        {posts.map((post) => (
          <Col key={post._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={post.imageUrl || '/default-image.jpg'} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                <Link to={`/posts/${post._id}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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
    </Container>
  );
};

export default PostList;
