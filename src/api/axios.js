import axios from 'axios';

const api = axios.create({ baseURL: 'https://cricketapp1-51wc3mm0.b4a.run/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
