import React from 'react';
import WelcomeBanner from '../components/homePage/welcomeBanner/WelcomeBanner'
import FeaturedBooks from '../components/homePage/featuredBooks/FeaturedBooks';
import RecentAdditions from '../components/homePage/recentAdditons/RecentAdditions';

const Home = () => {
  return (
    <div>
      <WelcomeBanner />
      <FeaturedBooks />
      <RecentAdditions />
    </div>
  );
};

export default Home;
