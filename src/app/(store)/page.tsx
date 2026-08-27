import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  Truck,
  MessageSquare,
  BadgePercent,
  CheckCircle2,
} from 'lucide-react';
import { HeroBanner } from '@/components/store/HeroBanner';
import { CategoryPills } from '@/components/store/CategoryPills';
import { ProductCard } from '@/components/store/ProductCard';
import { StoreService } from '@/lib/supabase/store-service';

export default async function HomePage() {
  const [categories, products, settings] = await Promise.all([
    StoreService.getCategories(),
    StoreService.getProducts(),
    StoreService.getStoreSettings(),
  ]);

  const featuredProducts = products.filter((p) => p.is_featured);
  const popularProducts = products.filter((p) => p.is_popular);
  const cleanWhatsApp = (settings.whatsapp_number || '15551234567').replace(/[^0-9]/g, '');

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Banner */}
      <HeroBanner settings={settings} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2. Category Navigation */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span>Hardware Categories</span>
            </h2>
            <Link
              href="/products"
              className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <CategoryPills categories={categories} />
        </section>

        {/* 3. Featured Deals / Power Tools */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Top Recommendations</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                Featured Tools & Heavy Equipment
              </h2>
            </div>
            <Link
              href="/products?category=power-tools"
              className="hidden sm:flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-brand-400"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 4. Contractor Discount Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-brand-600 to-orange-600 p-8 sm:p-10 text-slate-950 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 skew-x-12 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 text-brand-400 text-xs font-black rounded-full uppercase tracking-wider">
              <BadgePercent className="w-4 h-4 text-brand-400" />
              <span>Contractor Trade Program</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-slate-950">
              Building or Renovating? Get Direct Wholesale Contractor Pricing
            </h3>

            <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
              We supply building sites, electrical contractors, and plumbing specialists with bulk materials, certified breakers, PVC conduit, and fasteners with same-day site delivery.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Apex%20Hardware!%20I%20am%20a%20contractor%20and%20need%20wholesale%20rates.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Trade Desk</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-white/30 hover:bg-white/40 text-slate-950 font-bold text-xs rounded-xl backdrop-blur-sm transition-colors"
              >
                <span>Visit Our Warehouse</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Most Popular & Fasteners */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>High Demand Items</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                Contractor Supplies & Daily Hardware
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-slate-300 hover:text-brand-400 flex items-center gap-1"
            >
              <span>See Full Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 6. Why Buy From Us Grid */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xl font-black text-white">Why Hardware Professionals Choose Us</h3>
            <p className="text-xs text-slate-400">
              Trusted by 1,200+ local builders, plumbers, carpenters, and DIY enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">100% Genuine Brands</h4>
              <p className="text-xs text-slate-400">Direct authorized warranty on DeWalt, Bosch, Stanley & more.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Fast Jobsite Delivery</h4>
              <p className="text-xs text-slate-400">Heavy pipes, structural materials & screws brought straight to your site.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Instant WhatsApp Quotes</h4>
              <p className="text-xs text-slate-400">Send your material list on WhatsApp for instant pricing & stock check.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Trade Credit & Invoices</h4>
              <p className="text-xs text-slate-400">Official tax invoices, bulk billing, and flexible trade accounts.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
