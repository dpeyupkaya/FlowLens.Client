import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, message } from 'antd';
import * as signalR from '@microsoft/signalr';
import { githubService } from '../services/githubService';
import { analysisService } from '../services/analysisService';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import RepoCard from '../components/dashboard/RepoCard';
import AnalysisModal from '../components/dashboard/AnalysisModal';

const DashboardPage = () => {
  const [repos, setRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRepoUrl, setSelectedRepoUrl] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const data = await githubService.getCSharpRepos();
      setRepos(Array.isArray(data) ? data : data.repos || []);
    } catch (error) {
      message.error("Sistem hatası: Repolar yüklenemedi.");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleAnalyzeClick = (url) => {
    setSelectedRepoUrl(url);
    setLogs([]);
    setProgress(0);
    setAnalysisData(null);
    setAnalysisStatus('idle');
    setModalVisible(true);
  };

  const startLiveAnalysis = async () => {
    setAnalysisStatus('analyzing');
    setLogs(["[SİSTEM] Güvenli hat kuruluyor...", "[SİSTEM] Analiz motoru başlatıldı."]);

    const baseUrl = import.meta.env.VITE_API_URL;
    const hubUrl = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/analysisHub`;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    try {
      await connection.start();
      
      connection.on("ReceiveAnalysisLog", (newLog) => {
        setLogs(prev => [...prev, newLog]);
        setProgress(prev => Math.min(prev + 5, 99));
      });

      const report = await analysisService.startAnalysis(selectedRepoUrl);
      
      setAnalysisData(report);
      setProgress(100);
      setLogs(prev => [...prev, "[BAŞARI] Analiz süreci tamamlandı. Rapor hazır."]);

    } catch (err) {
      message.error("Bağlantı hatası oluştu.");
      setAnalysisStatus('idle');
    } finally {
      if (connection.state === signalR.HubConnectionState.Connected) {
        await connection.stop();
      }
    }
  };

  const handleShowResults = () => {
    setModalVisible(false);
    navigate('/analysis/results', { state: { analysisResult: analysisData } });
  };

  return (
    <div className="flex flex-col items-center py-12 min-h-screen w-full bg-[#020617] text-slate-300">
      <div className="w-full max-w-6xl px-6">
        <DashboardHeader />

        {isLoadingRepos ? (
          <div className="flex justify-center py-20"><Spin size="large" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
              <RepoCard 
                key={repo.id} 
                repo={repo} 
                onAnalyze={handleAnalyzeClick} 
                isAnalyzing={analysisStatus === 'analyzing'} 
              />
            ))}
          </div>
        )}
      </div>

      <AnalysisModal 
        visible={modalVisible}
        status={analysisStatus}
        progress={progress}
        logs={logs}
        onCancel={() => setModalVisible(false)}
        onConfirm={startLiveAnalysis}
        onShowResults={handleShowResults}
      />
    </div>
  );
};

export default DashboardPage;