import { GithubOutlined, FolderOpenOutlined, CodeOutlined, NodeIndexOutlined, BranchesOutlined } from '@ant-design/icons';

const MetricItem = ({ icon, label, value, color }) => (
  <div className="flex items-center justify-between border-b border-slate-800/50 pb-3 last:border-0">
    <div className="flex items-center gap-3 text-slate-400">
      {icon}
      <span className="text-[11px] font-mono uppercase tracking-wider">{label}</span>
    </div>
    <span className="text-white font-bold text-lg">{value}</span>
  </div>
);

const AnalysisSidebar = ({ stats }) => (
  <div className="flex flex-col gap-4 h-full">
    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 shadow-inner flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20">
        <GithubOutlined className="text-2xl text-indigo-400" />
      </div>
      <h2 className="text-white text-lg font-bold truncate w-full mb-1" title={stats.name}>
        {stats.name}
      </h2>
      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Analiz Edilen Proje</span>
    </div>

    <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 shadow-sm flex flex-col gap-4 flex-grow">
      <MetricItem icon={<FolderOpenOutlined className="text-teal-500 text-lg" />} label="Dosyalar" value={stats.files} />
      <MetricItem icon={<CodeOutlined className="text-blue-500 text-lg" />} label="Satırlar" value={stats.lines} />
      <MetricItem icon={<NodeIndexOutlined className="text-purple-500 text-lg" />} label="Sınıflar" value={stats.nodeCount} />
      <MetricItem icon={<BranchesOutlined className="text-emerald-500 text-lg" />} label="Bağlar" value={stats.edgeCount} />
    </div>
  </div>
);

export default AnalysisSidebar;