import React from 'react';
import { Subsidiary } from '../types';
import { X, Building2, TrendingUp, DollarSign, Sliders, Trash2, Calendar, MapPin, User, ShieldCheck } from 'lucide-react';

interface SubsidiaryModalProps {
  subsidiary: Subsidiary | null;
  onClose: () => void;
  onEdit: (sub: Subsidiary) => void;
  onDelete: (id: string) => void;
}

export const SubsidiaryModal: React.FC<SubsidiaryModalProps> = ({
  subsidiary,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!subsidiary) return null;

  // Max quarterly revenue for bar scaling
  const maxQRev = Math.max(...subsidiary.quarterlyRevenue.map((q) => q.revenue));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{subsidiary.sector}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{subsidiary.status} Stage</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Gov: {subsidiary.governanceHealth}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              {subsidiary.name}
              <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {subsidiary.code}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
              {subsidiary.description}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-right font-mono shrink-0">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Quad Ownership</div>
            <div className="text-2xl font-bold text-cyan-400 tabular-nums">
              {subsidiary.ownershipPercent}%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Valuation: ${(subsidiary.valuation / 1000).toFixed(2)}B
            </div>
          </div>
        </div>

        {/* Corporate Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-800 text-xs font-mono">
          <div>
            <div className="text-slate-500 text-[10px] flex items-center gap-1">
              <User className="w-3 h-3 text-slate-400" />
              <span>Chief Executive</span>
            </div>
            <div className="text-slate-200 font-semibold mt-0.5">{subsidiary.ceo}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Headquarters</span>
            </div>
            <div className="text-slate-200 font-semibold mt-0.5 truncate">{subsidiary.hq}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Acquired / Founded</span>
            </div>
            <div className="text-slate-200 font-semibold mt-0.5">
              {subsidiary.acquiredYear} ({subsidiary.foundedYear})
            </div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>Quad Board Lead</span>
            </div>
            <div className="text-amber-300 font-semibold mt-0.5 truncate">{subsidiary.boardLead}</div>
          </div>
        </div>

        {/* Financial Breakdown Grid */}
        <div className="mt-6 space-y-6">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase">Annualized Revenue</div>
              <div className="text-lg font-bold text-white tabular-nums">${subsidiary.annualRevenue}M</div>
              <div className="text-[11px] text-emerald-400">+{subsidiary.growthRate}% YoY</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase">EBITDA Margin</div>
              <div className="text-lg font-bold text-cyan-400 tabular-nums">{subsidiary.ebitdaMargin}%</div>
              <div className="text-[11px] text-slate-400">${((subsidiary.annualRevenue * subsidiary.ebitdaMargin) / 100).toFixed(0)}M EBIT</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase">Cash & Capex Budget</div>
              <div className="text-lg font-bold text-white tabular-nums">${subsidiary.cashReserves}M</div>
              <div className="text-[11px] text-slate-400">${subsidiary.capexAllocation}M Capex</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase">Workforce / D-E</div>
              <div className="text-lg font-bold text-white tabular-nums">{subsidiary.headcount}</div>
              <div className="text-[11px] text-slate-400">{subsidiary.debtToEquity}x Leverage</div>
            </div>
          </div>

          {/* Quarterly Revenue & EBITDA Trajectory */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                FY2025–2026 Quarterly Financial Trajectory ($M)
              </h4>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block" />
                  <span>Revenue</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-400 inline-block" />
                  <span>EBITDA</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 items-end h-36 pt-4 border-b border-slate-800">
              {subsidiary.quarterlyRevenue.map((q) => {
                const revHeightPercent = (q.revenue / (maxQRev * 1.15)) * 100;
                const ebitdaHeightPercent = (q.ebitda / (maxQRev * 1.15)) * 100;
                return (
                  <div key={q.quarter} className="flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1.5 w-full justify-center h-full">
                      {/* Revenue Bar */}
                      <div
                        style={{ height: `${revHeightPercent}%` }}
                        className="w-7 sm:w-10 bg-cyan-600 rounded-t hover:bg-cyan-500 transition-all flex flex-col justify-start items-center pt-1"
                        title={`Revenue: $${q.revenue}M`}
                      >
                        <span className="text-[10px] font-mono text-cyan-100 font-bold">
                          ${q.revenue}
                        </span>
                      </div>
                      {/* EBITDA Bar */}
                      <div
                        style={{ height: `${ebitdaHeightPercent}%` }}
                        className="w-5 sm:w-7 bg-emerald-500 rounded-t hover:bg-emerald-400 transition-all flex flex-col justify-start items-center pt-1"
                        title={`EBITDA: $${q.ebitda}M`}
                      >
                        <span className="text-[9px] font-mono text-emerald-950 font-bold">
                          ${q.ebitda}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-semibold">{q.quarter}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Divisions & Strategic Pillars */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Core Operating Divisions & Manufacturing Programs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {subsidiary.keyDivisions.map((div, i) => (
                <div key={i} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
                  <div className="text-xs font-bold text-white mb-1">0{i + 1}. {div}</div>
                  <div className="text-[11px] text-slate-400">
                    Proprietary tooling & dedicated cleanroom assembly.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to archive or remove ${subsidiary.name} from Quad holding portfolio?`)) {
                onDelete(subsidiary.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove Entity</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onEdit(subsidiary);
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Adjust Financials & Metrics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
