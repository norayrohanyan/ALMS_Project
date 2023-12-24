import React, { useState } from 'react';
import axios from 'axios';
import '../components/login/Login.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role : 'USER',
  });

  // const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/users/registration', formData);
      console.log(response.data);

      setFormData({ username: '', email: '', password: '' });
    } 
    catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <span className='login-title'>Registration</span>
        <form onSubmit = {handleSubmit}>
        <div className="input-container">
            <label htmlFor="username"></label>
            <input
              className='form-field'
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-container">
            <label htmlFor="email"></label>
            <input 
              className='form-field'
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-container">
            <label htmlFor="password"></label>
            <input 
              className='form-field'
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
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
