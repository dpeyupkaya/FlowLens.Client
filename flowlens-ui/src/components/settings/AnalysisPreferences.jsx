import React from 'react';
import { Form, Select, Slider, Switch, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const AnalysisPreferences = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Analiz ayarları kaydedildi:', values);
    message.success('Analiz motoru tercihleri güncellendi!');
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
        initialValues={{
          ignoreList: ['bin', 'obj', 'Tests', 'Migrations'],
          depth: 3,
          includeExternal: false
        }}
      >
        <Form.Item 
          label={<span className="text-gray-300 font-medium">Kara Liste (Yoksayılacak Klasörler)</span>} 
          name="ignoreList"
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
          name="depth"
          extra={<span className="text-gray-500 text-xs">1: Sadece Projeler, 5: Metot içindeki çağrılara kadar (Performansı etkileyebilir).</span>}
          className="mt-8"
        >
          <Slider 
            min={1} 
            max={5} 
            marks={{ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }}
            className="text-white"
          />
        </Form.Item>

        <div className="flex items-center justify-between mt-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
          <div>
            <h4 className="text-white font-medium mb-1">Harici Kütüphaneleri (NuGet) Göster</h4>
            <p className="text-gray-500 text-xs">Proje dışı bağımlılıkları analiz haritasında ayrı bir renk ile gösterir.</p>
          </div>
          <Form.Item name="includeExternal" valuePropName="checked" className="mb-0">
            <Switch className="bg-slate-600 checked:bg-[#14b8a6]" />
          </Form.Item>
        </div>

        <Form.Item className="mt-8">
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" className="bg-[#14b8a6] hover:bg-teal-500 border-none">
            Motor Ayarlarını Kaydet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AnalysisPreferences;