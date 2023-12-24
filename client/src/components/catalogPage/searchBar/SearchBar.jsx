import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ onSearchResults }) => {

  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/books/search?query=${query}`);
      onSearchResults(response.data);
    } catch (error) {
      console.error('Error during search:', error.message);
    }
  };
  return (
    <div className="search-bar">
      <input  type="text" className="search-input" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)}/>
      <button className="search-button" onClick={handleSearch}>🔍</button>
    </div>
  );
};

export default SearchBar;
