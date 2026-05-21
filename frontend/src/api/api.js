import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}api/token/refresh/`, { refresh: refreshToken });
          const newAccessToken = res.data.access;
          localStorage.setItem('access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token expired or invalid. Logging out...", refreshError);
          logoutUser();
        }
      } else {
        logoutUser();
      }
    }
    return Promise.reject(error);
  }
);

// Helper to logout user and clean storage
export const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

// Generic error handler
const handleError = (action, error) => {
  console.error(`Error ${action}:`, error);
  throw error;
};

// Fetch all amenities
export const fetchAmenities = async () => {
  try {
    const response = await api.get('/amenities/');
    return response.data;
  } catch (error) {
    handleError('fetching amenities', error);
  }
};

// Fetch all rooms
export const fetchRooms = async () => {
  try {
    const response = await api.get('/rooms/');
    return response.data;
  } catch (error) {
    handleError('fetching rooms', error);
  }
};

// Fetch gallery images
export const fetchGallery = async () => {
  try {
    const response = await api.get('/gallery/');
    return response.data;
  } catch (error) {
    handleError('fetching gallery', error);
  }
};

// Fetch bookings (for dashboard)
export const fetchBookings = async () => {
  try {
    const response = await api.get('/bookings/');
    return response.data;
  } catch (error) {
    handleError('fetching bookings', error);
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings/', bookingData);
    return response.data;
  } catch (error) {
    handleError('creating booking', error);
  }
};

// User authentication calls
export const login = async (username, password) => {
  try {
    const response = await api.post('api/token/', { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    
    // Fetch profile details immediately after successful login
    const userProfile = await getCurrentUser();
    return userProfile;
  } catch (error) {
    handleError('logging in', error);
  }
};

export const register = async (username, email, password, phone, role) => {
  try {
    const response = await api.post('api/register/', { username, email, password, phone, role });
    return response.data;
  } catch (error) {
    handleError('registering user', error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('api/me/');
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    handleError('fetching current user', error);
  }
};
