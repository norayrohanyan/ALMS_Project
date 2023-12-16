// FilterOptions.js
import React from 'react';
import './FilterBar.css';

const FilterBar = () => {
  return (
    <div className="filter-options">
      <span className="filter-title">Filter Options</span>
      <div className="filter-option">All books</div>
      <div className="filter-option">Fiction</div>
      <div className="filter-option">Non-Fiction</div>
      <div className="filter-option">Biography</div>
      <div className="filter-option">History</div>
      <button className="reset-filters">Reset Filters</button>
    </div>
  );
};

export default FilterBar;
