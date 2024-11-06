import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css'; // Ensure this includes the Google Fonts
import BACKEND_URL from '../config';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {post.title}
      </h1>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-auto mb-4 rounded-lg shadow-md"
        />
      )}
      <p className="text-lg leading-relaxed text-gray-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {post.content}
      </p>
    </div>
  );
};

export default PostDetailPage;
