import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  };

  const handlePostCreated = (newPost) => {
    setPosts([...posts, newPost]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to SkillSync AI. Your platform for AI-powered skill matching and development.</p>
      <CreatePost onPostCreated={handlePostCreated} />
      <h3>Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
