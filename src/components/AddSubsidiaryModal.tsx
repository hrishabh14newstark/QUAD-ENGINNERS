import React, { useState, useEffect } from 'react';
import { Subsidiary, Sector, SubsidiaryStatus, GovernanceHealth, Founder } from '../types';
import { X, Check, Save } from 'lucide-react';

interface AddSubsidiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subsidiary: Subsidiary) => void;
  subsidiaryToEdit?: Subsidiary | null;
  founders: Founder[];
}

const SECTORS: Sector[] = [
  'Aerospace & Defense',
  'Clean Energy & Grid',
  'Industrial Robotics',
  'High-Speed Rail & Transit',
  'Semiconductors & Cryogenics',
  'Advanced Materials',
  'Autonomous Marine'
];

export const AddSubsidiaryModal: React.FC<AddSubsidiaryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  subsidiaryToEdit,
  founders
}) => {
  const [formData, setFormData] = useState<Partial<Subsidiary>>({
    name: '',
    code: '',
    sector: 'Aerospace & Defense',
    ownershipPercent: 80,
    valuation: 2500,
    annualRevenue: 500,
    ebitdaMargin: 22,
    growthRate: 25,
    headcount: 1200,
    ceo: '',
    hq: '',
    status: 'Scale',
    governanceHealth: 'Strong',
    description: '',
    boardLead: founders[0]?.name || 'Dr. Elena Rostova',
    keyDivisions: ['Advanced Tooling', 'Proprietary Automation']
  });

  useEffect(() => {
    if (subsidiaryToEdit) {
      setFormData(subsidiaryToEdit);
    } else {
      setFormData({
        name: '',
        code: '',
        sector: 'Aerospace & Defense',
        ownershipPercent: 80,
        valuation: 2500,
        annualRevenue: 500,
        ebitdaMargin: 22,
        growthRate: 25,
        headcount: 1200,
        ceo: '',
        hq: '',
        status: 'Scale',
        governanceHealth: 'Strong',
        description: '',
        boardLead: founders[0]?.name || 'Dr. Elena Rostova',
        keyDivisions: ['Advanced Tooling', 'Proprietary Automation']
      });
    }
  }, [subsidiaryToEdit, isOpen, founders]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = subsidiaryToEdit ? subsidiaryToEdit.id : `sub-${Date.now()}`;
    const code = (formData.code || formData.name?.substring(0, 3) || 'SUB').toUpperCase();

    const quarterlyRevenue = subsidiaryToEdit
      ? subsidiaryToEdit.quarterlyRevenue
      : [
          { quarter: 'Q1', revenue: Math.round((formData.annualRevenue || 500) * 0.22), ebitda: Math.round((formData.annualRevenue || 500) * 0.22 * ((formData.ebitdaMargin || 20) / 100)) },
          { quarter: 'Q2', revenue: Math.round((formData.annualRevenue || 500) * 0.24), ebitda: Math.round((formData.annualRevenue || 500) * 0.24 * ((formData.ebitdaMargin || 20) / 100)) },
          { quarter: 'Q3', revenue: Math.round((formData.annualRevenue || 500) * 0.26), ebitda: Math.round((formData.annualRevenue || 500) * 0.26 * ((formData.ebitdaMargin || 20) / 100)) },
          { quarter: 'Q4', revenue: Math.round((formData.annualRevenue || 500) * 0.28), ebitda: Math.round((formData.annualRevenue || 500) * 0.28 * ((formData.ebitdaMargin || 20) / 100)) }
        ];

    const newSub: Subsidiary = {
      id,
      name: formData.name || 'New Enterprise Subsidiary',
      code,
      sector: formData.sector as Sector,
      ownershipPercent: Number(formData.ownershipPercent) || 80,
      valuation: Number(formData.valuation) || 2000,
      annualRevenue: Number(formData.annualRevenue) || 400,
      ebitdaMargin: Number(formData.ebitdaMargin) || 20,
      growthRate: Number(formData.growthRate) || 20,
      headcount: Number(formData.headcount) || 800,
      ceo: formData.ceo || 'Chief Executive Officer',
      hq: formData.hq || 'Zurich, Switzerland',
      foundedYear: subsidiaryToEdit?.foundedYear || 2018,
      acquiredYear: subsidiaryToEdit?.acquiredYear || 2024,
      status: (formData.status as SubsidiaryStatus) || 'Scale',
      governanceHealth: (formData.governanceHealth as GovernanceHealth) || 'Strong',
      description: formData.description || 'Advanced industrial engineering subsidiary operating under Quad Engineers governance.',
      keyDivisions: formData.keyDivisions || ['Core Manufacturing', 'Applied R&D'],
      boardLead: formData.boardLead || founders[0]?.name || 'Dr. Elena Rostova',
      capexAllocation: subsidiaryToEdit?.capexAllocation || Math.round(Number(formData.annualRevenue || 400) * 0.15),
      livePriceIndex: subsidiaryToEdit?.livePriceIndex || 120.0,
      dailyChange: subsidiaryToEdit?.dailyChange || 1.5,
      cashReserves: subsidiaryToEdit?.cashReserves || Math.round(Number(formData.valuation || 2000) * 0.05),
      debtToEquity: subsidiaryToEdit?.debtToEquity || 0.32,
      quarterlyRevenue
    };

    onSave(newSub);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-1">
          {subsidiaryToEdit ? 'Adjust Subsidiary Financials & Governance' : 'Add Subsidiary to Quad Portfolio'}
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-6">
          Holding group capital allocation and board oversight registry
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Row 1: Name and Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-medium mb-1">Subsidiary Entity Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Apex Quantum Photonics"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Ticker Code *</label>
              <input
                type="text"
                required
                maxLength={4}
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g. AQP"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white uppercase focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Row 2: Sector and Ownership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Sector *</label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value as Sector })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Quad Ownership Stake (%) *</label>
              <input
                type="number"
                min="10"
                max="100"
                required
                value={formData.ownershipPercent}
                onChange={(e) => setFormData({ ...formData, ownershipPercent: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Row 3: Financials Valuation & Annual Revenue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Enterprise Valuation ($M) *</label>
              <input
                type="number"
                min="50"
                required
                value={formData.valuation}
                onChange={(e) => setFormData({ ...formData, valuation: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Annual Revenue ($M) *</label>
              <input
                type="number"
                min="10"
                required
                value={formData.annualRevenue}
                onChange={(e) => setFormData({ ...formData, annualRevenue: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">EBITDA Margin (%) *</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="60"
                required
                value={formData.ebitdaMargin}
                onChange={(e) => setFormData({ ...formData, ebitdaMargin: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Row 4: Growth, Headcount & Board Lead */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">YoY Growth Rate (%) *</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.growthRate}
                onChange={(e) => setFormData({ ...formData, growthRate: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Workforce (Headcount) *</label>
              <input
                type="number"
                min="10"
                required
                value={formData.headcount}
                onChange={(e) => setFormData({ ...formData, headcount: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Quad Founder Board Lead *</label>
              <select
                value={formData.boardLead}
                onChange={(e) => setFormData({ ...formData, boardLead: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                {founders.map((f) => (
                  <option key={f.id} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 5: CEO & Headquarters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Operating CEO *</label>
              <input
                type="text"
                required
                value={formData.ceo}
                onChange={(e) => setFormData({ ...formData, ceo: e.target.value })}
                placeholder="e.g. Marcella Rossi"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Headquarters Location *</label>
              <input
                type="text"
                required
                value={formData.hq}
                onChange={(e) => setFormData({ ...formData, hq: e.target.value })}
                placeholder="e.g. Zurich, Switzerland"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

          {/* Row 6: Description */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Executive Summary & Technological Focus</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of engineering focus, proprietary tooling, and core competitive moat..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
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
              <Save className="w-4 h-4" />
              <span>{subsidiaryToEdit ? 'Save Changes' : 'Confirm & Add Entity'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
