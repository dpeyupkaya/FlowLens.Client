import React from 'react';
import { Button, Select, Popconfirm, message } from 'antd';
import { DeleteOutlined, CloudSyncOutlined } from '@ant-design/icons';

const DataManagementSettings = () => {
  const handleClearCache = () => {
    message.success('Önbellek temizlendi.');
  };

  return (
    <div className="max-w-2xl pl-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Veri Yönetimi</h2>
        <p className="text-gray-400 text-sm">Uygulama önbelleğini yönetin.</p>
      </div>

      <div className="mb-10">
        <h3 className="text-white text-base font-medium mb-3">Repo Görünürlüğü</h3>
        <Select 
          defaultValue="all" 
          size="large" 
          className="w-full md:w-1/2"
          options={[
            { value: 'all', label: 'Tüm Repolar (Public & Private)' },
            { value: 'public', label: 'Sadece Public' },
            { value: 'csharp', label: 'Sadece C#' },
          ]}
        />
      </div>

      <div className="p-5 border border-red-900/30 bg-red-900/10 rounded-xl">
        <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
          <DeleteOutlined /> Tehlikeli Bölge
        </h3>
        <Popconfirm
          title="Önbelleği Temizle"
          onConfirm={handleClearCache}
          okText="Evet"
          cancelText="Hayır"
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