import React, { useEffect, useState } from 'react';
import API from './api';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get('')
      .then(res => {
        console.log("📦 Data from backend:", res.data);  // ✅ Step 1
        setBooks(res.data);
      })
      .catch(err => console.error("❌ API Error:", err));
  }, []);

  return (
    <div>
      <h2>📚 Book List</h2>
      {books.map(book => {
        console.log("📘 Individual Book:", book);        // ✅ Step 2
        return (
          <div key={book.id}>
            <strong>{book.title}</strong> by {book.author} [{book.genre}]
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
