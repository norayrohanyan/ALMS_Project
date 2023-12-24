import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RelatedBooks.css';
import Book from '../homePage/Book';

const RelatedBooks = () => {
    const [books, setRecentAdditions] = useState([]);
    // const [displayedBooks, setDisplayedBooks] = useState([]);
    // const [visibleCount, setVisibleCount] = useState(3);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/books');
          setRecentAdditions(response.data);
        //   setDisplayedBooks(response.data.slice(0, visibleCount));
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      fetchData();
    }, []);

    const shuffledBooks = [...books].sort(() => Math.random() - 0.5);

    return (
        <div>
            <h2 className='related-books-title'>Related Books</h2>
            <div className='related-books'>
                {shuffledBooks.slice(0, 3).map((book) => (
                    <Link to = {`/bookdetails/${book.isbn}`}> <Book key={book.isbn} book={book} /></Link>
                ))}
            </div>
        </div>
    );
}

export default RelatedBooks;