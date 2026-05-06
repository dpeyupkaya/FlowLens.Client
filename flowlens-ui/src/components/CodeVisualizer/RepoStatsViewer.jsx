import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { 
  StarOutlined, 
  ForkOutlined, 
  BugOutlined, 
  CodeOutlined, 
  CalendarOutlined, 
  BranchesOutlined 
} from '@ant-design/icons';

const RepoStatsViewer = ({ stats }) => {
  if (!stats) return null;

  const stars = stats.stars ?? stats.Stars ?? 0;
  const forks = stats.forks ?? stats.Forks ?? 0;
  const openIssues = stats.openIssues ?? stats.OpenIssues ?? 0;
  const language = stats.primaryLanguage ?? stats.PrimaryLanguage ?? "Bilinmiyor";
  const defaultBranch = stats.defaultBranch ?? stats.DefaultBranch ?? "main";
  const lastPushedAt = stats.lastPushedAt ?? stats.LastPushedAt;

  const formatDate = (dateString) => {
    if (!dateString) return "Bilinmiyor";
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mb-8 p-6 bg-[#0f172a] rounded-2xl border border-slate-800/80 shadow-lg animate-fade-in">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700/50 pb-2">
        Proje Röntgeni
      </h3>
      
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={4}>
          <Statistic 
            title={<span className="text-slate-400 text-xs uppercase tracking-wider">Yıldız</span>} 
            value={stars} 
            prefix={<StarOutlined className="text-yellow-400" />} 
            valueStyle={{ color: '#fff', fontWeight: 'bold' }} 
          />
        </Col>
        
        <Col xs={12} sm={8} md={4}>
          <Statistic 
            title={<span className="text-slate-400 text-xs uppercase tracking-wider">Fork</span>} 
            value={forks} 
            prefix={<ForkOutlined className="text-blue-400" />} 
            valueStyle={{ color: '#fff', fontWeight: 'bold' }} 
          />
        </Col>
        
        <Col xs={12} sm={8} md={4}>
          <Statistic 
            title={<span className="text-slate-400 text-xs uppercase tracking-wider">Açık Issue</span>} 
            value={openIssues} 
            prefix={<BugOutlined className="text-red-400" />} 
            valueStyle={{ color: '#fff', fontWeight: 'bold' }} 
          />
        </Col>

        <Col xs={12} sm={8} md={4}>
          <Statistic 
            title={<span className="text-slate-400 text-xs uppercase tracking-wider">Ana Dil</span>} 
            value={language} 
            prefix={<CodeOutlined className="text-teal-400" />} 
            valueStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }} 
          />
        </Col>

        <Col xs={12} sm={8} md={4}>
          <Statistic 
            title={<span className="text-slate-400 text-xs uppercase tracking-wider">Ana Dal</span>} 
            value={defaultBranch} 
            prefix={<BranchesOutlined className="text-purple-400" />} 
            valueStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }} 
          />
        </Col>

        <Col xs={12} sm={8} md={4}>
          <Statistic 
            title={<span className="text-slate-400 text-xs uppercase tracking-wider">Son Güncelleme</span>} 
            value={formatDate(lastPushedAt)} 
            prefix={<CalendarOutlined className="text-orange-400" />} 
            valueStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }} 
          />
        </Col>
      </Row>
    </div>
  );
};

export default RepoStatsViewer;