import React, { useEffect } from 'react';
import { Form, Radio, Switch, Divider, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const GraphAppearanceSettings = ({ settings, onSave, saving }) => {
  const [form] = Form.useForm();

 useEffect(() => {
    if (settings) {
      form.setFieldsValue({
        nodeDetailLevel: settings.nodeDetailLevel || settings.NodeDetailLevel || 'Detailed',
        highPerformanceMode: settings.highPerformanceMode || settings.HighPerformanceMode || false,
        showMinimap: settings.showMinimap !== undefined ? settings.showMinimap : (settings.ShowMinimap !== undefined ? settings.ShowMinimap : true)
      });
    }
  }, [settings, form]);

  const onFinish = (values) => {
    onSave({
      nodeDetailLevel: values.nodeDetailLevel,
      highPerformanceMode: values.highPerformanceMode,
      showMinimap: values.showMinimap
    });
  };

  return (
    <div className="max-w-2xl pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Grafik & Görünüm</h2>
        <p className="text-gray-400 text-sm">Ağaç yapısının görsel davranışlarını ayarlayın.</p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="mb-8 text-white">
          <h3 className="text-white text-base font-medium mb-4">Düğüm (Node) Detay Seviyesi</h3>
          <Form.Item name="nodeDetailLevel" className="mb-0">
            <Radio.Group className="flex flex-col gap-3">
              <Radio value="Compact" className="text-gray-300">Kompakt Görünüm — Sadece isimler.</Radio>
              <Radio value="Detailed" className="text-gray-300">Detaylı Görünüm — Metrikler dahil.</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Divider className="border-slate-700/50" />

        <div className="flex items-center justify-between mt-6">
          <div>
            <h3 className="text-white text-base font-medium">Yüksek Performans Modu</h3>
            <p className="text-gray-500 text-xs">Animasyonları kapatarak yükü azaltır.</p>
          </div>
          <Form.Item name="highPerformanceMode" valuePropName="checked" className="mb-0">
            <Switch className="bg-slate-600 checked:bg-[#14b8a6]" />
          </Form.Item>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div>
            <h3 className="text-white text-base font-medium">Mini Haritayı Göster</h3>
            <p className="text-gray-500 text-xs">Navigasyon kolaylığı sağlar.</p>
          </div>
          <Form.Item name="showMinimap" valuePropName="checked" className="mb-0">
            <Switch className="bg-slate-600 checked:bg-[#14b8a6]" />
          </Form.Item>
        </div>

        <Form.Item className="mt-10">
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />} 
            size="large" 
            loading={saving}
            className="bg-[#14b8a6] hover:bg-teal-500 border-none"
          >
            {saving ? 'Uygulanıyor...' : 'Görünüm Ayarlarını Uygula'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GraphAppearanceSettings;