import React, { useEffect } from 'react';
import { Form, Button, Select, Popconfirm, message } from 'antd';
import { DeleteOutlined, CloudSyncOutlined, SaveOutlined } from '@ant-design/icons';

const DataManagementSettings = ({ settings, onSave, saving }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (settings) {
      form.setFieldsValue({
        repoVisibility: settings.repoVisibility || 'All',
      });
    }
  }, [settings, form]);

  const onFinish = (values) => {
    onSave({
      repoVisibility: values.repoVisibility
    });
  };

  const handleClearCache = () => {
    message.success('Önbellek temizlendi.');
  };

  return (
    <div className="max-w-2xl pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Veri Yönetimi</h2>
        <p className="text-gray-400 text-sm">Uygulama önbelleğini yönetin.</p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="mb-10">
          <h3 className="text-white text-base font-medium mb-3">Repo Görünürlüğü</h3>
          <Form.Item name="repoVisibility" className="mb-0">
            <Select 
              size="large" 
              className="w-full md:w-1/2 custom-dark-select"
              options={[
                { value: 'All', label: 'Tüm Repolar (Public & Private)' },
                { value: 'Public', label: 'Sadece Public' },
                { value: 'Private', label: 'Sadece Private' },
              ]}
            />
          </Form.Item>
        </div>

        <Form.Item className="mt-6 mb-10">
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />} 
            size="large" 
            loading={saving}
            className="bg-[#14b8a6] hover:bg-teal-500 border-none"
          >
            {saving ? 'Kaydediliyor...' : 'Tercihleri Kaydet'}
          </Button>
        </Form.Item>
      </Form>

      <div className="p-5 border border-red-900/30 bg-red-900/10 rounded-xl">
        <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
          <DeleteOutlined /> Tehlikeli Bölge
        </h3>
        <Popconfirm
          title="Analiz önbelleğini temizlemek istediğinize emin misiniz?"
          onConfirm={handleClearCache}
          okText="Evet, Temizle"
          cancelText="İptal"
          okButtonProps={{ danger: true }}
        >
          <Button danger type="primary" icon={<CloudSyncOutlined />}>
            Analiz Önbelleğini Temizle
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default DataManagementSettings;