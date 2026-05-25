import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
};

export const expenseAPI = {
  getAll: () => api.get('/expenses'),
  create: (description, amount, category, date) =>
    api.post('/expenses', { description, amount, category, date }),
  update: (id, description, amount, category, date) =>
    api.put(`/expenses/${id}`, { description, amount, category, date }),
  delete: (id) => api.delete(`/expenses/${id}`),
  getSummary: () => api.get('/expenses/summary/stats'),
};

export default api;
