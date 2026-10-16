import React from 'react';
import { Subsidiary } from '../types';
import { Building2, TrendingUp, DollarSign, Users, ShieldCheck, PieChart } from 'lucide-react';

interface StatSummaryProps {
  subsidiaries: Subsidiary[];
}

export const StatSummary: React.FC<StatSummaryProps> = ({ subsidiaries }) => {
  // Compute aggregated roll-ups
  const totalValuation = subsidiaries.reduce((acc, s) => acc + s.valuation, 0);
  const quadShareValuation = subsidiaries.reduce(
    (acc, s) => acc + (s.valuation * s.ownershipPercent) / 100,
    0
  );
  const totalRevenue = subsidiaries.reduce((acc, s) => acc + s.annualRevenue, 0);
  const quadShareRevenue = subsidiaries.reduce(
    (acc, s) => acc + (s.annualRevenue * s.ownershipPercent) / 100,
    0
  );
  const totalEbitdaDollars = subsidiaries.reduce(
    (acc, s) => acc + (s.annualRevenue * s.ebitdaMargin) / 100,
    0
  );
  const blendedMargin = totalRevenue > 0 ? (totalEbitdaDollars / totalRevenue) * 100 : 0;
  const totalHeadcount = subsidiaries.reduce((acc, s) => acc + s.headcount, 0);
  const totalCash = subsidiaries.reduce((acc, s) => acc + s.cashReserves, 0);
  const avgGrowthRate =
    subsidiaries.length > 0
      ? subsidiaries.reduce((acc, s) => acc + s.growthRate, 0) / subsidiaries.length
      : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Stat 1: Enterprise Value */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4.5 hover:border-slate-700/80 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-medium">Quad Net Asset Value</span>
          <PieChart className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
            ${(quadShareValuation / 1000).toFixed(2)}B
          </span>
          <span className="text-xs font-mono text-emerald-400 tabular-nums">
            +{(avgGrowthRate * 0.7).toFixed(1)}% YoY
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 font-mono">
          <span>Gross Portfolio: ${(totalValuation / 1000).toFixed(2)}B</span>
          <span aria-hidden="true">·</span>
          <span>{subsidiaries.length} Entities</span>
        </div>
      </div>

      {/* Stat 2: Consolidated Annual Revenue */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4.5 hover:border-slate-700/80 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-medium">Consolidated Revenue</span>
          <DollarSign className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
            ${(totalRevenue / 1000).toFixed(2)}B
          </span>
          <span className="text-xs font-mono text-emerald-400 tabular-nums">
            +{avgGrowthRate.toFixed(1)}% YoY
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 font-mono">
          <span>Quad Share: ${(quadShareRevenue / 1000).toFixed(2)}B</span>
          <span aria-hidden="true">·</span>
          <span>Weighted Stake 82%</span>
        </div>
      </div>

      {/* Stat 3: Blended EBITDA Margin */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4.5 hover:border-slate-700/80 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-medium">Blended EBITDA Margin</span>
          <TrendingUp className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
            {blendedMargin.toFixed(1)}%
          </span>
          <span className="text-xs font-mono text-slate-400">
            (${totalEbitdaDollars.toFixed(0)}M)
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 font-mono">
          <span>Cash Reserves: ${totalCash}M</span>
          <span aria-hidden="true">·</span>
          <span>Avg D/E 0.35x</span>
        </div>
      </div>

      {/* Stat 4: Global Engineering Workforce */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4.5 hover:border-slate-700/80 transition-colors">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-medium">Total Engineering Workforce</span>
          <Users className="w-4 h-4 text-violet-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl lg:text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
            {totalHeadcount.toLocaleString()}
          </span>
          <span className="text-xs font-mono text-slate-400">
            in 48 Facilities
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 font-mono">
          <span>Active Patents: 340+</span>
          <span aria-hidden="true">·</span>
          <span>14 Nations</span>
        </div>
      </div>
    </div>
  );
};
