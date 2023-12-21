import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../components/login/Login.css'

const Login = () => {
    return (
        
        <section className="form-container">
            <div className="content">           
                <span className='login-title'>Login</span>
                <form>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input className="form-field" type="text" id="username" name="username" />
                    <label htmlFor="password">
                        Password
                    </label>
                    <input className="form-field" type="password" id="password" name="password" />
                    <button className="submit-button" type="submit">Submit</button>
                </form>
                <div className="form-links">
                    <a className="link" href="#">Forgot Password</a>
                    <a> <Link to = '/registration'>Switch to Registration/Login</Link></a>
                </div>
            </div>
        </section>
    )
}

export default Login