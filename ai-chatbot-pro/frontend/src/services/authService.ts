import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

// --- Interface for Registration Data ---
interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

// --- Interface for Login Data ---
interface LoginData {
  email: string;
  password: string;
}

// --- Function to call the /register endpoint ---
export const register = (userData: RegisterData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// --- ADD THIS NEW LOGIN FUNCTION ---
export const login = async (userData: LoginData) => {
  // The backend expects the data in a specific format (form data)
  const params = new URLSearchParams();
  params.append('username', userData.email); // FastAPI's OAuth2 expects 'username'
  params.append('password', userData.password);

  const response = await axios.post(`${API_URL}/login`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // If login is successful, store the token
  if (response.data.access_token) {
    localStorage.setItem('user_token', response.data.access_token);
  }
  return response.data;
};