import React, { useEffect } from 'react';
import { Form, Button, Select, Popconfirm, message } from 'antd';
import { DeleteOutlined, CloudSyncOutlined, SaveOutlined, WarningOutlined } from '@ant-design/icons';
import { useTranslation } from '../../i18n/LanguageProvider';

const DataManagementSettings = ({ settings, onSave, saving }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

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
    message.success(t('settings.cacheCleared'));
  };

  return (
    <div className="max-w-2xl pl-0 md:pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">{t('settings.dataManagement')}</h2>
        <p className="text-gray-400 text-sm">Uygulama önbelleğini yönetin.</p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="mb-10 p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
          <h3 className="text-white text-base font-medium mb-3">{t('settings.repoVisibility')}</h3>
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

        <Form.Item className="mt-6 mb-12">
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

      <div className="p-6 border border-red-900/50 bg-red-950/20 rounded-xl">
        <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2 text-lg">
          <WarningOutlined /> {t('settings.dangerZone')}
        </h3>
        <Popconfirm
          title={t('settings.clearCacheConfirm')}
          onConfirm={handleClearCache}
          okText="Evet, Temizle"
          cancelText="İptal"
          okButtonProps={{ danger: true, className: "bg-red-500 hover:bg-red-400 border-none text-white" }}
          cancelButtonProps={{ className: "border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-transparent" }}
        >
          <Button danger type="primary" size="large" icon={<CloudSyncOutlined />} className="bg-red-500 hover:bg-red-400 border-none shadow-[0_0_15px_rgba(239,68,68,0.2)] font-medium">
            {t('settings.clearCache')}
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default DataManagementSettings;