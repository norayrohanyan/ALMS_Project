import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../components/login/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/users/login', formData);
            console.log(response.data);

            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
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
                    <a className="link" href="#">Forgot Password</a>
                    <Link to="/registration">Switch to Registration</Link>
                </div>
            </div>
        </section>
    );
};

export default Login;
