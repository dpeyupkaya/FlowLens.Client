import { axiosClient } from './axiosClient'; 
import { useFlowStore } from '../store/useFlowStore'; 

export const analysisService = {
  startAnalysis: async (repoData) => {
    
    let targetUrl = '';
    
    if (typeof repoData === 'string') {
      targetUrl = repoData;
    } else if (repoData.html_url) {
      targetUrl = repoData.html_url;
    } else if (repoData.fullName) {
      targetUrl = `https://github.com/${repoData.fullName}`;
    } else if (repoData.owner && repoData.name) {
      // Yedek plan
      targetUrl = `https://github.com/${repoData.owner.login}/${repoData.name}`;
    }

    const offsetMinutes = new Date().getTimezoneOffset();
    const { blacklistedFolders, maxAnalysisDepth } = useFlowStore.getState();

    const response = await axiosClient.post('/api/Analysis/start', { 
      RepoUrl: targetUrl, 
      AccessToken: "",
      IgnoredFolders: blacklistedFolders || ["obj", "bin", ".git", "node_modules"],
      MaxDepth: maxAnalysisDepth || 3,
      TimezoneOffsetMinutes: offsetMinutes
    });
    
    return response.data;
  }
};