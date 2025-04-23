import axios from 'axios';
import router from '@/router';

const API_URL = 'http://localhost:8000/api/tasks';

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

export const fetchTasks = (status = null) => {
  const url = status ? `${API_URL}?status=${status}` : API_URL;
  return axios.get(url);
};

export const fetchTaskById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createTask = (task) => {
  return axios.post(API_URL, task);
};

export const updateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
