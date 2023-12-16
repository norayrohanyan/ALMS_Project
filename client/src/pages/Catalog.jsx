// CatalogPage.js
import React from 'react';
import SearchBar from '../components/catalogPage/searchBar/SearchBar';
import FilterBar from '../components/catalogPage/filterBar/FilterBar';
import BookListing from '../components/catalogPage/bookListing/BookListing';
import './Catalog.css';

const Catalog = () => {
  // Sample book data
  const books = [
    { id: 1, title: 'JavaScript Definitive Guide', author: 'David Flanagan', path: '/images/book1.png' },
    { id: 2, title: 'Grokking Algorithms', author: 'Aditya Y. Bhargava', path: '/images/book2.png' },
    { id: 3, title: 'Version Control with git', author: 'O. Reilly', path: '/images/book3.png' },
    { id: 4, title: 'This & Object Prototypes', author: 'Kyle Simpson', path: '/images/book4.png' },
    { id: 5, title: 'Introduction to Algorithms', author: 'Thomas Cormen', path: '/images/book5.png' },
  ];

  return (
    <div className="catalog-page">
      <div className="main-area">
        <div className="search-and-filter">
          <SearchBar />
          <FilterBar />
        </div>
        <div className="book-listings">
          {books.map((book) => (
            <BookListing key={book.id} book={book} />
          ))}
        </div>
        <button className="load-more">Load More</button>

      </div>

      {/* Add footer if needed */}
    </div>
  );
};

export default Catalog;
