import axios from 'axios'

const client = axios.create({
  baseURL: 'https://task-tracker-api-ibg3.onrender.com'
});

// Tilføj interceptor
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;

