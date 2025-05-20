import PaymentForm from './PaymentForm';
import React, { useEffect, useState } from 'react';
import './App.css';
import API from './api';
import BookList from './BookList';
import AddBookForm from './AddBookForm';

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    console.log("📦 Fetching books...");
    try {
      const response = await API.get('/books');
      console.log("✅ Books fetched:", response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(); // ⬅️ this runs once on page load
  }, []);

  return (
    <div>
        <h1>📘 Online Book Rental</h1>
      <AddBookForm onBookAdded={fetchBooks} />
      <BookList books={books} onDelete={fetchBooks} />
      <PaymentForm />
    </div>
  );
};

export default App;
