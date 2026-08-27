'use client';

import React from 'react';
import { ShieldCheck, User } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export function AdminHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="bg-slate-900/60 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-black text-white">{title}</h1>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-slate-300 font-medium">
            {isSupabaseConfigured ? 'Supabase Connected' : 'Local Preview Mode'}
          </span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-800 text-xs text-slate-300 font-bold">
          <div className="w-7 h-7 rounded-full bg-brand-500 text-slate-950 flex items-center justify-center font-black">
            <User className="w-4 h-4" />
          </div>
          <span>Shop Owner</span>
        </div>
      </div>
    </header>
  );
}
