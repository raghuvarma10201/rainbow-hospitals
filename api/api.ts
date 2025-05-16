// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://productioncms.rainbowhospitals.in/api',
  timeout: 10000,
});

// 🔐 Request Interceptor
api.interceptors.request.use(
  async (config) => {
    // Add auth token from storage (AsyncStorage, SecureStore, etc.)
    const token = 'your_token_here'; // Replace with actual token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ⚠️ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized globally (e.g. logout or redirect)
      console.log('Unauthorized! Logging out...');
      // Optionally navigate to login or reset auth state
    }
    return Promise.reject(error);
  }
);

export default api;
