import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { isbn } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/bookdetails/${isbn}`);
        setBook(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [isbn]);

  if (!book) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="book-details-container">
      <div className="book-image">
        <img src={book.cover_url} alt={book.title} />
      </div>
      <div className="book-info-container">
        <div className="book-info">
          <h2>{book.title}</h2>
          <span>Authors: {book.authors}</span>
          <span>Category: {book.category.join(', ')}</span>
          <span>ISBN: {book.isbn}</span>
          <span>Published Year: {book.published_year}</span>
          <span>Page Count: {book.additional_info.page_count}</span>
          <span>Publisher: {book.additional_info.publisher}</span>
          <span>Language: {book.additional_info.language}</span>
        </div>
        <span className="online-version">
          Online Version:{' '}
          <a href={book.online_version_url} target="_blank" rel="noopener noreferrer">
            Read Online
          </a>
        </span>
        <span>Location: Shelf {book.location.shelf}, Row {book.location.row}</span>
        <div className='borrow-reserve-options-wrapper'>
          <span className={book.availability ? 'aviability-aviable' : 'aviability-unaviable'}>
            {book.availability ? 'Available' : 'Not Available'}
          </span>
          <div className="borrow-reserve-options">
            <button>Borrow</button>
            <button>Reserve</button>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default BookDetails;
