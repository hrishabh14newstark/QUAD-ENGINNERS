import React, { useState } from 'react';
import { Subsidiary } from '../types';
import { ShieldAlert, TrendingDown, TrendingUp, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

interface ScenarioSimulatorProps {
  subsidiaries: Subsidiary[];
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ subsidiaries }) => {
  const [activePreset, setActivePreset] = useState<'baseline' | 'interest_shock' | 'supply_chain' | 'capex_boom'>('baseline');
  const [growthModifier, setGrowthModifier] = useState<number>(0); // e.g. -10% to +30%
  const [marginModifier, setMarginModifier] = useState<number>(0); // e.g. -6% to +6%
  const [valuationMultipleMod, setValuationMultipleMod] = useState<number>(0); // e.g. -20% to +20%

  const applyPreset = (preset: 'baseline' | 'interest_shock' | 'supply_chain' | 'capex_boom') => {
    setActivePreset(preset);
    if (preset === 'baseline') {
      setGrowthModifier(0);
      setMarginModifier(0);
      setValuationMultipleMod(0);
    } else if (preset === 'interest_shock') {
      setGrowthModifier(-4);
      setMarginModifier(-2.5);
      setValuationMultipleMod(-15);
    } else if (preset === 'supply_chain') {
      setGrowthModifier(-8);
      setMarginModifier(-5.2);
      setValuationMultipleMod(-8);
    } else if (preset === 'capex_boom') {
      setGrowthModifier(18);
      setMarginModifier(3.8);
      setValuationMultipleMod(12);
    }
  };

  // Base computations
  const baseQuadVal = subsidiaries.reduce(
    (acc, s) => acc + (s.valuation * s.ownershipPercent) / 100,
    0
  );
  const baseRevenue = subsidiaries.reduce((acc, s) => acc + s.annualRevenue, 0);
  const baseEbitda = subsidiaries.reduce(
    (acc, s) => acc + (s.annualRevenue * s.ebitdaMargin) / 100,
    0
  );
  const baseMargin = (baseEbitda / baseRevenue) * 100;
  const baseCash = subsidiaries.reduce((acc, s) => acc + s.cashReserves, 0);

  // Stressed computations
  const stressedQuadVal = baseQuadVal * (1 + valuationMultipleMod / 100);
  const stressedRevenue = baseRevenue * (1 + growthModifier / 100);
  const stressedMargin = Math.max(5, baseMargin + marginModifier);
  const stressedEbitda = (stressedRevenue * stressedMargin) / 100;
  const stressedCashDelta = (stressedEbitda - baseEbitda) * 0.65;
  const stressedCash = Math.max(200, baseCash + stressedCashDelta);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>Executive Stress-Testing & Macroeconomic Shock Modeling</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Holding Capital Resilience Engine
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1 max-w-2xl leading-relaxed">
              Model severe geopolitical supply chain bottlenecks, monetary tightening, or sovereign procurement supercycles across all 7 portfolio subsidiaries to test balance sheet liquidity.
            </p>
          </div>

          <button
            onClick={() => applyPreset('baseline')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer self-start md:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <button
            onClick={() => applyPreset('baseline')}
            className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
              activePreset === 'baseline'
                ? 'bg-slate-800 border-cyan-500 text-white'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold">Nominal Baseline</div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">Status-quo compounding</div>
          </button>

          <button
            onClick={() => applyPreset('interest_shock')}
            className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
              activePreset === 'interest_shock'
                ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold flex items-center justify-between">
              <span>+150 bps Rate Spike</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">Multiple compression</div>
          </button>

          <button
            onClick={() => applyPreset('supply_chain')}
            className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
              activePreset === 'supply_chain'
                ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold flex items-center justify-between">
              <span>Titanium & Rare Metals Shock</span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">-520 bps gross margin</div>
          </button>

          <button
            onClick={() => applyPreset('capex_boom')}
            className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
              activePreset === 'capex_boom'
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold flex items-center justify-between">
              <span>Sovereign Capex Supercycle</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">+18% group revenue surge</div>
          </button>
        </div>
      </div>

      {/* Comparison Grid: Pre-Shock vs Post-Shock */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
        {/* Metric 1: Net Asset Value */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5">
          <div className="text-xs text-slate-400 mb-2 font-sans font-medium">Quad Net Asset Value</div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                ${(stressedQuadVal / 1000).toFixed(2)}B
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Base: ${(baseQuadVal / 1000).toFixed(2)}B
              </div>
            </div>
            <span
              className={`text-xs font-bold tabular-nums ${
                valuationMultipleMod >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {valuationMultipleMod >= 0 ? '+' : ''}
              {valuationMultipleMod}%
            </span>
          </div>
        </div>

        {/* Metric 2: Annual Consolidated Revenue */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5">
          <div className="text-xs text-slate-400 mb-2 font-sans font-medium">Consolidated Revenue</div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                ${(stressedRevenue / 1000).toFixed(2)}B
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Base: ${(baseRevenue / 1000).toFixed(2)}B
              </div>
            </div>
            <span
              className={`text-xs font-bold tabular-nums ${
                growthModifier >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {growthModifier >= 0 ? '+' : ''}
              {growthModifier}%
            </span>
          </div>
        </div>

        {/* Metric 3: Blended EBITDA Margin */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5">
          <div className="text-xs text-slate-400 mb-2 font-sans font-medium">Blended EBITDA Margin</div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                {stressedMargin.toFixed(1)}%
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Base: {baseMargin.toFixed(1)}%
              </div>
            </div>
            <span
              className={`text-xs font-bold tabular-nums ${
                marginModifier >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {marginModifier >= 0 ? '+' : ''}
              {(marginModifier * 100).toFixed(0)} bps
            </span>
          </div>
        </div>

        {/* Metric 4: Holding Liquid Reserves */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4.5">
          <div className="text-xs text-slate-400 mb-2 font-sans font-medium">Group Liquidity Buffer</div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                ${stressedCash.toFixed(0)}M
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Base: ${baseCash}M
              </div>
            </div>
            <span className="text-xs text-cyan-400 font-bold">
              Solvent
            </span>
          </div>
        </div>
      </div>

      {/* Granular Sliders */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-5 text-xs font-mono">
        <h4 className="font-sans font-bold text-sm text-white">Manual Parameter Sensitivities</h4>

        {/* Slider 1 */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <span>YoY Group Revenue Demand Shift:</span>
            <span className="font-bold text-cyan-400 tabular-nums">
              {growthModifier > 0 ? '+' : ''}{growthModifier}%
            </span>
          </div>
          <input
            type="range"
            min="-20"
            max="30"
            step="1"
            value={growthModifier}
            onChange={(e) => {
              setGrowthModifier(Number(e.target.value));
              setActivePreset('baseline');
            }}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Slider 2 */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <span>EBITDA Margin Compression / Expansion:</span>
            <span className="font-bold text-cyan-400 tabular-nums">
              {marginModifier > 0 ? '+' : ''}{marginModifier.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.5"
            value={marginModifier}
            onChange={(e) => {
              setMarginModifier(Number(e.target.value));
              setActivePreset('baseline');
            }}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Slider 3 */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <span>Holding Net Asset Value Multiple Contraction / Expansion:</span>
            <span className="font-bold text-cyan-400 tabular-nums">
              {valuationMultipleMod > 0 ? '+' : ''}{valuationMultipleMod}%
            </span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            value={valuationMultipleMod}
            onChange={(e) => {
              setValuationMultipleMod(Number(e.target.value));
              setActivePreset('baseline');
            }}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
