import React from 'react';
import './BorrowedBook.css';


const BorrowedBooks = ({ book }) => {
  if (!book) {
    return <p>No book information available.</p>
  }

  return (
    <div className="">
        <div className="borrowed-book-listing-wrapper">
        <div className="borrowed-book-listing">
            <img src={book.cover_url} alt={book.title} />
            <div className="borrowed-book-details">
              <p className="borrowed-book-title">{book.title}</p>
              <p className="author">{book.authors.map((author) => author).join(', ')}</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default BorrowedBooks;
