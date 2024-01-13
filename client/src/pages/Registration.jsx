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

    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
    
      setUsernameError('');
      setEmailError('');
      setPasswordError('');
    
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/api/users/registration', formData);
      console.log(response.data);
  
      setFormData({ username: '', email: '', password: '' });
      setUsernameError('');
      setEmailError('');
      setPasswordError('');
    } catch (error) {
      console.error('Error during registration:', error.message);
      if (error.response) {
        const { status, data } = error.response;
        console.log(status, data.error);
        if (status === 400 && data.errors) {
          data.errors.forEach((validationError) => {
            if (validationError.path === 'email') {
              console.log(validationError);
              setEmailError(validationError.msg);
            } else if (validationError.path === 'password') {
              console.log(validationError.msg);
              setPasswordError(validationError.msg);
            } else if (validationError.path === 'username') {
              console.log(validationError.msg);
              setUsernameError(validationError.msg);
            } else if (validationError.name === 'ValidationError') {
              setEmailError(validationError.message);
            }
          });
        } else if (status === 400 && data.error){
          setEmailError(data.error);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  
  

  return (
    <div className="form-container">
      <div className="form-content">
        <span className='login-title'>Registration</span>
        <form onSubmit={handleSubmit}>
            <div className={`input-container ${usernameError ? 'error' : ''}`}>
                <input
                    className={`form-field ${usernameError ? 'error' : ''}`}
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=" "
                />
                <label htmlFor="username" className={usernameError ? 'label-error' : ''}>
                    Username
                </label>
                {usernameError && <div className="error-message-field">{usernameError}</div>}
            </div>
            <div className={`input-container ${emailError ? 'error' : ''}`}>
                <input
                    className={`form-field ${emailError ? 'error' : ''}`}
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                />
                <label htmlFor="email" className={emailError ? 'label-error' : ''}>
                    Email
                </label>
                {emailError && <div className="error-message-field">{emailError}</div>}
            </div>
            <div className={`input-container ${passwordError ? 'error' : ''}`}>
                <input
                    className={`form-field ${passwordError ? 'error' : ''}`}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                />
                <label htmlFor="password" className={passwordError ? 'label-error' : ''}>
                    Password
                </label>
                {passwordError && <div className="error-message-field">{passwordError}</div>}
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
