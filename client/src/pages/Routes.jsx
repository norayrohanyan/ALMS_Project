import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Catalog from './Catalog';
import Login from './Login';
import Registration from './Registration';
import BookDetails from './BookDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/bookdetails/:isbn" element={<BookDetails />} />
    </Routes>
  );
};

export default AppRoutes;
