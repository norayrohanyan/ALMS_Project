// BookListing.js
import React from 'react';
import './BookListing.css';

const BookListing = ({ book }) => {
  return (
    <div className="book-listing">
      <img src={book.path} alt={book.title} />
      <div className="book-details">
        <p className="book-title">{book.title}</p>
        <p className="author">{book.author}</p>
        <p className="availability">{book.availability}</p>
      </div>
    </div>
  );
};

export default BookListing;
