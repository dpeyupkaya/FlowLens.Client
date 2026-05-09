import React from 'react';

const RepoStatsViewer = ({ stats }) => {
  if (!stats) return null;

  const stars = stats.stars ?? stats.Stars ?? 0;
  const forks = stats.forks ?? stats.Forks ?? 0;
  const openIssues = stats.openIssues ?? stats.OpenIssues ?? 0;
  const language = stats.primaryLanguage ?? stats.PrimaryLanguage ?? "Tanımsız";
  const defaultBranch = stats.defaultBranch ?? stats.DefaultBranch ?? "main";
  const lastPushedAt = stats.lastPushedAt ?? stats.LastPushedAt;

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    // Kurumsal görünüm için "21 Ağustos" yerine "21 Ağu 2025" gibi daha kısa ve net bir format
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Tekrar eden metrik blokları için minimalist bir iç bileşen
  const StatItem = ({ label, value }) => (
    <div className="flex flex-col gap-1.5 p-4 lg:p-0 lg:px-8 lg:first:pl-2 border-b border-slate-800/40 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
        {label}
      </span>
      <span className="font-mono text-xl font-bold text-slate-100 tracking-tight">
        {value}
      </span>
    </div>
  );

  return (
    <div className="mb-6 bg-[#0B1120] p-6 lg:p-7 rounded-2xl border border-slate-800/60 shadow-xl relative overflow-hidden animate-fade-in">
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"></div>

      <div className="mb-5 border-b border-slate-800/50 pb-3">
        <h3 className="text-xs font-mono text-teal-500/80 uppercase tracking-[0.3em] font-semibold">
          REPO METRİKLERİ
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:items-center">
        <StatItem label="YILDIZ" value={stars.toLocaleString('tr-TR')} />
        <StatItem label="FORK" value={forks.toLocaleString('tr-TR')} />
        <StatItem label="AÇIK ISSUE" value={openIssues.toLocaleString('tr-TR')} />
        <StatItem label="ANA DİL" value={language} />
        <StatItem label="ANA DAL" value={defaultBranch} />
        <StatItem label="SON GÜNCELLEME" value={formatDate(lastPushedAt)} />
      </div>

    </div>
  );
};

export default RepoStatsViewer;