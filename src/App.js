// ✅ App.js
import React from 'react';
import BookList from './BookList'; // ✅ No curly braces, correct path

function App() {
  return (
    <div className="App">
      <h1>📘 Online Book Rental</h1>
      <BookList />
    </div>
  );
}

export default App;
