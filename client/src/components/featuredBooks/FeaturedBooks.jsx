import React from 'react';

const FeaturedBooks = () => {
  // Mock data for featured books
  const featuredBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', thumbnail: 'path-to-thumbnail-1' },
    // Add more books as needed
  ];

  return (
    <section className="featured-books">
      <h2>Featured Books</h2>
      <div className="books-grid">
        {featuredBooks.map(book => (
          <div key={book.id} className="book">
            <img src={book.thumbnail} alt={book.title} />
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
