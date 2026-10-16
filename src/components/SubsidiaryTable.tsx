import React, { useState } from 'react';
import { Subsidiary } from '../types';
import { ArrowUpDown, Sliders, ChevronRight } from 'lucide-react';

interface SubsidiaryTableProps {
  subsidiaries: Subsidiary[];
  onSelect: (sub: Subsidiary) => void;
  onEdit: (sub: Subsidiary) => void;
}

type SortField = 'name' | 'valuation' | 'annualRevenue' | 'ebitdaMargin' | 'growthRate' | 'ownershipPercent' | 'headcount';

export const SubsidiaryTable: React.FC<SubsidiaryTableProps> = ({
  subsidiaries,
  onSelect,
  onEdit
}) => {
  const [sortField, setSortField] = useState<SortField>('valuation');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedSubsidiaries = [...subsidiaries].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') {
      return sortAsc
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string);
    }
    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-4 font-semibold cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1.5">
                  <span>Entity & Sector</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('ownershipPercent')}
                className="py-3 px-3 font-semibold cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Stake</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('valuation')}
                className="py-3 px-3 font-semibold cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Valuation</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('annualRevenue')}
                className="py-3 px-3 font-semibold cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Revenue / YoY</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('ebitdaMargin')}
                className="py-3 px-3 font-semibold cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>EBITDA %</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('headcount')}
                className="py-3 px-3 font-semibold cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Headcount</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3 font-semibold text-left">
                Board Lead
              </th>
              <th className="py-3 px-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {sortedSubsidiaries.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => onSelect(sub)}
              >
                <td className="py-3 px-4 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {sub.name}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 bg-slate-800/80 px-1 rounded">
                      {sub.code}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {sub.sector} · {sub.status}
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="text-white font-bold tabular-nums">{sub.ownershipPercent}%</span>
                  <div className="w-14 bg-slate-800 h-1.5 rounded-full ml-auto mt-1 overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full"
                      style={{ width: `${sub.ownershipPercent}%` }}
                    />
                  </div>
                </td>
                <td className="py-3 px-3 text-right tabular-nums">
                  <span className="text-white font-bold">${(sub.valuation / 1000).toFixed(2)}B</span>
                  <div className="text-[10px] text-slate-500">
                    Quad: ${((sub.valuation * sub.ownershipPercent) / 100000).toFixed(2)}B
                  </div>
                </td>
                <td className="py-3 px-3 text-right tabular-nums">
                  <span className="text-white font-bold">${sub.annualRevenue}M</span>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    +{sub.growthRate.toFixed(1)}% YoY
                  </div>
                </td>
                <td className="py-3 px-3 text-right tabular-nums">
                  <span className="text-cyan-400 font-bold">{sub.ebitdaMargin.toFixed(1)}%</span>
                  <div className="text-[10px] text-slate-500">
                    ${((sub.annualRevenue * sub.ebitdaMargin) / 100).toFixed(0)}M
                  </div>
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                  {sub.headcount.toLocaleString()}
                </td>
                <td className="py-3 px-3 font-sans text-xs text-amber-300/90 truncate max-w-[160px]">
                  {sub.boardLead}
                </td>
                <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(sub)}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                      title="Edit Financials"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelect(sub)}
                      className="p-1 text-cyan-400 hover:text-cyan-300 rounded hover:bg-slate-800 transition-colors"
                      title="View Full Dossier"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
