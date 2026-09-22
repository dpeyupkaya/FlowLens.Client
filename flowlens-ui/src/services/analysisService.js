import { axiosClient } from './axiosClient'; 
import { useFlowStore } from '../store/useFlowStore'; 

export const analysisService = {
  startAnalysis: async (repoData, analysisId, targetLanguages) => {
    
    let targetUrl = '';
    
    if (typeof repoData === 'string') {
      targetUrl = repoData;
    } else if (repoData.html_url) {
      targetUrl = repoData.html_url;
    } else if (repoData.fullName) {
      targetUrl = `https://github.com/${repoData.fullName}`;
    } else if (repoData.owner && repoData.name) {
      targetUrl = `https://github.com/${repoData.owner.login}/${repoData.name}`;
    }

    const offsetMinutes = new Date().getTimezoneOffset();
    const { blacklistedFolders, maxAnalysisDepth } = useFlowStore.getState();

    const payload = { 
      repoUrl: targetUrl, 
      ignoredFolders: blacklistedFolders || ["obj", "bin", ".git", "node_modules", "dist", "build", ".next", "out", "coverage"],
      maxDepth: maxAnalysisDepth || 3,
      analysisId: analysisId, 
      timezoneOffsetMinutes: offsetMinutes,
      targetLanguages: targetLanguages || []
    };

    const response = await axiosClient.post('/api/Analysis/start', payload);
    
    return response.data;
  }
};