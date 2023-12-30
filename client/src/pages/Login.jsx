import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import '../components/login/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already authenticated
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/userpage');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', formData);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                // Reload the page after successful login
                window.location.reload();
            } else {
                alert('Login failed. Check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return (
        <section className="form-container">
            <div className="form-content">
                <span className="login-title">Login</span>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            className="form-field"
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
                        <input
                            className="form-field"
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
                        Submit
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
};

export default Login;
