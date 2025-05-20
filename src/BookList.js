import React, { useEffect, useState } from 'react';
import API from './api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAuthor, setUpdatedAuthor] = useState('');
  const [updatedGenre, setUpdatedGenre] = useState('');

  // 🔃 Load books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // 📥 Fetch books from backend
  const fetchBooks = async () => {
    try {
      const response = await API.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  // 🗑️ Delete book
  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("❌ Delete Error:", err);
    }
  };

  // ✏️ Start editing a book
  const startEditing = (book) => {
    setEditingBook(book.id);
    setUpdatedTitle(book.title);
    setUpdatedAuthor(book.author);
    setUpdatedGenre(book.genre);
  };

  // 💾 Save updated book
  const handleUpdate = async (id) => {
    try {
      await API.put(`/books/${id}`, {
        title: updatedTitle,
        author: updatedAuthor,
        genre: updatedGenre,
      });
      setEditingBook(null); // stop editing
      fetchBooks(); // refresh list
    } catch (err) {
      console.error("❌ Update Error:", err);
    }
  };

  return (
    <div>
      <h2>📚 Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {editingBook === book.id ? (
              <>
                <input
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  value={updatedAuthor}
                  onChange={(e) => setUpdatedAuthor(e.target.value)}
                  placeholder="Author"
                />
                <input
                  value={updatedGenre}
                  onChange={(e) => setUpdatedGenre(e.target.value)}
                  placeholder="Genre"
                />
                <button onClick={() => handleUpdate(book.id)}>✅ Save</button>
                <button onClick={() => setEditingBook(null)}>❌ Cancel</button>
              </>
            ) : (
              <>
                <strong>{book.title}</strong> by {book.author} ({book.genre}) &nbsp;
                <button onClick={() => startEditing(book)}>✏️ Edit</button>
                <button onClick={() => handleDelete(book.id)}>🗑️ Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
