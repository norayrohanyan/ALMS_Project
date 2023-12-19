// CatalogPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/catalogPage/searchBar/SearchBar';
import FilterBar from '../components/catalogPage/filterBar/FilterBar';
import BookListing from '../components/catalogPage/bookListing/BookListing';
import './Catalog.css';

const Catalog = () => {
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books'); // Update with your Express.js server URL
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="catalog-page">
      <div className="main-area">
        <div className="search-and-filter">
          <SearchBar />
          <FilterBar />
        </div>
        <div className="book-listings">
          {books.map((book) => (
            <BookListing key={book.isbn} book={book} />
          ))}
        </div>
        <button className="load-more">Load More</button>

      </div>

      {/* Add footer if needed */}
    </div>
  );
};

export default Catalog;
