// SearchBar.js
import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" className="search-input" placeholder="Search..." />
    </div>
  );
};

export default SearchBar;
