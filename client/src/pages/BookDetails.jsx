// BookPage.js
import React from 'react';
import RecentAdditions from '../components/homePage/recentAdditons/RecentAdditions';
import '../components/bookDetails/BookDetails.css'; // Style as needed

const BookDetails = ({ bookData }) => (
  <div className="book-page">
    <div className="book-details">
      <div className="cover-image">
        <img src='' alt= "title" />
      </div>
      <div className="text-details">
        <p className="title">title</p>
        <p className="author">author</p>
        <p className="genre">genre</p>
        <p className="synopsis">synopsis</p>
      </div>
    </div>

    <div className="borrow-reserve-options">
      <p className="text">Borrow/Reserve options</p>
      <button className="borrow-button">Borrow</button>
      <button className="reserve-button">Reserve</button>
    </div>

    <RecentAdditions />
  </div>
);

export default BookDetails;
