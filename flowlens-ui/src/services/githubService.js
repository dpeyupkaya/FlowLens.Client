import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export const githubService = {
  getCSharpRepos: async () => {
    try {
      const response = await apiClient.get('/api/github/csharp-repos');
      return response.data; 
    } catch (error) {
      throw error;
    }
  }
};