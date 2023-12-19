import React, { useState } from 'react';
import axios from 'axios';
import '../components/login/Login.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users', formData);
      console.log(response.data);

      setFormData({ username: '', email: '', password: '' });
    } 
    catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="content">
        <h2>Registration</h2>
        <form onSubmit = {handleSubmit}>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input 
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
