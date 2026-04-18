import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});

export const analysisService = {
  startAnalysis: async (repoData) => {
    
    const targetUrl = typeof repoData === 'object' ? (repoData.html_url || repoData.url) : repoData;

  

    try {
      const response = await apiClient.post('/api/Analysis/start', { 
        RepoUrl: targetUrl, 
        AccessToken: "" 
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
         console.error("🔥 C# VALIDASYON HATASI:", error.response.data);
      }
      throw error.response ? error.response.data : error;
    }
  }
};