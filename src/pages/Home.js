import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(5); // Number of posts per page
  const [searchTerm, setSearchTerm] = useState(''); // State to handle search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the current posts to display based on pagination
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to SkillSync AI. Your platform for AI-powered skill matching and development.</p>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <h3>Posts</h3>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default Home;