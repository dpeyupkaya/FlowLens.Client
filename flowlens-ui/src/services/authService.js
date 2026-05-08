import { axiosClient } from './axiosClient';

export const authService = {
  githubLogin: async (code) => {
    const response = await axiosClient.post('/api/auth/github-login', JSON.stringify(code));
    
    return response.data;
  }
};