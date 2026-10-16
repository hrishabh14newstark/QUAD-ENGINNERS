import React from 'react';
import { Founder } from '../types';
import { ShieldCheck, Award, BookOpen, ChevronRight, Compass, Cpu, DollarSign, Wrench } from 'lucide-react';

interface AboutFoundersProps {
  founders: Founder[];
  onSelectFounder: (founder: Founder) => void;
}

export const AboutFounders: React.FC<AboutFoundersProps> = ({
  founders,
  onSelectFounder
}) => {
  return (
    <div className="space-y-12">
      {/* Editorial Hero / Origin Story */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-3">
            Governance & Origins · Founded 2014
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance leading-tight">
            Engineered Foundations, Not Financial Engineering
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Quad Engineers was established by four polymath engineers who rejected the short-term, debt-leveraged model of traditional private equity conglomerates. Our conviction is simple: durable industrial value is built on the factory floor, in precision machine tolerances, advanced metallurgy, and resilient software architecture.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
            <div>
              <span className="text-white font-bold text-base tabular-nums">4</span>
              <span className="ml-1 text-slate-400">Founding Partners</span>
            </div>
            <div className="w-px h-4 bg-slate-800" />
            <div>
              <span className="text-white font-bold text-base tabular-nums">12</span>
              <span className="ml-1 text-slate-400">Years of Compounding</span>
            </div>
            <div className="w-px h-4 bg-slate-800" />
            <div>
              <span className="text-white font-bold text-base tabular-nums">340+</span>
              <span className="ml-1 text-slate-400">Patents Led by Founders</span>
            </div>
            <div className="w-px h-4 bg-slate-800" />
            <div>
              <span className="text-white font-bold text-base tabular-nums">100%</span>
              <span className="ml-1 text-slate-400">Partner Controlled</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Founders Grid */}
      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              The Four Founders of Quad Engineers
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Direct operating partners actively chairing and governing portfolio subsidiary boards
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Click any profile to inspect full executive dossier & patent registry
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((founder, idx) => (
            <div
              key={founder.id}
              onClick={() => onSelectFounder(founder)}
              className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Founder Header Lockup */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Monogram Executive Avatar */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-lg text-white shadow-md bg-gradient-to-br ${founder.gradient} border border-slate-700/80 shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <span>{founder.initials}</span>
                  </div>

                  {/* Title & Role */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-medium">
                        0{idx + 1}. {founder.role.split('&')[0]}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Quad Partner
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {founder.name}
                    </h4>
                    <div className="text-xs text-slate-400 font-medium truncate">
                      {founder.title}
                    </div>
                  </div>
                </div>

                {/* Academic & Prior Credentials */}
                <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/60 mb-4 text-xs font-mono space-y-1">
                  <div className="text-slate-300 truncate">
                    <span className="text-slate-500 mr-1.5">Education:</span>
                    {founder.academic}
                  </div>
                  <div className="text-slate-300 truncate">
                    <span className="text-slate-500 mr-1.5">Background:</span>
                    {founder.prior}
                  </div>
                </div>

                {/* Founder Quote */}
                <blockquote className="border-l-2 border-cyan-500/50 pl-3.5 my-4 text-xs text-slate-300 italic leading-relaxed">
                  "{founder.quote}"
                </blockquote>

                {/* Focus Areas */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono text-slate-500 mb-1.5 uppercase tracking-wider">
                    Core Specializations
                  </div>
                  <div className="text-xs text-slate-300">
                    {founder.focusAreas.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="text-slate-400 text-[11px] font-mono truncate max-w-[240px]">
                  Board Seats: <span className="text-slate-200">{founder.boardSeats.join(', ')}</span>
                </div>
                <div className="text-cyan-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Full Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 4 Quad Foundational Tenets */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">The Quad Charter</div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            Four Operating Tenets of Subsidiary Governance
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 mb-3">
              <Compass className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-white text-sm">01. Physics-First Underwriting</h5>
            <p className="text-slate-400 leading-relaxed font-sans">
              We never acquire a company whose core advantage is purely marketing or regulatory arbitrage. Every subsidiary owns proprietary physical IP grounded in thermodynamics, metallurgy, or high-tolerance computation.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/80 flex items-center justify-center text-amber-400 mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-white text-sm">02. Horizontal IP Portability</h5>
            <p className="text-slate-400 leading-relaxed font-sans">
              All proprietary micro-channel cooling, autonomous telemetry, and ceramic matrix composites developed by one subsidiary are cross-licensed freely across all sister entities without internal royalty friction.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mb-3">
              <DollarSign className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-white text-sm">03. Non-Dilutive Compounding</h5>
            <p className="text-slate-400 leading-relaxed font-sans">
              We preserve pristine balance sheets with group-wide debt-to-equity below 0.40x. Free cash flow is disciplined: 65% reinvested in automated manufacturing lines, 35% held in central liquidity for counter-cyclical acquisitions.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-violet-950 border border-violet-800/80 flex items-center justify-center text-violet-400 mb-3">
              <Wrench className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-white text-sm">04. Shop-Floor Governance</h5>
            <p className="text-slate-400 leading-relaxed font-sans">
              Quad founders do not supervise from Manhattan ivory towers. Each partner spends 25% of their active time in cleanrooms and testing test-stands alongside subsidiary engineering leads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
