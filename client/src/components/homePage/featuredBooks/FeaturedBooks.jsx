import React, { useState, useEffect } from 'react';
import './FeaturedBooks.css';
import axios from 'axios';
import Book from '../Book';
import { Link } from 'react-router-dom'

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const shuffledBooks = [...books].sort(() => Math.random() - 0.5);

  return (
    <div className="featured-books">
      <h2>Featured Books</h2>
      <div className="books">
        {shuffledBooks.slice(0, 3).map((book, index) => (
          <Book key={index} book={book} />
        ))}
      </div>
      <Link to='/catalog'> <button className="view-all-button">View All</button></Link> 
    </div>
  );
};

export default FeaturedBooks;
