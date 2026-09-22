import axios from 'axios';
import { message } from 'antd';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  xsrfCookieName: 'Xflwns-snwf',
  xsrfHeaderName: 'X-Xflwns-snwf',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use((config) => {
  if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(Xflwns-snwf)=([^;]*)'));
    if (!match) {
      console.error(
        "[CSRF HATASI] 'Xflwns-snwf' çerezi document.cookie içinde BULUNAMADI! " +
        "Backend geliştiricisine not: Frontend (localhost:5173) ile Backend (localhost:7209) " +
        "farklı portlarda (cross-origin) çalıştığı için, backend çerezi set ederken " +
        "kesinlikle 'SameSite=None', 'Secure=true' ve 'HttpOnly=false' ayarlarını kullanmalıdır. " +
        "Aksi takdirde tarayıcı bu çerezi JavaScript'in okumasına izin vermez ve 400 hatası alırsınız."
      );
    } else {
      console.log("[CSRF BAŞARILI] Çerez okundu:", match[3]);
      // Axios native özelliği bazen path uyumsuzluğunda header eklemeyebiliyor, garantiye alalım:
      config.headers['X-Xflwns-snwf'] = decodeURIComponent(match[3]);
    }
  }
  return config;
});

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