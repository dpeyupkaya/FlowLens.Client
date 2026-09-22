import React, { useEffect } from 'react';
import { Form, Radio, Switch, Divider, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useTranslation } from '../../i18n/LanguageProvider';

const GraphAppearanceSettings = ({ settings, onSave, saving }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

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
    <div className="max-w-2xl pl-0 md:pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">{t('settings.graphAppearance')}</h2>
        <p className="text-gray-400 text-sm">Ağaç yapısının görsel davranışlarını ayarlayın.</p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="mb-8 p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
          <h3 className="text-white text-base font-medium mb-4">{t('settings.nodeDetail')}</h3>
          <Form.Item name="nodeDetailLevel" className="mb-0">
            <Radio.Group className="flex flex-col gap-4 w-full">
              <Radio value="Compact" className="text-slate-300 w-full hover:bg-slate-700/30 p-2 rounded-lg transition-colors">
                <div className="flex flex-col ml-2">
                  <span className="font-medium text-slate-200">Kompakt Görünüm</span>
                  <span className="text-slate-500 text-xs">Sadece sınıf ve metot isimleri. (Daha yüksek performans)</span>
                </div>
              </Radio>
              <Radio value="Detailed" className="text-slate-300 w-full hover:bg-slate-700/30 p-2 rounded-lg transition-colors">
                <div className="flex flex-col ml-2">
                  <span className="font-medium text-slate-200">Detaylı Görünüm</span>
                  <span className="text-slate-500 text-xs">Metrikler ve ekstra analiz verileri dahil.</span>
                </div>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="flex items-center justify-between mt-6 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
          <div>
            <h3 className="text-white text-base font-medium">{t('settings.highPerformance')}</h3>
            <p className="text-slate-500 text-xs mt-1">Animasyonları kapatarak render yükünü azaltır.</p>
          </div>
          <Form.Item name="highPerformanceMode" valuePropName="checked" className="mb-0">
            <Switch className="bg-slate-600 checked:bg-teal-500" />
          </Form.Item>
        </div>

        <div className="flex items-center justify-between mt-4 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
          <div>
            <h3 className="text-white text-base font-medium">{t('settings.showMinimap')}</h3>
            <p className="text-slate-500 text-xs mt-1">Geniş haritalarda navigasyon kolaylığı sağlar.</p>
          </div>
          <Form.Item name="showMinimap" valuePropName="checked" className="mb-0">
            <Switch className="bg-slate-600 checked:bg-teal-500" />
          </Form.Item>
        </div>

        <Form.Item className="mt-8">
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />} 
            size="large" 
            loading={saving}
            className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold border-none shadow-[0_0_15px_rgba(20,184,166,0.2)]"
          >
            {saving ? t('common.applying') : t('settings.applyAppearance')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GraphAppearanceSettings;