import React, { useState, useEffect } from 'react';
import { 
  Subsidiary, 
  Founder, 
  FinancialEvent, 
  Sector 
} from './types';
import { 
  INITIAL_SUBSIDIARIES, 
  INITIAL_FOUNDERS, 
  INITIAL_EVENTS, 
  SIMULATION_TEMPLATES 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { LiveTicker } from './components/LiveTicker';
import { StatSummary } from './components/StatSummary';
import { SubsidiaryCard } from './components/SubsidiaryCard';
import { SubsidiaryTable } from './components/SubsidiaryTable';
import { PerformanceMatrix } from './components/PerformanceMatrix';
import { DynamicFinancialFeed } from './components/DynamicFinancialFeed';
import { AboutFounders } from './components/AboutFounders';
import { FounderModal } from './components/FounderModal';
import { SubsidiaryModal } from './components/SubsidiaryModal';
import { AddSubsidiaryModal } from './components/AddSubsidiaryModal';
import { AddEventModal } from './components/AddEventModal';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { 
  Search, 
  LayoutGrid, 
  Table as TableIcon, 
  Activity, 
  Plus, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'subsidiaries' | 'financial-feed' | 'founders' | 'scenario'>('dashboard');
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>(INITIAL_SUBSIDIARIES);
  const [founders] = useState<Founder[]>(INITIAL_FOUNDERS);
  const [events, setEvents] = useState<FinancialEvent[]>(INITIAL_EVENTS);
  
  // Real-time streaming states
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [streamSpeed, setStreamSpeed] = useState<number>(6000);

  // Modal states
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<Subsidiary | null>(null);
  const [subsidiaryToEdit, setSubsidiaryToEdit] = useState<Subsidiary | null>(null);
  const [isAddSubModalOpen, setIsAddSubModalOpen] = useState<boolean>(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState<boolean>(false);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<'All' | Sector>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'matrix'>('cards');

  // Real-time Event Generator
  const triggerSimulationEvent = () => {
    const templateIndex = Math.floor(Math.random() * SIMULATION_TEMPLATES.length);
    const template = SIMULATION_TEMPLATES[templateIndex];
    const targetSub = subsidiaries.find((s) => s.id === template.subsidiaryId) || subsidiaries[0];

    // Compute updated ticker price index & daily change
    const deltaChange = +(Math.random() * 1.8 - 0.4).toFixed(1);
    const newPriceIndex = +(targetSub.livePriceIndex + deltaChange).toFixed(1);

    // Update subsidiary metrics
    setSubsidiaries((prevSubs) =>
      prevSubs.map((sub) => {
        if (sub.id === targetSub.id) {
          const revBump = template.revenueBump || 0;
          const marginBump = template.marginBump || 0;
          return {
            ...sub,
            annualRevenue: sub.annualRevenue + revBump,
            ebitdaMargin: +(sub.ebitdaMargin + marginBump).toFixed(1),
            livePriceIndex: newPriceIndex,
            dailyChange: deltaChange
          };
        }
        return sub;
      })
    );

    // Create and prepend new event
    const newEvent: FinancialEvent = {
      id: `evt-${Date.now()}`,
      timestamp: 'Just now',
      unixTime: Date.now(),
      subsidiaryId: targetSub.id,
      subsidiaryName: targetSub.name,
      code: targetSub.code,
      category: template.category,
      headline: template.headline,
      financialImpact: template.financialImpact,
      type: template.type,
      details: template.details
    };

    setEvents((prevEvents) => [newEvent, ...prevEvents.slice(0, 49)]);
  };

  // Automated interval timer for streaming
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      triggerSimulationEvent();
    }, streamSpeed);
    return () => clearInterval(interval);
  }, [isStreaming, streamSpeed, subsidiaries]);

  // Handle Save Subsidiary (Add or Edit)
  const handleSaveSubsidiary = (updatedSub: Subsidiary) => {
    setSubsidiaries((prev) => {
      const exists = prev.some((s) => s.id === updatedSub.id);
      if (exists) {
        return prev.map((s) => (s.id === updatedSub.id ? updatedSub : s));
      }
      return [updatedSub, ...prev];
    });

    // Also broadcast a financial event for the holding addition/update
    const evt: FinancialEvent = {
      id: `evt-${Date.now()}`,
      timestamp: 'Just now',
      unixTime: Date.now(),
      subsidiaryId: updatedSub.id,
      subsidiaryName: updatedSub.name,
      code: updatedSub.code,
      category: 'Valuation',
      headline: `Holding registry updated for ${updatedSub.name} ($${(updatedSub.valuation / 1000).toFixed(2)}B)`,
      financialImpact: `${updatedSub.ownershipPercent}% Quad Stake`,
      type: 'neutral',
      details: `Quad Engineers Board refreshed governance metrics; Board Lead: ${updatedSub.boardLead}.`
    };
    setEvents((prev) => [evt, ...prev]);
  };

  // Handle Delete Subsidiary
  const handleDeleteSubsidiary = (id: string) => {
    setSubsidiaries((prev) => prev.filter((s) => s.id !== id));
  };

  // Handle Add Event
  const handleAddEvent = (newEvent: FinancialEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  // Export report handler
  const handleExportReport = () => {
    const totalVal = subsidiaries.reduce((acc, s) => acc + s.valuation, 0);
    const quadVal = subsidiaries.reduce((acc, s) => acc + (s.valuation * s.ownershipPercent) / 100, 0);
    const totalRev = subsidiaries.reduce((acc, s) => acc + s.annualRevenue, 0);

    const reportContent = [
      `QUAD ENGINEERS HOLDING GROUP - CONSOLIDATED EXECUTIVE BRIEFING`,
      `Generated: ${new Date().toISOString()}`,
      `Total Portfolio Valuation: $${(totalVal / 1000).toFixed(2)}B`,
      `Quad Net Asset Value: $${(quadVal / 1000).toFixed(2)}B`,
      `Consolidated Revenue: $${(totalRev / 1000).toFixed(2)}B`,
      `Portfolio Entities: ${subsidiaries.length}`,
      ``,
      `SUBSIDIARY BREAKDOWN:`,
      ...subsidiaries.map(
        (s) =>
          `- ${s.name} (${s.code}): ${s.sector} | Stake: ${s.ownershipPercent}% | Valuation: $${s.valuation}M | Revenue: $${s.annualRevenue}M | EBITDA: ${s.ebitdaMargin}% | Lead: ${s.boardLead}`
      )
    ].join('\n');

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Quad_Engineers_Portfolio_Briefing_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered subsidiaries
  const filteredSubsidiaries = subsidiaries.filter((sub) => {
    const matchesSector = selectedSector === 'All' || sub.sector === selectedSector;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      sub.name.toLowerCase().includes(query) ||
      sub.code.toLowerCase().includes(query) ||
      sub.ceo.toLowerCase().includes(query) ||
      sub.sector.toLowerCase().includes(query) ||
      sub.keyDivisions.some((d) => d.toLowerCase().includes(query));
    return matchesSector && matchesQuery;
  });

  const ALL_SECTORS: ('All' | Sector)[] = [
    'All',
    'Aerospace & Defense',
    'Clean Energy & Grid',
    'Industrial Robotics',
    'High-Speed Rail & Transit',
    'Semiconductors & Cryogenics',
    'Advanced Materials',
    'Autonomous Marine'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => {
          setSubsidiaryToEdit(null);
          setIsAddSubModalOpen(true);
        }}
        onExportReport={handleExportReport}
      />

      {/* Real-Time Live Ticker */}
      <LiveTicker
        subsidiaries={subsidiaries}
        onSelectSubsidiary={(sub) => setSelectedSubsidiary(sub)}
        isStreaming={isStreaming}
        onToggleStreaming={() => setIsStreaming(!isStreaming)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIEW 1: GROUP DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Header intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  Executive Holding Overview
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Quad Engineers Portfolio Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
                  Centralized control, capital allocation, and live operational telemetry across all 7 corporate subsidiaries.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('founders')}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Meet the 4 Founders</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Consolidated KPI Grid */}
            <StatSummary subsidiaries={subsidiaries} />

            {/* Split Section: Quick Subsidiary Grid & Live Feed Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Priority Subsidiaries */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Key Portfolio Entities</span>
                    <span className="text-xs font-mono text-slate-400 font-normal">
                      ({subsidiaries.length} total)
                    </span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('subsidiaries')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Ledger & Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subsidiaries.slice(0, 4).map((sub) => (
                    <SubsidiaryCard
                      key={sub.id}
                      subsidiary={sub}
                      onSelect={(s) => setSelectedSubsidiary(s)}
                      onEdit={(s) => {
                        setSubsidiaryToEdit(s);
                        setIsAddSubModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right Col: Live Dynamic Feed Widget */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Live Performance Feed</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  </h3>
                  <button
                    onClick={() => setActiveTab('financial-feed')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                  >
                    Full Stream
                  </button>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 divide-y divide-slate-800/80 shadow-lg space-y-3">
                  {events.slice(0, 4).map((evt) => (
                    <div key={evt.id} className="pt-3 first:pt-0">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span className="font-bold text-cyan-300">{evt.code}</span>
                        <span>{evt.timestamp}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 line-clamp-2">
                        {evt.headline}
                      </div>
                      <div className="flex items-center justify-between mt-2 text-[11px] font-mono">
                        <span className="text-slate-500">{evt.category}</span>
                        <span
                          className={`font-bold tabular-nums ${
                            evt.type === 'positive'
                              ? 'text-emerald-400'
                              : evt.type === 'neutral'
                              ? 'text-cyan-300'
                              : 'text-amber-400'
                          }`}
                        >
                          {evt.financialImpact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Simulation Trigger */}
                <button
                  onClick={triggerSimulationEvent}
                  className="w-full py-2.5 px-4 text-xs font-mono font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Simulate Market Disclosure Event</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SUBSIDIARIES MANAGEMENT */}
        {activeTab === 'subsidiaries' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  Portfolio Operations
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Subsidiaries Directory & Financial Ledger
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
                  Track governance, ownership percentage, revenue trajectories, and capital allocation across all portfolio companies.
                </p>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs self-start md:self-end">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    viewMode === 'cards' ? 'bg-slate-800 text-cyan-400 shadow-sm font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    viewMode === 'table' ? 'bg-slate-800 text-cyan-400 shadow-sm font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Ledger View</span>
                </button>
                <button
                  onClick={() => setViewMode('matrix')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    viewMode === 'matrix' ? 'bg-slate-800 text-cyan-400 shadow-sm font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Performance Matrix</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by company name, ticker, CEO, or technology..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              {/* Sector Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-xs font-medium">
                {ALL_SECTORS.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      selectedSector === sec
                        ? 'bg-slate-800 text-cyan-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Based on View Mode */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubsidiaries.length === 0 ? (
                  <div className="col-span-full bg-slate-900/40 border border-slate-800 rounded-xl p-12 text-center text-slate-400 text-xs">
                    No subsidiaries match your search criteria.
                  </div>
                ) : (
                  filteredSubsidiaries.map((sub) => (
                    <SubsidiaryCard
                      key={sub.id}
                      subsidiary={sub}
                      onSelect={(s) => setSelectedSubsidiary(s)}
                      onEdit={(s) => {
                        setSubsidiaryToEdit(s);
                        setIsAddSubModalOpen(true);
                      }}
                    />
                  ))
                )}
              </div>
            )}

            {viewMode === 'table' && (
              <SubsidiaryTable
                subsidiaries={filteredSubsidiaries}
                onSelect={(s) => setSelectedSubsidiary(s)}
                onEdit={(s) => {
                  setSubsidiaryToEdit(s);
                  setIsAddSubModalOpen(true);
                }}
              />
            )}

            {viewMode === 'matrix' && (
              <PerformanceMatrix
                subsidiaries={filteredSubsidiaries}
                onSelect={(s) => setSelectedSubsidiary(s)}
              />
            )}
          </div>
        )}

        {/* VIEW 3: DYNAMIC FINANCIAL FEED */}
        {activeTab === 'financial-feed' && (
          <DynamicFinancialFeed
            events={events}
            subsidiaries={subsidiaries}
            isStreaming={isStreaming}
            onToggleStreaming={() => setIsStreaming(!isStreaming)}
            streamSpeed={streamSpeed}
            onSetStreamSpeed={setStreamSpeed}
            onTriggerEvent={triggerSimulationEvent}
            onOpenAddEventModal={() => setIsAddEventModalOpen(true)}
            onSelectSubsidiary={(sub) => setSelectedSubsidiary(sub)}
          />
        )}

        {/* VIEW 4: ABOUT THE FOUR FOUNDERS */}
        {activeTab === 'founders' && (
          <AboutFounders
            founders={founders}
            onSelectFounder={(f) => setSelectedFounder(f)}
          />
        )}

        {/* VIEW 5: STRESS TESTING & SCENARIO SIMULATOR */}
        {activeTab === 'scenario' && (
          <ScenarioSimulator subsidiaries={subsidiaries} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">QUAD ENGINEERS HOLDING AG</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2014</span>
            <span aria-hidden="true">·</span>
            <span>Registered Swiss Industrial Holding</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Zurich</span>
            <span aria-hidden="true">·</span>
            <span>Boston</span>
            <span aria-hidden="true">·</span>
            <span>Stockholm</span>
            <span aria-hidden="true">·</span>
            <span>Singapore</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SubsidiaryModal
        subsidiary={selectedSubsidiary}
        onClose={() => setSelectedSubsidiary(null)}
        onEdit={(sub) => {
          setSelectedSubsidiary(null);
          setSubsidiaryToEdit(sub);
          setIsAddSubModalOpen(true);
        }}
        onDelete={handleDeleteSubsidiary}
      />

      <FounderModal
        founder={selectedFounder}
        onClose={() => setSelectedFounder(null)}
        subsidiaries={subsidiaries}
        onSelectSubsidiary={(sub) => {
          setSelectedFounder(null);
          setSelectedSubsidiary(sub);
        }}
      />

      <AddSubsidiaryModal
        isOpen={isAddSubModalOpen}
        onClose={() => {
          setIsAddSubModalOpen(false);
          setSubsidiaryToEdit(null);
        }}
        onSave={handleSaveSubsidiary}
        subsidiaryToEdit={subsidiaryToEdit}
        founders={founders}
      />

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAddEvent={handleAddEvent}
        subsidiaries={subsidiaries}
      />
    </div>
  );
}
