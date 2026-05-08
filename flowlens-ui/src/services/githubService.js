import { axiosClient } from './axiosClient';

export const githubService = {
  getCSharpRepos: async () => {
    const response = await axiosClient.get('/api/github/csharp-repos');
    
    return response.data;
  }
};