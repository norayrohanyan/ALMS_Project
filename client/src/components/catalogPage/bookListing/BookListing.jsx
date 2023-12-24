// BookListing.js
import React from 'react';
import './BookListing.css';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, config } from 'react-spring';

const BookListing = ({ book }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: config.molasses,
  });
  return (
    <animated.div ref={ref} style={fadeIn} className="">
      <div className="book-listing-wrapper">
        <div className="book-listing">
          <img src={book.cover_url} alt={book.title} />
          <div className="book-details">
            <p className="book-title">{book.title}</p>
            <p className="author">{book.authors.map((author) => author).join(', ')}</p>
            <p className="availability">{book.availability ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      </div>
    </animated.div>

  );
};

export default BookListing;


