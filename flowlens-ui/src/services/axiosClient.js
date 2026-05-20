import axios from 'axios';
import { message } from 'antd';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Backend'in fırlattığı asıl mesajı yakalıyoruz
      const errorMessage = data?.Message 
                        || data?.message 
                        || data?.Error 
                        || data?.error 
                        || 'İşlem sırasında beklenmeyen bir hata oluştu.';

     
      switch (status) {
        case 400:
        case 429:
          message.warning(errorMessage);
          if (status === 429) window.location.href = '/rate-limit';
          break;
          
        case 401:
          message.error(errorMessage);
          window.location.href = '/401'; 
          break;
          
        case 403:
        case 404:
        case 500:
        default:
          message.error(errorMessage);
          break;
      }
    } else if (error.request) {
      message.error("Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.");
    } else {
      message.error(`İstek Hatası: ${error.message}`);
    }

    return Promise.reject(error);
  }
);