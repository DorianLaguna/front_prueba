import axios from 'axios';
import router from '@/router';

const API_URL = 'http://localhost:8000/api';

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Add a request interceptor to include the token in headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token and redirect to login
      localStorage.removeItem('authToken');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);
