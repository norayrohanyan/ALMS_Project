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
        const response = await axios.get('http://localhost:3001/api/books', {
          params: {
            filter: 'All books',
            limit: 3,
            offset: Math.random() * 10,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featured-books">
      <h2>Featured Books</h2>
      <div className="books">
        {books.map((book, index) => (
          <Book key={index} book={book} />
        ))}
      </div>
      <Link to='/catalog'> <button className="view-all-button">View All</button></Link> 
    </div>
  );
};

export default FeaturedBooks;
