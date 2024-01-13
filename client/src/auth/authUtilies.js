import axios from 'axios';

const refreshAccessToken = async () => {
  try {
    const storedRefreshToken = localStorage.getItem('refreshtoken');
    const response = await axios.post('http://localhost:3001/api/users/refresh', {
      refreshToken: storedRefreshToken,
    });

    const newAccessToken = response.data.accessToken;
    localStorage.setItem('token', newAccessToken);
    
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export { refreshAccessToken };
