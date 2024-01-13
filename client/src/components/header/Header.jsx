import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

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
      </nav>
    </header>
  );
};

export default Header;
