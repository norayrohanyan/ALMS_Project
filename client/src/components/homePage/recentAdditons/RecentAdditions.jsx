import React, { useState } from 'react';
import './RecentAdditions.css';

const RecentAdditions = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const recentAdditions = [
    { id: 1, title: 'JavaScript Definitive Guide', author: 'David Flanagan', path: '/images/book1.png' },
    { id: 2, title: 'Grokking Algorithms', author: 'Aditya Y. Bhargava', path: '/images/book2.png' },
    { id: 3, title: 'Version Control with git', author: 'O. Reilly', path: '/images/book3.png' },
    { id: 4, title: 'This & Object Prototypes', author: 'Kyle Simpson', path: '/images/book4.png' },
    { id: 5, title: 'Introduction to Algorithms', author: 'Thomas Cormen', path: '/images/book5.png' },
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(recentAdditions.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleBooks = recentAdditions.slice(startIndex, endIndex);

  return (
    <section className="recent-additions">
      <h2>Recent Additions</h2>
      <div className="carousel">
        {visibleBooks.map((book) => (
          <div key={book.id} className="carousel-item">
            <img src={book.path} alt={book.title} />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
      <div className="prev-arrow" onClick={handlePrev}>
        &#9664;
      </div>
      <div className="next-arrow" onClick={handleNext}>
        &#9654;
      </div>
    </section>
  );
};

export default RecentAdditions;
