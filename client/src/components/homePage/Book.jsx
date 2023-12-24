import { Link } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import './Book.css';

const Book = ({ book }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
    });
  
    const fadeIn = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      config: config.molasses,
    });
  
    return (
      <animated.div ref={ref} style={fadeIn} className="">
        <Link to={`/bookdetails/${book.isbn}`} key={book.isbn}>
          <div className="recent-book-details-wrapper">
            <img src={book.cover_url} alt={book.title} />
            <div className="recent-book-details">
              <p className="book-title">{book.title}</p>
              <p className="author">{book.authors.map((author) => author).join(', ')}</p>
              <p className="availability">{book.availability ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        </Link>
      </animated.div>
    );
  };

export default Book;