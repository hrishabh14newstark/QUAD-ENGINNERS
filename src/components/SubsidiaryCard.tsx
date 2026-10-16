import React from 'react';
import { Subsidiary } from '../types';
import { ArrowUpRight, TrendingUp, Cpu, Sliders, ChevronRight } from 'lucide-react';

interface SubsidiaryCardProps {
  subsidiary: Subsidiary;
  onSelect: (sub: Subsidiary) => void;
  onEdit: (sub: Subsidiary) => void;
}

export const SubsidiaryCard: React.FC<SubsidiaryCardProps> = ({
  subsidiary,
  onSelect,
  onEdit
}) => {
  const isHighGrowth = subsidiary.growthRate >= 30;

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 hover:bg-slate-900/80 transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: Unboxed metadata */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-cyan-400 font-semibold">{subsidiary.sector}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{subsidiary.ownershipPercent}% Quad Stake</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            {subsidiary.hq.split('&')[0]}
          </span>
        </div>

        {/* Company Title */}
        <div className="flex items-baseline justify-between mb-2">
          <h3
            onClick={() => onSelect(subsidiary)}
            className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {subsidiary.name}
            <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              {subsidiary.code}
            </span>
          </h3>
          <span className="text-xs font-mono font-medium text-slate-400">
            Gov: <span className="text-emerald-400">{subsidiary.governanceHealth}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {subsidiary.description}
        </p>

        {/* Key Metrics Strip (Tabular) */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-950/60 rounded-lg border border-slate-800/60 mb-4 font-mono">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Enterprise Val</div>
            <div className="text-sm font-bold text-white tabular-nums">
              ${(subsidiary.valuation / 1000).toFixed(2)}B
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Revenue / YoY</div>
            <div className="text-sm font-bold text-emerald-400 tabular-nums">
              ${subsidiary.annualRevenue}M <span className="text-[11px] font-normal">+{subsidiary.growthRate}%</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">EBITDA Margin</div>
            <div className="text-sm font-bold text-cyan-400 tabular-nums">
              {subsidiary.ebitdaMargin.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Divisions & Board Lead */}
        <div className="space-y-1.5 mb-4 text-xs">
          <div className="text-slate-400 flex items-center gap-1.5 truncate">
            <span className="text-slate-500 font-medium">Divisions:</span>
            <span className="text-slate-300 truncate">{subsidiary.keyDivisions.join(' · ')}</span>
          </div>
          <div className="text-slate-400 flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Board Lead:</span>
            <span className="text-amber-300/90 font-medium">{subsidiary.boardLead}</span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
        <button
          onClick={() => onEdit(subsidiary)}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Adjust Financials</span>
        </button>
        <button
          onClick={() => onSelect(subsidiary)}
          className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer flex items-center gap-1 group/btn"
        >
          <span>Dossier & Statements</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
