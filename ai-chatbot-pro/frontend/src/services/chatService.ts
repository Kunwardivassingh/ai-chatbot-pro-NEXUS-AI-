import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/chat`;

// Helper function to get the auth token and create headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('user_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// --- API Functions ---

export const getConversations = () => {
  return axios.get(`${API_URL}/conversations`, getAuthHeaders());
};

export const createNewConversation = () => {
  return axios.post(`${API_URL}/conversations`, {}, getAuthHeaders());
};

export const postMessage = (conversationId: number, text: string) => {
  return axios.post(
    `${API_URL}/conversations/${conversationId}/messages`,
    { text },
    getAuthHeaders()
  );
};

// --- ADD THIS NEW FUNCTION ---
export const deleteConversation = (conversationId: number) => {
  return axios.delete(`${API_URL}/conversations/${conversationId}`, getAuthHeaders());
};


// --- ADD THIS NEW, FULLY FUNCTIONAL CODE ---
export const clearAllConversations = () => {
  return axios.delete(`${API_URL}/conversations`, getAuthHeaders());
};