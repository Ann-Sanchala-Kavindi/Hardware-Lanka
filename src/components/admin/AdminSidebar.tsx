'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FileSpreadsheet,
  Settings,
  ExternalLink,
  Wrench,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: 'Overview',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Products & Stock',
      href: '/admin/products',
      icon: Package,
    },
    {
      name: 'Quote Inquiries',
      href: '/admin/inquiries',
      icon: FileSpreadsheet,
    },
    {
      name: 'Store Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('apex_admin_auth');
      window.location.href = '/admin/login';
    }
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Brand */}
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-slate-950 font-black">
            <Wrench className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="text-base font-extrabold text-white tracking-tight">
              APEX<span className="text-brand-400">ADMIN</span>
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-400">
              Hardware Portal
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all',
                  isActive
                    ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Links */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-brand-400" />
            <span>View Live Store</span>
          </span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
            Open ↗
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
