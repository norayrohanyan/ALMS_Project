import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer>
        <section class="contact">
            <h5>Contact us</h5>
            <div class="contact-content">
                <p>Academy Address</p>
                <p>City, State Zip</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@academy.com</p>
            </div>
        </section>
        <section class="library-hours">
            <h5>Library Hours</h5>
            <div class="library-hours-content">
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
            </div>
        </section>
        <section class="helpful-links">
            <h5>Helpful Links</h5>
            <div class="helpful-links-content">
                <a href="#">Academy Website</a>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Feedback Form</a>
            </div>
        </section>
    </footer>
  );
};

export default Footer;
