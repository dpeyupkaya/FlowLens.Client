import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export const userService = {
  getUserMe: async () => {
    try {
      const response = await apiClient.get('/api/users/me');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  updateUserSettings: async (settingsData) => {
    try {
      const response = await apiClient.put('/api/users/me/settings', settingsData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};