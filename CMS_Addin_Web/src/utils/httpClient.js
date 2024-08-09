import axios from 'axios';
import { AUTH_TOKEN, REFRESH_TOKEN } from '../constants/auth';

// Create an Axios instance
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API base URL
});

// Add a request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN) : null;

    // If the token exists, add it to the headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const isBrowser = typeof window !== 'undefined';
      if (!isBrowser || window.location.href.includes('/login')) {
        return Promise.reject(error);
      }

      const refreshToken = isBrowser ? localStorage.getItem(REFRESH_TOKEN) : null;
      await httpClient.get('/auth/refresh', {
        headers: { Authorization: `Bearer ${refreshToken}` }
      })
        .then((data) => {
          let loginResponse = data.data;
          localStorage.setItem(AUTH_TOKEN, loginResponse.access_token);
          localStorage.setItem(REFRESH_TOKEN, loginResponse.refresh_token);
          return Promise.resolve(error);
        })
        .catch(() => {
          localStorage.removeItem(AUTH_TOKEN); // Remove the token from local storage
          localStorage.removeItem(REFRESH_TOKEN);
          console.log('Redirecting to login');
          //window.location.href = '/login';
          return Promise.reject(error);
        });
    }
  }
);

export default httpClient;