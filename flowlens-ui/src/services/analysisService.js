import axios from 'axios';
import { useFlowStore } from '../store/useFlowStore'; 

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

    const { blacklistedFolders, maxAnalysisDepth } = useFlowStore.getState();

    try {
      const response = await apiClient.post('/api/Analysis/start', { 
        RepoUrl: targetUrl, 
        AccessToken: "",
        IgnoredFolders: blacklistedFolders || ["obj", "bin", ".git", "node_modules"],
        MaxDepth: maxAnalysisDepth || 3
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
         console.error(" C# VALIDASYON HATASI:", error.response.data);
      }
      throw error.response ? error.response.data : error;
    }
  }
};