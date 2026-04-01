import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export const analysisService = {
  startAnalysis: async (url) => {
    try {
      const response = await apiClient.post('/api/analysis/start', { 
        RepoUrl: url 
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};