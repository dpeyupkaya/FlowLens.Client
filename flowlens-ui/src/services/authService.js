import { axiosClient } from './axiosClient';

export const authService = {
  getGitHubLoginUrl: async () => {
    const response = await axiosClient.get('/api/auth/github-url');
    return response.data; 
  },

  githubLogin: async (code, state) => {
    const response = await axiosClient.post('/api/auth/github-login', {
      code: code,
      state: state
    });
    
    return response.data;
  }
};