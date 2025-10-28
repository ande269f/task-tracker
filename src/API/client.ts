import axios from 'axios'

const client = axios.create({
  baseURL: 'https://task-tracker-api-ibg3.onrender.com',
});

// helper til delay for development af ventetid ui
//const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Tilføj interceptor (får jwt token til at komme med som header på alle requests)
client.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  //await delay(20000); // simulerer netværksforsinkelse
  return config;
});

export default client;

