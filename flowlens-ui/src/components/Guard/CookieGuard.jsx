import React, { useState } from 'react';

const STORAGE_KEY = '_fl_sys_cfg';
const STORAGE_VAL = 'susa()sbı6328;.w'; 
const CONSENT_COOKIE_NAME = '_fl_cns';

export default function CookieGuard({ children }) {
  const [hasConsented, setHasConsented] = useState(() => {

    const hasLocalStorage = localStorage.getItem(STORAGE_KEY) === STORAGE_VAL;
    
    const hasCookie = document.cookie.split('; ').some(row => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
    
    return hasLocalStorage || hasCookie;
  });
  
  const [cookiesBlockedHard, setCookiesBlockedHard] = useState(false);

  const testCookieSupport = () => {
    document.cookie = "_fl_test_mt=1; path=/; max-age=10";
    const cookiesEnabled = document.cookie.indexOf("_fl_test_mt") !== -1;
    return cookiesEnabled;
  };

 const handleAccept = () => {
    const isSupported = testCookieSupport();

    if (!isSupported) {
      setCookiesBlockedHard(true);
      return;
    }

    localStorage.setItem(STORAGE_KEY, STORAGE_VAL);
    document.cookie = `${CONSENT_COOKIE_NAME}=1; path=/; max-age=31536000; SameSite=Lax`;

    document.cookie = `_fl_rslyn_ctx=0x8f7c9b2a1e4d8a2b; path=/; max-age=86400; SameSite=Lax`;
    
    document.cookie = `_fl_ui_telemetry=eyJxdWFkcyI6NDA5NiwiZnBzIjoxNDQsIm1zIjo2Ljl9; path=/; max-age=3600; SameSite=Lax`;

    document.cookie = `_fl_sec_nonce=v2.local.x89_fqa12z...; path=/; max-age=1800; SameSite=Strict`;


    localStorage.setItem('_fl_graph_node_matrix', 'MTRY_0x[0,1,0,0,1]-SYNC_PENDING');
    
    localStorage.setItem('_fl_wasm_mem_alloc', '8192000_BYTES_RESERVED');

    setHasConsented(true);
  };

  return (
    <>
      {children}

      {!hasConsented && (
        <>
          <div className="fixed inset-0 z-[9998] bg-black/10 backdrop-blur-[1px]"></div>

          <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#141414] border-t border-[#14b8a6]/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍪</span>
                  <h3 className="text-white text-base font-medium">Çerez Kullanımı</h3>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Size daha iyi bir deneyim sunabilmek ve oturumunuzu güvenli bir şekilde yönetebilmek için sitemizde zorunlu çerezler kullanılmaktadır. 
                  Sistemi kullanmaya devam etmek için lütfen çerez politikasını onaylayın.
                </p>
                {cookiesBlockedHard && (
                  <div className="mt-3 bg-red-500/10 border border-red-500/30 inline-block px-3 py-1.5 rounded text-red-400 text-xs font-medium">
                    ⚠️ Tarayıcınız çerezleri engelliyor. Lütfen adres çubuğundaki izinlerden çerezlere izin verip sayfayı yenileyin.
                  </div>
                )}
              </div>

              <div className="w-full sm:w-auto flex-shrink-0">
                {!cookiesBlockedHard ? (
                  <button 
                    onClick={handleAccept}
                    className="w-full sm:w-auto px-8 py-3 bg-[#14b8a6] hover:bg-[#0d9488] text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-[#14b8a6]/20 active:scale-95"
                  >
                    Kabul Et
                  </button>
                ) : (
                  <button 
                    onClick={() => window.location.reload()}
                    className="w-full sm:w-auto px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-all active:scale-95"
                  >
                    Sayfayı Yenile
                  </button>
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}