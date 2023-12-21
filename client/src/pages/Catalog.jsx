// CatalogPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../components/catalogPage/searchBar/SearchBar';
import FilterBar from '../components/catalogPage/filterBar/FilterBar';
import BookListing from '../components/catalogPage/bookListing/BookListing';
import './Catalog.css';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books');
        setBooks(response.data);
        setDisplayedBooks(response.data.slice(0, visibleCount));
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [visibleCount]);

  const loadMoreBooks = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="catalog-page">
      <div className="main-area">
        <div className="search-and-filter">
          <SearchBar />
          <FilterBar />
        </div>
        <div className="book-listings">
          {displayedBooks.map((book) => (
            <Link to = {`/bookdetails/${book.isbn}`}> <BookListing key={book.isbn} book={book} /></Link>
          ))}
        </div>
        {visibleCount < books.length && (
          <button className="load-more" onClick={loadMoreBooks}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Catalog;
