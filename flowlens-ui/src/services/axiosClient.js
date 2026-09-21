import axios from 'axios';
import { message } from 'antd';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

let currentCsrfToken = null;

export const fetchCsrfToken = async () => {
  try {
    // Avoid circular dependency or infinite interceptor loop by using axios directly for this, 
    // or just use axiosClient since it's a GET request and doesn't need the header anyway.
    const res = await axiosClient.get('/api/auth/csrf');
    if (res.data && res.data.csrfToken) {
      currentCsrfToken = res.data.csrfToken;
    }
  } catch (error) {
    console.error("CSRF Token alınamadı:", error);
  }
};

axiosClient.interceptors.request.use(
  (config) => {
    // Sadece POST, PUT, DELETE gibi veri değiştiren isteklerde ekle
    if (currentCsrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
      config.headers['X-Xflwns-snwf'] = currentCsrfToken;
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