import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/posts', { title, body })
      .then((response) => {
        onPostCreated(response.data);
        setTitle('');
        setBody('');
      })
      .catch((error) => {
        console.error('There was an error creating the post!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Post</h3>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreatePost;