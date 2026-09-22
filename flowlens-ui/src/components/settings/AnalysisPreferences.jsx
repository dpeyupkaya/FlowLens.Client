import React, { useEffect } from 'react';
import { Form, Select, Slider, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useTranslation } from '../../i18n/LanguageProvider';

const AnalysisPreferences = ({ settings, onSave, saving }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (settings) {
      form.setFieldsValue({
        excludedFolders: settings.excludedFolders || [],
        maxAnalysisDepth: settings.maxAnalysisDepth || 3
      });
    }
  }, [settings, form]);

  const onFinish = (values) => {
    onSave({
      excludedFolders: values.excludedFolders,
      maxAnalysisDepth: values.maxAnalysisDepth
    });
  };

  return (
    <div className="max-w-2xl pl-0 md:pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">{t('settings.analysisSettings')}</h2>
        <p className="text-gray-400 text-sm">FlowLens motorunun projelerinizi tararken nasıl davranacağını belirleyin.</p>
      </div>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onFinish}
      >
        <Form.Item 
          label={<span className="text-slate-300 font-medium">{t('settings.excludedFolders')}</span>} 
          name="excludedFolders" 
          extra={<span className="text-slate-500 text-xs mt-1 block">Bu klasörler kod mimarisi grafiğine dahil edilmez. Yeni eklemek için yazıp Enter'a basın.</span>}
          className="mb-8"
        >
          <Select 
            mode="tags" 
            size="large"
            placeholder="Klasör adı yazın..."
            className="w-full custom-dark-select"
            tokenSeparators={[',']}
          />
        </Form.Item>

        <Form.Item 
          label={<span className="text-slate-300 font-medium">{t('settings.maxDepth')}</span>} 
          name="maxAnalysisDepth" 
          extra={
            <div className="flex flex-col gap-1 text-slate-500 text-xs mt-2 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
              <span><b className="text-teal-400">Kademe 1:</b> Kuş Bakışı (Sınıflar)</span>
              <span><b className="text-teal-400">Kademe 2:</b> Yapısal (Metot İmzaları)</span>
              <span><b className="text-teal-400">Kademe 3:</b> Derin Dalış (Metot Gövdeleri ve Çağrılar)</span>
            </div>
          }
          className="mb-10"
        >
          <Slider 
            min={1} 
            max={3} 
            marks={{ 
              1: <span className="text-slate-400">1</span>, 
              2: <span className="text-slate-400">2</span>, 
              3: <span className="text-slate-400">3</span> 
            }}
            className="text-white custom-slider"
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />} 
            size="large" 
            loading={saving}
            className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold border-none shadow-[0_0_15px_rgba(20,184,166,0.2)]"
          >
            {saving ? t('common.saving') : t('settings.saveEngine')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AnalysisPreferences;