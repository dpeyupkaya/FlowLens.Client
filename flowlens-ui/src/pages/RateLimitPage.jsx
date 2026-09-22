import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { DashboardOutlined, ReloadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const RateLimitPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f59e0b 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-lg p-10 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl"
      >
        <div className="w-20 h-20 mx-auto bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center mb-6 shadow-inner">
          <DashboardOutlined className="text-4xl text-amber-500/80" />
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-100 to-slate-500 mb-2">
          429
        </h1>
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Aşırı Yüklenme</h2>
        <p className="text-slate-400 mb-8 leading-relaxed text-sm">
          Analiz motoruna ayrılan anlık işlem kotanızı doldurdunuz. Grafik kararlılığını korumak için lütfen biraz bekleyip tekrar deneyin.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            type="primary" 
            size="large" 
            icon={<ReloadOutlined />} 
            onClick={() => navigate(-1)}
            className="bg-amber-600 hover:bg-amber-500 border-none font-medium rounded-xl h-11 px-6 shadow-lg shadow-amber-900/20"
          >
            Yeniden Dene
          </Button>
          <Button 
            size="large" 
            onClick={() => navigate('/')}
            className="bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500 font-medium rounded-xl h-11 px-6"
          >
            Ana Sayfa
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default RateLimitPage;