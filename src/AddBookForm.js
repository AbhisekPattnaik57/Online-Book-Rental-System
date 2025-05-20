import React, { useState } from 'react';
import API from './api';

const AddBookForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/books', { title, author, genre }); // ✅ Add to backend
      props.onBookAdded(); // ✅ Refresh book list
      setTitle('');
      setAuthor('');
      setGenre('');
    } catch (err) {
      console.error("❌ Add Book Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      /><br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
