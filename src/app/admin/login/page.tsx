'use client';

import { ArrowRight, Lock, Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode is 'admin123'
    if (passcode === 'admin123' || passcode.trim() !== '') {
      localStorage.setItem('lanka_admin_auth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid passcode. Use "admin123" for demo access.');
    }
  };

  const handleDemoFill = () => {
    setPasscode('admin123');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-slate-950 flex items-center justify-center font-black mx-auto shadow-lg shadow-brand-500/20">
            <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Shop Owner Portal
          </h1>
          <p className="text-xs text-slate-400">
            Manage your hardware inventory, update prices, and respond to trade quotes.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: admin123)"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-400 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
            {error && <p className="text-xs text-rose-400 mt-1.5 font-semibold">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
          >
            <span>Log In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Helper */}
        <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
          <p className="text-[11px] text-slate-500">
            Quick Preview Credentials:
          </p>
          <button
            onClick={handleDemoFill}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-brand-300 text-xs font-mono rounded-lg transition-colors"
          >
            Click to Auto-Fill: admin123
          </button>
        </div>

      </div>
    </div>
  );
}
