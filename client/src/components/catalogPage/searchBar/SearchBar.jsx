import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (query.trim() !== '') {
        handleSearch();
      } else {
        onSearchResults([]);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/books/search?query=${query}`);
      onSearchResults(response.data);
    } catch (error) {
      console.error('Error during search:', error.message);
      if (error.response && error.response.status === 404) {
        onSearchResults(null);
      }
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;