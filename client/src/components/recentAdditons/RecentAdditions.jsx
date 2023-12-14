import React from 'react';

const RecentAdditions = () => {
  // Mock data for recent additions
  const recentAdditions = [
    { id: 1, title: 'Book 1', thumbnail: 'path-to-thumbnail-1' },
    // Add more books as needed
  ];

  return (
    <section className="recent-additions">
      <h2>Recent Additions</h2>
      <div className="carousel">
        {recentAdditions.map(book => (
          <div key={book.id} className="carousel-item">
            <img src={book.thumbnail} alt={book.title} />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentAdditions;
