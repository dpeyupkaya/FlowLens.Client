import { axiosClient } from './axiosClient';

export const userService = {
  getUserMe: async () => {
    const response = await axiosClient.get('/api/users/me');
    
    return response.data;
  },

  updateUserSettings: async (settingsData) => {
    const response = await axiosClient.put('/api/users/me/settings', settingsData);
    
    return response.data;
  }
};