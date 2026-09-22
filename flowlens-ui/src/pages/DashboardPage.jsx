import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, message, Select } from 'antd';
import * as signalR from '@microsoft/signalr';
import { githubService } from '../services/githubService';
import { analysisService } from '../services/analysisService';
import { userService } from '../services/userService';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import RepoCard from '../components/dashboard/RepoCard';
import AnalysisModal from '../components/dashboard/AnalysisModal';

const DashboardPage = () => {
  const [repos, setRepos] = useState([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const [analysisStatus, setAnalysisStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);
  
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  useEffect(() => {
    fetchInitialData();
  }, [selectedLanguage]);

  const fetchInitialData = async () => {
    try {
      setIsLoadingRepos(true);

      const [repoData, userData] = await Promise.all([
        githubService.getRepos(selectedLanguage),
        userService.getUserMe()
      ]);

      const finalRepoData = Array.isArray(repoData) ? repoData : (repoData.repos || []);
      setRepos(finalRepoData);
      setProfileData(userData);

    } catch (error) {
      console.error(error);
      message.error("Sistem hatası: Veriler yüklenemedi.");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleAnalyzeClick = (repo) => {
    setSelectedRepo(repo);
    setLogs([]);
    setProgress(0);
    setAnalysisData(null);
    setAnalysisStatus('idle');
    setModalVisible(true);
  };

  const handleAnalyzeCustomRepo = (owner, repoName) => {
    const customRepo = {
      id: `custom-${owner}-${repoName}`,
      name: repoName,
      owner: { login: owner },
      fullName: `${owner}/${repoName}`,
      isCustom: true
    };
    handleAnalyzeClick(customRepo);
  };

  const startLiveAnalysis = async (selectedLanguages) => {
    setAnalysisStatus('analyzing');
    setLogs(["[SİSTEM] Güvenli hat kuruluyor...", "[SİSTEM] Analiz motoru başlatıldı."]);
    setProgress(0); 

    const baseUrl = import.meta.env.VITE_API_URL;
    const hubUrl = `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}/analysisHub`;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    try {
      await connection.start();

      const currentAnalysisId = crypto.randomUUID();

      await connection.invoke("SubscribeToAnalysis", currentAnalysisId);
     

      connection.on("ReceiveAnalysisLog", (newLog) => {
        setLogs(prev => [...prev, newLog]);
        setProgress(prev => Math.min(prev + 5, 99));
      });

      const report = await analysisService.startAnalysis(selectedRepo, currentAnalysisId, selectedLanguages);

      setAnalysisData(report);
      setProgress(100);
      setLogs(prev => [...prev, "[BAŞARI] Analiz süreci tamamlandı. Rapor hazır."]);

      const currentCount = profileData?.dailyAnalysisCount ?? profileData?.DailyAnalysisCount ?? 0;
      const newCount = currentCount + 1;

      setProfileData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          dailyAnalysisCount: newCount,
          DailyAnalysisCount: newCount
        };
      });

      window.dispatchEvent(new CustomEvent('quotaUpdated', { detail: newCount }));

    } catch (err) {
      console.error("Analiz Süreci Hatası:", err);
      
      let validationErrors = "";
      if (err.response?.data?.errors) {
        validationErrors = Object.values(err.response.data.errors).flat().join(" | ");
      }

      const errorMessage = validationErrors
                        || err.response?.data?.Message 
                        || err.response?.data?.message 
                        || err.response?.data?.title
                        || err.response?.data?.error 
                        || err.message 
                        || "Analiz sırasında beklenmeyen bir hata oluştu.";
      
      setLogs(prev => [...prev, `[HATA] ${errorMessage}`]);
      message.error(errorMessage, 6);
      setAnalysisStatus('idle');
      setModalVisible(false);
    } finally {
      
      if (connection.state === signalR.HubConnectionState.Connected) {
        await connection.stop();
      }
    }
  };

  const handleShowResults = () => {
    setModalVisible(false);
    const enrichedData = {
      ...analysisData,
      repoName: selectedRepo?.name || "Bilinmeyen Repo",
    };
    navigate('/analysis/results', { state: { analysisResult: enrichedData } });
  };

  const currentDailyCount = profileData?.dailyAnalysisCount ?? profileData?.DailyAnalysisCount ?? 0;

  return (
    <div className="flex flex-col items-center py-10 min-h-screen w-full bg-[#020617] text-slate-300">
      <div className="w-full max-w-7xl px-8">

        <DashboardHeader
          totalRepos={repos.length}
          loading={isLoadingRepos}
          onAnalyzeCustomRepo={handleAnalyzeCustomRepo}
        />

        <div className="flex justify-end items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Dil Filtresi:</span>
            <Select
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              className="w-40"
              options={[
                { value: 'All', label: 'Tüm Diller' },
                { value: 'C#', label: 'C#' },
                { value: 'Python', label: 'Python' },
                { value: 'Go', label: 'Go' },
                { value: 'JavaScript', label: 'JavaScript' },
                { value: 'TypeScript', label: 'TypeScript' }
              ]}
            />
          </div>
        </div>

        {isLoadingRepos ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Spin size="large" />
            <span className="text-slate-500 font-mono animate-pulse uppercase tracking-widest text-xs">
              GitHub Repoları ve Profil taranıyor...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-in">
            {repos.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onAnalyze={() => handleAnalyzeClick(repo)}
                isAnalyzing={analysisStatus === 'analyzing' && selectedRepo?.id === repo.id}
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
        repo={selectedRepo}
        onCancel={() => setModalVisible(false)}
        onConfirm={startLiveAnalysis}
        onShowResults={handleShowResults}
        dailyCount={currentDailyCount}
        maxLimit={5}
      />
    </div>
  );
};

export default DashboardPage;