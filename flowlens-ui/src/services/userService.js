import { axiosClient } from './axiosClient';
import { githubService } from './githubService'; 

let mePromise = null;

export const userService = {
  getUserMe: () => {
    if (!mePromise) {
      mePromise = axiosClient.get('/api/Users/me') 
        .then(response => response.data)
        .catch(error => {
          mePromise = null; 
          throw error;
        });
    }
    return mePromise;
  },

  updateUserSettings: async (settingsData) => {
    const response = await axiosClient.put('/api/Users/me/settings', settingsData);
    mePromise = null; 
    return response.data;
  },

  clearUserCache: () => {
    mePromise = null;
  },

  logout: async () => {
    try {
      await axiosClient.post('/api/Auth/logout');
    } catch (error) {
      console.error("Çıkış yapılırken sunucu hatası, yine de yerel oturum kapatılıyor...", error);
    } finally {
      mePromise = null;
      githubService.clearReposCache(); 
    }
  }
};