import React from 'react';
import './FeaturedBooks.css'

const FeaturedBooks = () => {
  // Mock data for featured books
  const featuredBooks = [
    { id: 1, title: 'JavaScript Definitive Guide', author: 'David Flanagan', path: '/images/book1.png' },
    { id: 2, title: 'Version Control with git', author: 'O. Reilly', path: '/images/book3.png' },
    { id: 3, title: 'Intoduction to Algorithms', author: 'Thomas Cormen', path: '/images/book5.png' },

  ];

  return (
    <section className = "featured-books">
      <h2>Featured Books</h2>
      <div className = "books">
        {featuredBooks.map(book => (
          <div key = {book.id} className = "book">
            <img src = {book.path} alt = {book.title} />
            <p>{book.title}</p>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
      <button className="view-all-button">View All</button>
    </section>
  );
};

export default FeaturedBooks;
