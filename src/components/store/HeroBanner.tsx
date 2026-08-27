import { StoreSettings } from '@/lib/types';
import {
    ArrowRight,
    Building,
    CheckCircle2,
    Hammer,
    PhoneCall,
    Zap
} from 'lucide-react';
import Link from 'next/link';

export function HeroBanner({ settings }: { settings?: StoreSettings }) {
  const cleanWhatsApp = (settings?.whatsapp_number || '15551234567').replace(/[^0-9]/g, '');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 py-12 md:py-16 border-b border-slate-800">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wide">
              <Hammer className="w-3.5 h-3.5" />
              <span>Heavy Duty Industrial & Contracting Hardware</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Build Stronger with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-orange-400">
                Premium Tools & Materials
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              From cordless brushless power drills to structural plumbing, wiring panels, and jobsite fasteners. Fast local delivery and instant trade quotes.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Genuine Brand Warranties</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Wholesale Contractor Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Jobsite Delivery Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Instant WhatsApp Orders</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Lanka%20Hardware!%20I%20need%20a%20price%20quote%20for%20construction%20materials.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm rounded-xl transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Request Trade Quote</span>
              </a>
            </div>
          </div>

          {/* Right Column: Featured Promo Cards & Quick Highlights */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Promo Card 1 */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-5 shadow-xl group">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
                    Featured Deal
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                    Power Tools & Drills
                  </h3>
                  <p className="text-xs text-slate-400">Brushless motors, angle grinders & cordless kits</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-bold text-brand-400">Up to 20% Off Kits</span>
                <Link
                  href="/products?category=power-tools"
                  className="text-xs font-bold text-white flex items-center gap-1 hover:text-brand-400"
                >
                  <span>Shop Deals</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Promo Card 2 */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-5 shadow-xl group">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Contractors
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Bulk Screws & Plumbing
                  </h3>
                  <p className="text-xs text-slate-400">Schedule 40 PVC, brass valves & structural fasteners</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">Trade Rates Available</span>
                <Link
                  href="/products?category=plumbing"
                  className="text-xs font-bold text-white flex items-center gap-1 hover:text-emerald-400"
                >
                  <span>View Supplies</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
