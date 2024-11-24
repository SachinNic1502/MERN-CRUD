// src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'https://mern-crud-136y.onrender.com/api' });

// Attach token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;
