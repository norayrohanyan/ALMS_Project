import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../components/catalogPage/searchBar/SearchBar';
import FilterBar from '../components/catalogPage/filterBar/FilterBar';
import BookListing from '../components/catalogPage/bookListing/BookListing';
import '../components/catalogPage/Catalog.css';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchResults, setSearchResults] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All books');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books', {
          params: {
            limit: visibleCount,
            filter: currentFilter,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [visibleCount, currentFilter]);

  const loadMoreBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books', {
        params: {
          limit: 6,
          offset: visibleCount,
          filter: currentFilter,
        },
      });

      setBooks([...books, ...response.data]);
      setVisibleCount((prevCount) => prevCount + 6);
    } catch (error) {
      console.error('Error fetching more books:', error.message);
    }
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleFilterChange = async (filter) => {
    try {
      const response = await axios.get('http://localhost:3001/api/books', {
        params: {
          limit: visibleCount,
          filter: filter,
        },
      });

      setBooks(response.data);
      setVisibleCount(6);
      setCurrentFilter(filter);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="catalog-page">
      <div className="main-area">
        <div className="search-and-filter">
          <SearchBar onSearchResults={handleSearchResults} />
          <FilterBar filterOptions={['All books', 'C++', 'JavaScript', 'Python', 'Java', 'OOAD']} onFilterChange={handleFilterChange} />
        </div>
        <div className="book-listings">
          {searchResults == null ? (
            <p>No results found.</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((book) => (
              <Link key={book.isbn} to={`/bookdetails/${book.isbn}`}>
                <BookListing book={book} />
              </Link>
            ))
          ) : (
            books.map((book) => (
              <Link key={book.isbn} to={`/bookdetails/${book.isbn}`}>
                <BookListing book={book} />
              </Link>
            ))
          )}
        </div>

        {visibleCount <= books.length && (
          <button className="load-more" onClick={loadMoreBooks}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Catalog;
