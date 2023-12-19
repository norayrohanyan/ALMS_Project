// BookListing.js
import React from 'react';
import './BookListing.css';

const BookListing = ({ book }) => {
  return (
    <div className="book-listing">
      <img src={book.cover_url} alt={book.title} />
      <div className="book-details">
        <p className="book-title">{book.title}</p>
        <p className="author">{book.author}</p>
        <p className="availability">{book.availability ? 'Available' : 'Not Available'}</p>
      </div>
    </div>
  );
};

export default BookListing;
