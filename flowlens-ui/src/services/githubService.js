import { axiosClient } from './axiosClient';

let reposPromises = {};

export const githubService = {
  getRepos: (language = 'All') => {
    if (!reposPromises[language]) {
      reposPromises[language] = axiosClient.get(`/api/github/repos?language=${language}`)
        .then(response => response.data)
        .catch(error => {
          reposPromises[language] = null; 
          throw error;
        });
    }
    
    return reposPromises[language];
  },

  clearReposCache: () => {
    reposPromises = {};
  }
};