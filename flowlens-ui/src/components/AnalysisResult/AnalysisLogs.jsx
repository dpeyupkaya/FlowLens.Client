const AnalysisLogs = ({ issues = [] }) => (
  <div className="mt-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
    <div className="text-slate-500 text-[10px] mb-2 font-mono uppercase tracking-widest border-b border-slate-800/50 pb-2 flex justify-between">
      <span>Sistem Logları</span>
      <span>{issues.length} Kayıt</span>
    </div>
    <div className="max-h-24 overflow-auto text-[11px] font-mono text-emerald-500/80 custom-scrollbar pr-2">
      {issues.length > 0 ? (
        issues.map((issue, i) => (
          <div key={i} className="mb-1.5 border-b border-slate-800/30 pb-1.5 last:border-0 hover:bg-slate-800/20 px-2 rounded transition-colors flex gap-2">
            <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-teal-600 font-bold shrink-0">INF:</span>
            <span className="text-slate-400 break-words">{issue}</span>
          </div>
        ))
      ) : (
        <div className="text-slate-500 italic">Kayıtlı log bulunamadı...</div>
      )}
    </div>
  </div>
);

export default AnalysisLogs;