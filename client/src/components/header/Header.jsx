import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Function to handle logout
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setIsLoggedIn(false);
  //};

  return (
    <header>
      <Link to="/">
        <img src="/images/logo.webp" alt="logo" />
      </Link>
      <nav>
        <div className="text-container">
          <a>
            <Link to="/">Home</Link>
          </a>
        </div>
        <div className="text-container">
          <a>
            <Link to="/catalog">Catalog</Link>
          </a>
        </div>    
        {isLoggedIn ? (
          <div className="user-image">  
            <Link to="/userpage">
              <img src="/images/user-placeholder.png" alt="user" />
            </Link>
          </div>
        ) : (
          <div className="text-container">
            <a>
              <Link to="/login">Login/Registration</Link>
            </a>
          </div>
        )}
        {/* {isLoggedIn && (
          // Render a logout link for logged-in users
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        )} */}
      </nav>
    </header>
  );
};

export default Header;
