import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
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
      <h1 className="tc f1 bg-red-300 rounded-lg px-3 py-3 shadow-xl " style={{ fontFamily: "'Poppins', sans-serif" }}>Blog Posts</h1>
      <Row>
        {posts.map((post) => (
          <Col xs={12} key={post._id}>
            <div className="post bg-gray-100 p-4 mb-4 rounded-lg shadow-xl d-flex align-items-center hover:bg-yellow-100 hover:cursor-pointer border-blue-800 hover:border-x-2 transition duration-400">
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="w-25 mr-4 rounded" />
              )}
              <div className="flex-grow-1">
                <h2 className="f2 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>{post.title}</h2>
                <p className="text-gray-700 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {post.content.substring(0,700)}...
                </p>
                {/* Uncomment below lines if you add a detailed view */}
                {/* <Link to={`/posts/${post._id}`}>
                  <Button variant="outline-primary">Read More</Button>
                </Link> */}
              </div>
            </div>
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
