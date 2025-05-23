export const API_BASE_URL =  'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/user`,
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  
  // Admin endpoints
  ADMINS: `${API_BASE_URL}/user/admins`,
  ADMIN_SEARCH: `${API_BASE_URL}/user/admins/search`,
  
  // Location endpoints
  LOCATIONS: `${API_BASE_URL}/user/locations`,
  
  // Property endpoints
  PROPERTIES: `${API_BASE_URL}/user/house-list`,
  VIP_HOUSES: `${API_BASE_URL}/user/vip-houses`,
  PROPERTY_DETAILS: (id: string) => `${API_BASE_URL}/user/house/${id}`,
  
  // Visit request endpoints
  VISIT_REQUESTS: `${API_BASE_URL}/user/visite-request`,
  
  // Report endpoints
  REPORTS: `${API_BASE_URL}/reports`,
};

// Axios instance with default config
import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
); 