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
      
      const errorMessage = data?.error || data?.message || 'İşlem sırasında beklenmeyen bir hata oluştu.';

      switch (status) {
        case 400:
          message.warning(errorMessage);
          break;
        case 401:
          message.error("Oturum süresi dolmuş veya yetkisiz erişim. Lütfen tekrar giriş yapın.");
         
          break;
        case 403:
          message.error(errorMessage); 
          break;
        case 404:
          message.error(errorMessage || "İstenilen kaynak bulunamadı.");
          break;
        case 500:
          message.error(`Sunucu Hatası: ${errorMessage}`);
          break;
        default:
          message.error(errorMessage);
          break;
      }
    } else if (error.request) {
      message.error("Sunucuya ulaşılamıyor. İnternet bağlantınızı veya API'yi kontrol edin.");
    } else {
      message.error(`İstek Hatası: ${error.message}`);
    }

    return Promise.reject(error);
  }
);