import React from 'react';
import { Layers, Plus, FileSpreadsheet } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'subsidiaries' | 'financial-feed' | 'founders' | 'scenario';
  setActiveTab: (tab: 'dashboard' | 'subsidiaries' | 'financial-feed' | 'founders' | 'scenario') => void;
  onOpenAddModal: () => void;
  onExportReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  onExportReport
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-950/50">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white uppercase whitespace-nowrap">
                Quad Engineers
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 font-mono uppercase">
                Holding Group · Est. 2014
              </span>
            </div>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
                activeTab === 'dashboard'
                  ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-5'
                  : 'text-slate-400 py-5'
              }`}
            >
              Group Dashboard
            </button>
            <button
              onClick={() => setActiveTab('subsidiaries')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
                activeTab === 'subsidiaries'
                  ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-5'
                  : 'text-slate-400 py-5'
              }`}
            >
              Subsidiaries (7)
            </button>
            <button
              onClick={() => setActiveTab('financial-feed')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
                activeTab === 'financial-feed'
                  ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-5'
                  : 'text-slate-400 py-5'
              }`}
            >
              Live Financial Feed
            </button>
            <button
              onClick={() => setActiveTab('founders')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
                activeTab === 'founders'
                  ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-5'
                  : 'text-slate-400 py-5'
              }`}
            >
              About the 4 Founders
            </button>
            <button
              onClick={() => setActiveTab('scenario')}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-white ${
                activeTab === 'scenario'
                  ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 py-5'
                  : 'text-slate-400 py-5'
              }`}
            >
              Stress Testing
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExportReport}
              title="Export Consolidated Portfolio Briefing"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Report</span>
            </button>
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors cursor-pointer shadow-sm shadow-cyan-950/50 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Subsidiary</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-between border-t border-slate-800/80 py-2.5 overflow-x-auto gap-4 text-xs font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap px-2 py-1 ${activeTab === 'dashboard' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('subsidiaries')}
            className={`whitespace-nowrap px-2 py-1 ${activeTab === 'subsidiaries' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Subsidiaries
          </button>
          <button
            onClick={() => setActiveTab('financial-feed')}
            className={`whitespace-nowrap px-2 py-1 ${activeTab === 'financial-feed' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Live Feed
          </button>
          <button
            onClick={() => setActiveTab('founders')}
            className={`whitespace-nowrap px-2 py-1 ${activeTab === 'founders' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Founders
          </button>
          <button
            onClick={() => setActiveTab('scenario')}
            className={`whitespace-nowrap px-2 py-1 ${activeTab === 'scenario' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Stress Test
          </button>
        </div>
      </div>
    </header>
  );
};
