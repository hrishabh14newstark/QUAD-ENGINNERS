import React, { useState } from 'react';
import { FinancialEvent, Subsidiary, EventCategory } from '../types';
import { 
  Radio, 
  Play, 
  Pause, 
  Zap, 
  Plus, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface DynamicFinancialFeedProps {
  events: FinancialEvent[];
  subsidiaries: Subsidiary[];
  isStreaming: boolean;
  onToggleStreaming: () => void;
  streamSpeed: number;
  onSetStreamSpeed: (speed: number) => void;
  onTriggerEvent: () => void;
  onOpenAddEventModal: () => void;
  onSelectSubsidiary: (sub: Subsidiary) => void;
}

const CATEGORIES: ('All' | EventCategory)[] = [
  'All',
  'Earnings',
  'Capex',
  'M&A',
  'Dividend',
  'Operational',
  'Valuation'
];

export const DynamicFinancialFeed: React.FC<DynamicFinancialFeedProps> = ({
  events,
  subsidiaries,
  isStreaming,
  onToggleStreaming,
  streamSpeed,
  onSetStreamSpeed,
  onTriggerEvent,
  onOpenAddEventModal,
  onSelectSubsidiary
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | EventCategory>('All');
  const [selectedSubId, setSelectedSubId] = useState<string>('All');

  const filteredEvents = events.filter((evt) => {
    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesSub = selectedSubId === 'All' || evt.subsidiaryId === selectedSubId;
    return matchesCat && matchesSub;
  });

  // Calculate live feed aggregates
  const totalDividendsReported = events
    .filter((e) => e.category === 'Dividend')
    .reduce((acc) => acc + 42.5, 0); // representative cumulative

  return (
    <div className="space-y-6">
      {/* Feed Control Strip */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">
                Live Portfolio Financial Performance Stream
              </span>
              <span className="text-xs font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">
                {events.length} Real-Time Events
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Automated financial telemetry, contract disclosures, board capital allocations, and dividend transfers
            </p>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Speed selector */}
            <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs font-mono">
              <span className="px-2 text-slate-500 text-[11px]">Speed:</span>
              <button
                onClick={() => onSetStreamSpeed(3000)}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  streamSpeed === 3000 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                3s
              </button>
              <button
                onClick={() => onSetStreamSpeed(6000)}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  streamSpeed === 6000 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                6s
              </button>
              <button
                onClick={() => onSetStreamSpeed(12000)}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  streamSpeed === 12000 ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                12s
              </button>
            </div>

            {/* Play / Pause toggle */}
            <button
              onClick={onToggleStreaming}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                isStreaming
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isStreaming ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Streaming Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Stream Paused</span>
                </>
              )}
            </button>

            {/* Manual Trigger Button */}
            <button
              onClick={onTriggerEvent}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-800/70 rounded-lg hover:bg-amber-900/60 transition-colors cursor-pointer"
              title="Simulate immediate financial disclosure event"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Event</span>
            </button>

            {/* Post event button */}
            <button
              onClick={onOpenAddEventModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-sm shadow-cyan-950/50"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Log Event</span>
            </button>
          </div>
        </div>

        {/* Filter bar: Segmented control */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {cat === 'All' ? 'All Disclosures' : cat}
              </button>
            ))}
          </div>

          {/* Subsidiary Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px] whitespace-nowrap">Filter Entity:</span>
            <select
              value={selectedSubId}
              onChange={(e) => setSelectedSubId(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-md px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="All">All Portfolio Entities</option>
              {subsidiaries.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Feed Items */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-12 text-center">
            <Clock className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <div className="text-slate-300 font-medium">No events found matching criteria</div>
            <p className="text-xs text-slate-500 mt-1">Try switching categories or click "Simulate Event" above.</p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const relatedSub = subsidiaries.find((s) => s.id === event.subsidiaryId);
            return (
              <div
                key={event.id}
                className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 hover:border-slate-700/80 hover:bg-slate-900/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  {/* Metadata line: Unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                      {event.code}
                    </span>
                    <button
                      onClick={() => relatedSub && onSelectSubsidiary(relatedSub)}
                      className="text-cyan-400 font-sans font-semibold hover:underline cursor-pointer"
                    >
                      {event.subsidiaryName}
                    </button>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400 font-medium">{event.category}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-500">{event.timestamp}</span>
                  </div>

                  {/* Headline */}
                  <h4 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
                    {event.headline}
                  </h4>

                  {/* Context Prose */}
                  <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl">
                    {event.details}
                  </p>
                </div>

                {/* Financial Impact badge & CTA */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                      Impact
                    </div>
                    <div
                      className={`text-sm font-mono font-bold tabular-nums ${
                        event.type === 'positive'
                          ? 'text-emerald-400'
                          : event.type === 'neutral'
                          ? 'text-cyan-300'
                          : 'text-amber-400'
                      }`}
                    >
                      {event.financialImpact}
                    </div>
                  </div>

                  {relatedSub && (
                    <button
                      onClick={() => onSelectSubsidiary(relatedSub)}
                      className="text-xs font-medium text-slate-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Entity Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
