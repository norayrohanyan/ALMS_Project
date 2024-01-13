import React, { useState, useEffect } from 'react';
import './FilterBar.css';

const FilterBar = ({ filterOptions, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('All books');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  const resetFilters = () => {
    setSelectedFilter('All books');
    onFilterChange('All books');
  };

  return (
    <div className="filter-options">
      <span className="filter-title">Filter Options</span>
      {filterOptions.map((filter) => (
        <div
          key={filter}
          className={`filter-option ${selectedFilter === filter ? 'active' : ''}`}
          onClick={() => handleFilterChange(filter)}
        >
          {filter}
        </div>
      ))}
      <button className="reset-filters" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;





