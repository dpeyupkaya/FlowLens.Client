import { axiosClient } from './axiosClient';

let reposPromise = null;

export const githubService = {
  getCSharpRepos: () => {
    if (!reposPromise) {
      reposPromise = axiosClient.get('/api/github/csharp-repos')
        .then(response => response.data)
        .catch(error => {
          reposPromise = null; 
          throw error;
        });
    }
    
    return reposPromise;
  },

  clearReposCache: () => {
    reposPromise = null;
  }
};