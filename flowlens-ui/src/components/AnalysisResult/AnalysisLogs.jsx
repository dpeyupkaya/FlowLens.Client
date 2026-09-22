const AnalysisLogs = ({ issues = [] }) => (
  <div className="mt-6 bg-slate-900/30 p-4 rounded-xl border border-slate-800">
    <div className="text-slate-400 text-sm font-medium mb-3 border-b border-slate-800/50 pb-2 flex justify-between">
      <span>Sistem Günlükleri</span>
      <span>{issues.length} Kayıt</span>
    </div>
    <div className="max-h-24 overflow-auto text-xs font-mono text-slate-300 custom-scrollbar pr-2">
      {issues.length > 0 ? (
        issues.map((issue, i) => (
          <div key={i} className="mb-2 border-b border-slate-800/30 pb-2 last:border-0 hover:bg-slate-800/40 px-2 rounded-md transition-colors flex gap-2">
            <span className="text-slate-500 shrink-0">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-teal-500 font-semibold shrink-0">INF:</span>
            <span className="break-words leading-relaxed">{issue}</span>
          </div>
        ))
      ) : (
        <div className="text-slate-500 italic p-2">Kayıtlı log bulunamadı...</div>
      )}
    </div>
  </div>
);

export default AnalysisLogs;