import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined, ApiOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Subtle Node Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#14b8a6 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-lg p-10 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl"
      >
        <div className="w-20 h-20 mx-auto bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center mb-6 shadow-inner">
          <ApiOutlined className="text-4xl text-slate-400" />
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-100 to-slate-500 mb-2">
          404
        </h1>
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Düğüm Bulunamadı</h2>
        <p className="text-slate-400 mb-8 leading-relaxed text-sm">
          Akış haritasında aradığınız koordinat boş. Bu sayfa taşınmış veya grafikten tamamen silinmiş olabilir.
        </p>
        <Link to="/">
          <Button type="primary" size="large" icon={<HomeOutlined />} className="bg-teal-600 hover:bg-teal-500 border-none font-medium rounded-xl h-12 px-8 shadow-lg shadow-teal-900/20">
            Ana Sayfaya Dön
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;