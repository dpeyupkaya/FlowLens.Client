import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'antd';
import { LoginOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f43f5e 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-lg p-10 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl"
      >
        <div className="w-20 h-20 mx-auto bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center mb-6 shadow-inner">
          <LockOutlined className="text-4xl text-rose-400/80" />
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-100 to-slate-500 mb-2">
          401
        </h1>
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Yetkisiz Erişim</h2>
        <p className="text-slate-400 mb-8 leading-relaxed text-sm">
          Bu modüle erişmek için aktif bir oturum grafiğine bağlı olmanız gerekiyor. Lütfen ağa giriş yapın.
        </p>
        <Space size="middle" className="flex justify-center flex-wrap">
          <Link to="/login">
            <Button type="primary" size="large" icon={<LoginOutlined />} className="bg-teal-600 hover:bg-teal-500 border-none font-medium rounded-xl h-11 px-6 shadow-lg shadow-teal-900/20">
              Ağa Bağlan
            </Button>
          </Link>
          <Link to="/">
            <Button size="large" icon={<HomeOutlined />} className="bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500 font-medium rounded-xl h-11 px-6">
              Ana Sayfa
            </Button>
          </Link>
        </Space>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;