import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Book from '../Book';
import './RecentAdditions.css';

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow prev`} onClick={onClick}></div>;
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow next`} onClick={onClick}></div>;
};

const RecentAdditions = () => {
  const [recentAdditions, setRecentAdditions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books', {
          params: {
            filter: 'All books',
          }
        });
        setRecentAdditions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true, 
    centerPadding: '0',
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="recent-additions">
      <h2>Recent Additions</h2>
      <Slider {...settings}>
        {recentAdditions.map((book) => (
          <div key={book.isbn}>
            <Book book={book} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecentAdditions;
