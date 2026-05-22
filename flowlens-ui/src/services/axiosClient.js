import axios from 'axios';
import { message } from 'antd';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const csrfToken = getCookie('Xflwns-snwf');

    if (csrfToken) {
      config.headers['X-Xflwns-snwf'] = decodeURIComponent(csrfToken);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
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