import React, { useState } from 'react';
import { Subsidiary } from '../types';

interface PerformanceMatrixProps {
  subsidiaries: Subsidiary[];
  onSelect: (sub: Subsidiary) => void;
}

export const PerformanceMatrix: React.FC<PerformanceMatrixProps> = ({
  subsidiaries,
  onSelect
}) => {
  const [hoveredSub, setHoveredSub] = useState<Subsidiary | null>(null);

  // Bounds for visualization:
  // Growth Rate: 10% to 50%
  // EBITDA Margin: 10% to 35%
  const minGrowth = 10;
  const maxGrowth = 50;
  const minMargin = 10;
  const maxMargin = 35;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-bold text-white">
            Subsidiary Strategic Performance Matrix
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            EBITDA Margin % (Y-axis) vs. YoY Revenue Growth % (X-axis) · Bubble size = Enterprise Valuation
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
            <span>Majority / Wholly Owned</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span>Strategic Majority</span>
          </span>
        </div>
      </div>

      {/* 2D Chart Area */}
      <div className="relative w-full h-84 bg-slate-950/80 rounded-lg border border-slate-800/80 p-6 overflow-hidden select-none">
        {/* Quadrant dividing guidelines */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-slate-800/80" />
        <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-slate-800/80" />

        {/* Quadrant labels */}
        <span className="absolute top-3 left-4 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Cash Generators (High Margin, Moderate Growth)
        </span>
        <span className="absolute top-3 right-4 text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider font-semibold">
          Star Assets (High Margin & High Growth)
        </span>
        <span className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Consolidation / Incubating
        </span>
        <span className="absolute bottom-3 right-4 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Aggressive Scale (Reinvestment Phase)
        </span>

        {/* Axis Labels */}
        <div className="absolute -left-12 top-1/2 -rotate-90 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          EBITDA Margin (%)
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          YoY Revenue Growth Rate (%)
        </div>

        {/* Plot Bubbles */}
        {subsidiaries.map((sub) => {
          // normalized positions
          const xPercent = Math.min(
            92,
            Math.max(8, ((sub.growthRate - minGrowth) / (maxGrowth - minGrowth)) * 100)
          );
          const yPercent = Math.min(
            90,
            Math.max(10, 100 - ((sub.ebitdaMargin - minMargin) / (maxMargin - minMargin)) * 100)
          );

          // size based on valuation ($1.4B to $5.3B)
          const sizePx = Math.max(30, Math.min(54, (sub.valuation / 5350) * 54));

          return (
            <div
              key={sub.id}
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
                width: `${sizePx}px`,
                height: `${sizePx}px`
              }}
              onMouseEnter={() => setHoveredSub(sub)}
              onMouseLeave={() => setHoveredSub(null)}
              onClick={() => onSelect(sub)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-transform hover:scale-125 flex items-center justify-center font-mono font-bold text-[11px] shadow-lg ${
                sub.ownershipPercent >= 80
                  ? 'bg-cyan-500/30 border-2 border-cyan-400 text-cyan-200'
                  : 'bg-amber-500/30 border-2 border-amber-400 text-amber-200'
              }`}
            >
              <span>{sub.code}</span>
            </div>
          );
        })}

        {/* Hover Tooltip Overlay */}
        {hoveredSub && (
          <div className="absolute top-4 right-4 bg-slate-900 border border-slate-700/80 rounded-lg p-3 shadow-xl z-20 pointer-events-none w-64 text-xs font-mono">
            <div className="flex items-center justify-between text-white font-bold font-sans">
              <span>{hoveredSub.name}</span>
              <span className="text-cyan-400 font-mono text-[11px]">{hoveredSub.code}</span>
            </div>
            <div className="text-[11px] text-slate-400 mb-2">{hoveredSub.sector}</div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Valuation:</span>
                <span className="text-white font-bold">${(hoveredSub.valuation / 1000).toFixed(2)}B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Revenue:</span>
                <span className="text-white">${hoveredSub.annualRevenue}M (+{hoveredSub.growthRate}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">EBITDA Margin:</span>
                <span className="text-cyan-400 font-bold">{hoveredSub.ebitdaMargin}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stake:</span>
                <span className="text-white">{hoveredSub.ownershipPercent}%</span>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 font-sans">
              Click node to view subsidiary statements
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
