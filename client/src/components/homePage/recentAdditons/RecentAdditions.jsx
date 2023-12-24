import React, { useState, useEffect, useRef } from 'react';
import './RecentAdditions.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Book from '../Book';

const RecentAdditions = () => {
  const [recentAdditions, setRecentAdditions] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books');
        setRecentAdditions(response.data);
        setDisplayedBooks(response.data.slice(0, visibleCount));
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [visibleCount]);

  const handleArrowClick = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) );
    } else if (direction === 'prev') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 ));
    }
  };

 
  useEffect(() => {
    setDisplayedBooks(recentAdditions.slice(currentIndex, currentIndex + visibleCount));
  }, [currentIndex, recentAdditions, visibleCount]);


  return (
    <div className="recent-additions">
      <h2>Recent Additions</h2>
      <div className="carousel">
        {displayedBooks.map((book) => (
          <Book key={book.isbn} book={book} />
        ))}
      </div>
      <div className="arrows">
        <span className="prev-arrow" onClick={() => handleArrowClick('prev')}>←</span>
        <span className="next-arrow" onClick={() => handleArrowClick('next')}>→</span>
      </div>
    </div>
  );
};

export default RecentAdditions;
