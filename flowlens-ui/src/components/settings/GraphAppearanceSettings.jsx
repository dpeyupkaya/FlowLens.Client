import React from 'react';
import { Radio, Switch, Divider, message } from 'antd';

const GraphAppearanceSettings = () => {
  const handleSettingChange = () => {
    message.success('Görünüm ayarları uygulandı.');
  };

  return (
    <div className="max-w-2xl pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Grafik & Görünüm</h2>
        <p className="text-gray-400 text-sm">Ağaç yapısının görsel davranışlarını ayarlayın.</p>
      </div>

      <div className="mb-8 text-white">
        <h3 className="text-white text-base font-medium mb-4">Düğüm (Node) Detay Seviyesi</h3>
        <Radio.Group defaultValue="detailed" onChange={handleSettingChange} className="flex flex-col gap-3">
          <Radio value="compact" className="text-gray-300">Kompakt Görünüm — Sadece isimler.</Radio>
          <Radio value="detailed" className="text-gray-300">Detaylı Görünüm — Metrikler dahil.</Radio>
        </Radio.Group>
      </div>

      <Divider className="border-slate-700/50" />

      <div className="flex items-center justify-between mt-6">
        <div>
          <h3 className="text-white text-base font-medium">Yüksek Performans Modu</h3>
          <p className="text-gray-500 text-xs">Animasyonları kapatarak yükü azaltır.</p>
        </div>
        <Switch onChange={handleSettingChange} className="bg-slate-600 checked:bg-[#14b8a6]" />
      </div>

      <div className="flex items-center justify-between mt-8">
        <div>
          <h3 className="text-white text-base font-medium">Mini Haritayı Göster</h3>
          <p className="text-gray-500 text-xs">Navigasyon kolaylığı sağlar.</p>
        </div>
        <Switch defaultChecked onChange={handleSettingChange} className="bg-slate-600 checked:bg-[#14b8a6]" />
      </div>
    </div>
  );
};

export default GraphAppearanceSettings;