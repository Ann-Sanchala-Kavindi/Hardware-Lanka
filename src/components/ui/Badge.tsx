import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'brand' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    brand: 'bg-brand-500 text-slate-950 font-semibold shadow-sm',
    outline: 'border border-slate-300 text-slate-700 bg-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StockBadge({ status, quantity }: { status: string; quantity?: number }) {
  if (status === 'in_stock') {
    return (
      <Badge variant="success">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        In Stock {quantity !== undefined && quantity <= 10 ? `(${quantity} left)` : ''}
      </Badge>
    );
  }
  if (status === 'low_stock') {
    return (
      <Badge variant="warning">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        Low Stock ({quantity || 0})
      </Badge>
    );
  }
  return (
    <Badge variant="danger">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
      Out of Stock
    </Badge>
  );
}
