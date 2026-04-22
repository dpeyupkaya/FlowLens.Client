import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  githubLogin: async (code) => {
    try {
      const response = await apiClient.post('/api/auth/github-login', JSON.stringify(code));
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};