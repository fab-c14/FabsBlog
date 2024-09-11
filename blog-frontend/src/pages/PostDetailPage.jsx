import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import axios from 'axios';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <Container>
      <h1>{post.title}</h1>
      {post.imageUrl && <Image src={post.imageUrl} fluid />}
      <p>{post.content}</p>
    </Container>
  );
};

export default PostDetailPage;
