import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../components/login/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === 'email') {
            setEmailError('');
        } else if (name === 'password') {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/users/login', formData);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshtoken', response.data.refreshToken);
                navigate('/userPage');
                window.location.reload();
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 404) {
                    setEmailError('User not found. Please check your email.');
                } else if (status === 401) {
                    setPasswordError('Incorrect password. Please try again.');
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <section className="form-container">
            <div className="form-content">
                <span className="login-title">Login</span>
                <form onSubmit={handleSubmit}>
                    <div className={`input-container ${emailError ? 'error' : ''}`}>
                        <input
                            className={`form-field ${emailError ? 'error' : ''}`}
                            type="email"
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
                        Login
                    </button>
                </form>
                <div className="form-links">
                    <a className="link" href="#">
                        Forgot Password
                    </a>
                    <Link to="/registration">Switch to Registration</Link>
                </div>
            </div>
        </section>
    );
}

export default Login;
