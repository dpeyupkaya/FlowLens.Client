import React, { useEffect } from 'react';
import { Form, Select, Slider, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const AnalysisPreferences = ({ settings, onSave, saving }) => {
  const [form] = Form.useForm();

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
    <div className="max-w-2xl pl-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Analiz Tercihleri</h2>
        <p className="text-gray-400 text-sm">FlowLens motorunun projelerinizi tararken nasıl davranacağını belirleyin.</p>
      </div>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onFinish}
      >
        <Form.Item 
          label={<span className="text-gray-300 font-medium">Kara Liste (Yoksayılacak Klasörler)</span>} 
          name="excludedFolders" 
          extra={<span className="text-gray-500 text-xs">Bu klasörler kod mimarisi grafiğine dahil edilmez. Yeni eklemek için yazıp Enter'a basın.</span>}
        >
          <Select 
            mode="tags" 
            size="large"
            placeholder="Klasör adı yazın..."
            className="w-full"
            tokenSeparators={[',']}
          />
        </Form.Item>

        <Form.Item 
          label={<span className="text-gray-300 font-medium">Maksimum Analiz Derinliği</span>} 
          name="maxAnalysisDepth" 
          extra={
            <span className="text-gray-500 text-xs">
              <b>Kademe 1:</b> Kuş Bakışı (Sınıflar) | <b>Kademe 2:</b> Yapısal (Metot İmzaları) | <b>Kademe 3:</b> Derin Dalış (Metot Gövdeleri ve Çağrılar)
            </span>
          }
          className="mt-8"
        >
          <Slider 
            min={1} 
            max={3} 
            marks={{ 1: '1', 2: '2', 3: '3' }}
            className="text-white"
          />
        </Form.Item>

        <Form.Item className="mt-8">
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />} 
            size="large" 
            loading={saving}
            className="bg-[#14b8a6] hover:bg-teal-500 border-none"
          >
            {saving ? 'Kaydediliyor...' : 'Motor Ayarlarını Kaydet'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AnalysisPreferences;