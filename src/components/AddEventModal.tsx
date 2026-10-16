import React, { useState } from 'react';
import { Subsidiary, FinancialEvent, EventCategory } from '../types';
import { X, Send } from 'lucide-react';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: FinancialEvent) => void;
  subsidiaries: Subsidiary[];
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  subsidiaries
}) => {
  const [subsidiaryId, setSubsidiaryId] = useState(subsidiaries[0]?.id || '');
  const [category, setCategory] = useState<EventCategory>('Earnings');
  const [headline, setHeadline] = useState('');
  const [financialImpact, setFinancialImpact] = useState('+$25.0M Revenue');
  const [details, setDetails] = useState('');
  const [type, setType] = useState<'positive' | 'neutral' | 'caution'>('positive');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = subsidiaries.find((s) => s.id === subsidiaryId) || subsidiaries[0];

    const newEvent: FinancialEvent = {
      id: `evt-${Date.now()}`,
      timestamp: 'Just now',
      unixTime: Date.now(),
      subsidiaryId: sub.id,
      subsidiaryName: sub.name,
      code: sub.code,
      category,
      headline: headline || 'Quarterly operational performance milestone announced',
      financialImpact: financialImpact || '+$10M Impact',
      type,
      details: details || 'Board reviewed progress and confirmed capital allocation targets met.'
    };

    onAddEvent(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-white mb-1">
          Log Real-Time Financial Performance Event
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-5">
          Push financial telemetry to Quad Engineers holding feed
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {/* Subsidiary Selector */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Target Subsidiary *</label>
            <select
              value={subsidiaryId}
              onChange={(e) => setSubsidiaryId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
            >
              {subsidiaries.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Event Category & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Event Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Earnings">Earnings</option>
                <option value="Capex">Capex</option>
                <option value="Dividend">Dividend</option>
                <option value="M&A">M&A</option>
                <option value="Operational">Operational</option>
                <option value="Valuation">Valuation</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Impact Bias *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="positive">Positive / Accretive</option>
                <option value="neutral">Neutral / Capital Allocation</option>
                <option value="caution">Advisory / Cost Headwind</option>
              </select>
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Headline Disclosure *</label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Signs $85M long-term production contract with European rail operator"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Financial Impact */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Financial Impact Tag *</label>
            <input
              type="text"
              required
              value={financialImpact}
              onChange={(e) => setFinancialImpact(e.target.value)}
              placeholder="e.g. +$85.0M Backlog, +120 bps Margin"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Operational Context & Statement</label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Executive rationale, cash conversion timeline, or manufacturing impact..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-slate-950 bg-cyan-400 hover:bg-cyan-300 font-bold rounded-lg transition-colors cursor-pointer shadow-md shadow-cyan-950/50"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
