import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <header>
        <Link to = "/"><img src="/images/logo.webp" alt="logo" /></Link>
      <nav>
          <a><Link to = "/">Home</Link></a>
          <a><Link to = "/catalog">Catalog</Link></a>
          <a><Link to = "/login">Login/Registration</Link></a>
      </nav>
    </header>
  );
};

export default Header;
