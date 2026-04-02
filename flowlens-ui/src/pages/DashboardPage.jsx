import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Tag, Spin, message } from 'antd'; 
import { CodeOutlined, FolderOpenOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { githubService } from '../services/githubService'; 
import { analysisService } from '../services/analysisService'; 

const { Title, Text } = Typography;

const DashboardPage = () => {
  const [repos, setRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCSharpRepos();
  }, []);

  const fetchCSharpRepos = async () => {
    setIsLoadingRepos(true);
    try {
      const data = await githubService.getCSharpRepos();
      setRepos(data.repos || data || []); 
    } catch (error) {
      message.error("Repolar yüklenirken bir hata oluştu.");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleAnalyze = async (url) => {
    if (!url) return;
    setIsAnalyzing(true);
    const hideLoading = message.loading({ content: `[SYSTEM] Analiz motoru bağlanıyor...`, key: 'analyze', duration: 0 });
    
    try {
      const report = await analysisService.startAnalysis(url);
      hideLoading();
      message.success({ content: 'Analiz tamamlandı!', key: 'analyze', duration: 2 });
      navigate('/analysis/results', { state: { analysisResult: report } });
    } catch (error) {
      hideLoading();
      message.error({ content: "Analiz başarısız oldu.", key: 'analyze' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 min-h-[80vh] w-full bg-[#020617] text-slate-300">
      <div className="w-full max-w-6xl px-6">
        <div className="flex items-center gap-4 mb-10 border-b border-slate-800/80 pb-5">
          <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
            <FolderOpenOutlined className="text-3xl text-teal-400" />
          </div>
          <div>
            <Title level={3} style={{ color: '#f8fafc', margin: 0, letterSpacing: '0.5px' }}>Proje Merkezi</Title>
            <Text className="text-slate-500 font-mono text-xs uppercase tracking-widest">Active Repositories</Text>
          </div>
        </div>

        {isLoadingRepos ? (
          <div className="flex justify-center py-20"><Spin size="large" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
              <div key={repo.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 pointer-events-none"></div>
                <Card 
                  hoverable
                  onClick={() => !isAnalyzing && handleAnalyze(repo.htmlUrl || repo.html_url)}
                  className={`relative z-10 h-full bg-[#0f172a]/80 backdrop-blur-md border-slate-800/50 hover:border-teal-500/50 transition-all duration-500 rounded-2xl overflow-hidden ${isAnalyzing ? 'cursor-wait opacity-50' : 'cursor-pointer'}`}
                  bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Text className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors truncate pr-4">{repo.name}</Text>
                    <Tag color="cyan" className="m-0 bg-teal-500/10 border-teal-500/20 text-teal-400 font-mono text-[10px]">C#</Tag>
                  </div>
                  <Text className="text-xs text-slate-500 line-clamp-2 mb-8 font-sans leading-relaxed">{repo.description || "No description provided."}</Text>
                  <div className="mt-auto flex justify-between items-center border-t border-slate-800/50 pt-4">
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter italic">analysis_ready</span>
                    <span className="text-teal-500 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform tracking-widest">RUN_SCAN _</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;