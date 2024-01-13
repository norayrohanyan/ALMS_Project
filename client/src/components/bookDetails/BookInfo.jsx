import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../../auth/authUtilies';  
import './BookInfo.css';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loan, setLoan] = useState(null);
  const [user, setUserData] = useState(null); 
  const { isbn } = useParams();
  const loggedInUserToken = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/books/bookdetails/${isbn}`);
        setBook(response.data.book);
        setLoan(response.data.loan);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response && error.response.status === 401) {
          try {
            await refreshAccessToken();
            const refreshedToken = localStorage.getItem('token');
            const refreshedResponse = await axios.get(`http://localhost:3001/api/books/bookdetails/${isbn}`, {
              headers: {
                Authorization: refreshedToken,
              },
            });
            setBook(refreshedResponse.data.book);
          } catch (refreshError) {
            console.error('Error during token refresh:', refreshError.message);
            navigate('/login');
          }
        }
      }
    };

    fetchData();
  }, [isbn, loggedInUserToken, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/data', {
          headers: {
            Authorization: loggedInUserToken,
          },
        });

        setUserData(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (loggedInUserToken) {
      fetchUserData();
    }

  }, [loggedInUserToken]);

  const handleBorrow = async () => {
    try {
      if (loggedInUserToken) {
        await refreshAccessToken();
        const refreshedToken = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:3001/api/loans/borrow/${book._id}`, {
          userId: loggedInUserToken
        }, {
          headers: {
            Authorization: refreshedToken,
          },
        });

        console.log(response.data);

        setBook((prevBook) => ({
          ...prevBook,
          availability: false,
        }));
      } else {
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error('Error borrowing the book:', error.message);
    }
    
  };

  const handleReserve = async () => {
    try {
      if (loggedInUserToken) {
        await refreshAccessToken();
        const refreshedToken = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:3001/api/loans/reserve/${book._id}`, {
          userId: loggedInUserToken
        }, {
          headers: {
            Authorization: refreshedToken,
          },
        });
        console.log(response.data)
        setLoan(response.data.loan);
        setBook((prevBook) => ({
          ...prevBook,
          availability: true,
        }));

        setLoan((prevLoan) => ({
          ...prevLoan,
        }));

      } else {
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error('Error reserving the book:', error.message);
    }
  };

  if (!book) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="book-details-container">
      <div className="book-image">
        <img src={book.cover_url} alt={book.title} />
      </div>
      <div className="book-info-container">
        <div className="book-info">
          <h2>{book.title}</h2>
          <span>Authors: {book.authors}</span>
          <span>Category: {book.category.join(', ')}</span>
          <span>ISBN: {book.isbn}</span>
          <span>Published Year: {book.published_year}</span>
          <span>Page Count: {book.additional_info.page_count}</span>
          <span>Publisher: {book.additional_info.publisher}</span>
          <span>Language: {book.additional_info.language}</span>
        </div>
        <span className="online-version">
          Online Version:{' '}
          <a href={book.online_version_url} target="_blank" rel="noopener noreferrer">
            Read Online
          </a>
        </span>
        <span>Location: Shelf {book.location.shelf}, Row {book.location.row}</span>
        <div className='borrow-reserve-options-wrapper'>
          <span className={book.availability ? 'aviability-aviable' : 'aviability-unaviable'}>
            {book.availability ? 'Available' : 'Unavailable'}
          </span>
          <div className="borrow-reserve-options">
            {book.availability && <button onClick={handleBorrow}>Borrow</button>}
            {!book.availability && loan?.user && user?.id && loan?.user === user.id && <button onClick={handleReserve}>Reserve</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
