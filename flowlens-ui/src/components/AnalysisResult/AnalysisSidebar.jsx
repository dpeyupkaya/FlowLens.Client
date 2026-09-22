import { GithubOutlined, FolderOpenOutlined, CodeOutlined, NodeIndexOutlined, BranchesOutlined } from '@ant-design/icons';

const MetricItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between border-b border-slate-800/40 pb-3 last:border-0">
    <div className="flex items-center gap-3 text-slate-400">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-slate-100 font-semibold">{value}</span>
  </div>
);

const AnalysisSidebar = ({ stats }) => (
  <div className="flex flex-col gap-4 h-full">
    <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 flex flex-col items-center text-center">
      <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mb-3 border border-indigo-500/20">
        <GithubOutlined className="text-xl text-indigo-400" />
      </div>
      <h2 className="text-slate-100 text-base font-semibold truncate w-full m-0" title={stats.name}>
        {stats.name}
      </h2>
      <span className="text-xs text-slate-500 mt-1 font-medium">Analiz Edilen Proje</span>
    </div>

    <div className="bg-slate-900/30 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 flex-grow">
      <MetricItem icon={<FolderOpenOutlined className="text-teal-400 text-lg" />} label="Dosyalar" value={stats.files} />
      <MetricItem icon={<CodeOutlined className="text-blue-400 text-lg" />} label="Satırlar" value={stats.lines} />
      <MetricItem icon={<NodeIndexOutlined className="text-purple-400 text-lg" />} label="Sınıflar" value={stats.nodeCount} />
      <MetricItem icon={<BranchesOutlined className="text-emerald-400 text-lg" />} label="Bağlar" value={stats.edgeCount} />
    </div>
  </div>
);

export default AnalysisSidebar;