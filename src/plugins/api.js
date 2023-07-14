import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const api = axios.create({
  // baseURL: 'https://localhost:7056/api',
  baseURL: 'https://localhost:5001/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error?.response?.data?.errors?.length > 0) {
    const errorMessage = error.response.data.errors[0].message;
    toast.error(errorMessage, { duration: 5000 });
  } else if (error?.message?.length > 0) {
    const errorMessage = error.message;
    toast.error(errorMessage, { duration: 5000 });
  } else {
    toast.error("Error", { duration: 5000 });
  }
  return Promise.reject(error);
});

export default api;

