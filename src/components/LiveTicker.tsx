import React from 'react';
import { Subsidiary } from '../types';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

interface LiveTickerProps {
  subsidiaries: Subsidiary[];
  onSelectSubsidiary: (sub: Subsidiary) => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({
  subsidiaries,
  onSelectSubsidiary,
  isStreaming,
  onToggleStreaming
}) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 text-xs py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Stream Status Control */}
        <div className="flex items-center gap-2 shrink-0 border-r border-slate-800 pr-3">
          <button
            onClick={onToggleStreaming}
            title={isStreaming ? 'Pause Real-Time Simulation' : 'Resume Real-Time Simulation'}
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Radio className={`w-3.5 h-3.5 ${isStreaming ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="font-semibold">{isStreaming ? 'LIVE TICKER' : 'PAUSED'}</span>
          </button>
        </div>

        {/* Scrolling or Flex Ticker Items */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
          {subsidiaries.map((sub) => {
            const isPositive = sub.dailyChange >= 0;
            return (
              <div
                key={sub.id}
                onClick={() => onSelectSubsidiary(sub)}
                className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/60 px-2 py-0.5 rounded transition-colors shrink-0"
              >
                <span className="font-mono font-bold text-slate-200">{sub.code}</span>
                <span className="font-mono text-slate-400 tabular-nums">
                  {sub.livePriceIndex.toFixed(1)}
                </span>
                <span
                  className={`flex items-center text-[11px] font-mono font-medium tabular-nums ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {isPositive ? '+' : ''}
                  {sub.dailyChange.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Global Holding Index */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 border-l border-slate-800 pl-3 font-mono text-[11px] text-slate-400">
          <span>QUAD-COMPOSITE:</span>
          <span className="text-cyan-400 font-bold tabular-nums">131.8</span>
          <span className="text-emerald-400 font-semibold tabular-nums">+2.4%</span>
        </div>
      </div>
    </div>
  );
};
