import React from 'react';
import { useSpring, animated } from 'react-spring';
import './WelcomeBanner.css';

const WelcomeBanner = () => {
  const fadeInHeading = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  return (
    <main>
      <section className="banner">
        <section className="banner-content">
          <animated.h1 style={fadeInHeading}>Our Library</animated.h1>
          <animated.h2 style={fadeInHeading}>Collection of Books</animated.h2>
        </section>
      </section>
    </main>
  );
};

export default WelcomeBanner;
