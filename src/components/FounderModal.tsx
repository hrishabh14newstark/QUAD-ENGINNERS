import React from 'react';
import { Founder, Subsidiary } from '../types';
import { X, Award, BookOpen, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface FounderModalProps {
  founder: Founder | null;
  onClose: () => void;
  subsidiaries: Subsidiary[];
  onSelectSubsidiary: (sub: Subsidiary) => void;
}

export const FounderModal: React.FC<FounderModalProps> = ({
  founder,
  onClose,
  subsidiaries,
  onSelectSubsidiary
}) => {
  if (!founder) return null;

  const chairedSubs = subsidiaries.filter((s) =>
    founder.boardSeats.some((seat) => seat.includes(s.name.split(' ')[0]))
  );

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

        {/* Header Lockup */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-slate-800">
          <div
            className={`w-18 h-18 rounded-2xl flex items-center justify-center font-mono font-bold text-2xl text-white shadow-xl bg-gradient-to-br ${founder.gradient} border border-slate-700 shrink-0`}
          >
            <span>{founder.initials}</span>
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              Quad Engineers Founding Partner · {founder.tenure}
            </div>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">{founder.name}</h3>
            <div className="text-sm text-slate-300 font-medium">{founder.role}</div>
            <div className="text-xs text-slate-400 font-mono mt-1">{founder.academic}</div>
          </div>
        </div>

        {/* Body Content */}
        <div className="mt-6 space-y-6 text-xs sm:text-sm font-sans">
          {/* Executive Biography */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Executive Biography & Industrial Origins
            </h4>
            <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
              {founder.dossier.fullBio}
            </p>
          </div>

          {/* Core Governance Philosophy */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Governing Thesis</span>
            </h4>
            <p className="text-slate-300 italic text-xs leading-relaxed">
              "{founder.dossier.governancePhilosophy}"
            </p>
          </div>

          {/* Patents & Key Transactions */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Patents & Strategic M&A Leadership</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              {founder.dossier.patentsAndDeals}
            </p>
          </div>

          {/* 2026 Priorities */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Strategic Mandates (2026)</span>
            </h4>
            <ul className="space-y-2">
              {founder.dossier.keyInitiatives2026.map((init, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{init}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chaired Subsidiaries */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Subsidiary Board Oversight
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {chairedSubs.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => {
                    onClose();
                    onSelectSubsidiary(sub);
                  }}
                  className="bg-slate-950/60 border border-slate-800 p-3 rounded-lg hover:border-cyan-500/60 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white text-xs">{sub.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">
                      ${(sub.valuation / 1000).toFixed(2)}B Val · {sub.ownershipPercent}% Quad
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
