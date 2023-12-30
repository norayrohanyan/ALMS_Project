import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';
import './UserPage.css';

const UserPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/users/data', {
          headers: {
            Authorization: token,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {/* <h1 className="title">User Profile</h1> */}
      {userData ? (
        <div className="profileCard">
          <img src='.' alt="Profile" className="profileImage" />
          <p className="profileInfo">
            <strong>Username:</strong> {userData.username}
          </p>
          <p className="profileInfo">
            <strong>Email:</strong> {userData.email}
          </p>
          {/* Add other relevant user data */}
        </div>
      ) : (
        <p className="loading">Loading user data...</p>
      )}

      <Logout />
    </div>
  );
};

export default UserPage;
