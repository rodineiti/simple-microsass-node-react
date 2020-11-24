import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9001'
});

export default api;