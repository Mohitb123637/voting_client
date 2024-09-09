import axios from 'axios';

// Create an axios instance
const axiosConfig = axios.create({
  baseURL: 'http://localhost:3000',
});

// Add a request interceptor to include the token in every request
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found, user may need to log in.');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor to handle expired tokens or unauthorized access
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access, token may be expired.');
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
