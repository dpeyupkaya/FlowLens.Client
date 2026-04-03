import React from 'react';
import { Typography } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const DashboardHeader = () => (
  <div className="flex items-center gap-4 mb-10 border-b border-slate-800/80 pb-5">
    <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
      <FolderOpenOutlined className="text-3xl text-teal-400" />
    </div>
    <div>
      <Title level={3} style={{ color: '#f8fafc', margin: 0, letterSpacing: '0.5px' }}>Proje Merkezi</Title>
      <Text className="text-slate-500 font-mono text-xs uppercase tracking-widest">Active Repositories</Text>
    </div>
  </div>
);

export default DashboardHeader;