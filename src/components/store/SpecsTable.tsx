import React from 'react';

export function SpecsTable({ specifications }: { specifications?: Record<string, string> }) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return (
      <p className="text-xs text-slate-400 italic">
        Standard manufacturer specifications apply. Contact us for specific technical data sheets.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="w-full text-left text-xs">
        <tbody className="divide-y divide-slate-800">
          {Object.entries(specifications).map(([key, value], idx) => (
            <tr
              key={key}
              className={idx % 2 === 0 ? 'bg-slate-800/20' : 'bg-transparent'}
            >
              <td className="px-4 py-2.5 font-semibold text-slate-300 w-1/3 border-r border-slate-800/60">
                {key}
              </td>
              <td className="px-4 py-2.5 text-slate-100 font-mono">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
