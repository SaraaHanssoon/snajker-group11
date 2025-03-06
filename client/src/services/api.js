import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', 
  withCredentials: true, // Aktivera detta om du skickar cookies (t.ex. för autentisering)
  headers: {
    'Content-Type': 'application/json'
  }
});

// Lägg till en interceptor för att logga eventuella fel
api.interceptors.response.use(
  response => response, 
  error => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
