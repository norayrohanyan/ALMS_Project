import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logout from '../../pages/Logout';
import { refreshAccessToken } from '../../auth/authUtilies';
import './UserInfo.css';

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);

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

        if (error.response && error.response.status === 401) {
          try {
            const newAccessToken = await refreshAccessToken();
            const originalResponse = await axios.get('http://localhost:3001/api/users/data', {
              headers: {
                Authorization: newAccessToken,
              },
            });

            setUserData(originalResponse.data);
          } catch (refreshError) {
            console.error('Error during token refresh:', refreshError.message);
            
            localStorage.removeItem('token');
            localStorage.removeItem('refreshtoken');
            navigate('/login');
          }
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="user-info-container">
      {userData ? (
        <div className="profileCard">
          <div className="profile-info">
            <img src='/images/user-placeholder.png' alt="Profile" className="profileImage" />
            <div className="profile-text">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
            <Logout />
          </div>
        </div>
      ) : (
        <p className="loading">Loading user data...</p>
      )}
    </div>
  );
};

export default UserInfo;
