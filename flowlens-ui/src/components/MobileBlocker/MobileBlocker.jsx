import React from 'react';

const MobileBlocker = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#141414] text-white p-6 text-center">
      <div className="text-6xl mb-4">💻</div>
      <h1 className="text-2xl font-bold mb-2 text-[#14b8a6]">Masaüstü Deneyimi Gerekli</h1>
      <p className="text-gray-400 max-w-md">
        FlowLens, detaylı kod analizi ve karmaşık hiyerarşi grafikleri içerdiğinden şu an için yalnızca masaüstü tarayıcılarda desteklenmektedir. Lütfen daha iyi bir deneyim için bilgisayarınızdan giriş yapın.
      </p>
    </div>
  );
};

export default MobileBlocker;