'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Hammer,
  Wrench,
  Droplet,
  Zap,
  Building2,
  Paintbrush,
  ShieldCheck,
  LayoutGrid,
} from 'lucide-react';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ElementType> = {
  Hammer,
  Wrench,
  Droplet,
  Zap,
  Building2,
  Paintbrush,
  ShieldCheck,
};

export function CategoryPills({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max">
        {/* All Products Pill */}
        <Link
          href="/products"
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm',
            currentCategory === 'all'
              ? 'bg-brand-500 text-slate-950 border-brand-400 font-extrabold shadow-brand-500/20'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
          )}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>All Hardware</span>
        </Link>

        {/* Dynamic Category Pills */}
        {categories.map((cat) => {
          const IconComponent = (cat.icon && ICON_MAP[cat.icon]) ? ICON_MAP[cat.icon] : Hammer;
          const isActive = currentCategory === cat.slug;

          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm',
                isActive
                  ? 'bg-brand-500 text-slate-950 border-brand-400 font-extrabold shadow-brand-500/20'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
              )}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
