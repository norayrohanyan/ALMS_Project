import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserPage/UserInfo';
import BorrowedBooks from '../components/UserPage/BorrowedBook';
import { refreshAccessToken } from '../auth/authUtilies'; 
import '../components/UserPage/UserPage.css';

const UserPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const loggedInUserId = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/loans/borrowed-books', {
          userId: loggedInUserId,
        });

        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error.message);
        if (error.response && error.response.status === 401) {
          try {
            await refreshAccessToken();
            const originalResponse = await axios.post('http://localhost:3001/api/loans/borrowed-books', {
              userId: loggedInUserId,
            });

            setBorrowedBooks(originalResponse.data);
          } catch (refreshError) {
            console.error('Error during token refresh:', refreshError.message);
            navigate('/login');
          }
        }
      }
    };

    fetchBorrowedBooks();
  }, [loggedInUserId, navigate]);

  return (
    <div className="container">
      <UserInfo />
      <div className="borrowed-book-listings">
        <h2>Borrowed Books</h2>
        {borrowedBooks.length > 0 ? (
          borrowedBooks?.map((book) => (
            <Link to={`/bookdetails/${book.isbn}`} key={book.isbn}>
              <BorrowedBooks book={book} />
            </Link>
          ))
        ) : (
          <p>No borrowed books found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;