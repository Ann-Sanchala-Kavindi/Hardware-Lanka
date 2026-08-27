import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { StoreSettings } from '@/lib/types';

export function Footer({ settings }: { settings?: StoreSettings }) {
  const cleanWhatsApp = (settings?.whatsapp_number || '15551234567').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Value Proposition Banners */}
      <div className="border-b border-slate-800/80 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Site & Jobsite Delivery</h4>
                <p className="text-xs text-slate-400 mt-0.5">Prompt contractor delivery on bulk hardware orders</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">100% Genuine Tools</h4>
                <p className="text-xs text-slate-400 mt-0.5">Authorised distributor for top global tool brands</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Instant WhatsApp Quotes</h4>
                <p className="text-xs text-slate-400 mt-0.5">Send your material list for immediate pricing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-slate-950 font-black">
                <Wrench className="w-4 h-4 text-slate-950" />
              </div>
              <div className="text-lg font-extrabold text-white tracking-tight">
                APEX<span className="text-brand-400">HARDWARE</span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Supplying professional builders, contractors, electricians, plumbers, and DIY homeowners with heavy-duty tools, equipment, and structural materials.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Hardware Categories
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?category=power-tools" className="hover:text-brand-400 transition-colors">
                  Power Drills & Saws
                </Link>
              </li>
              <li>
                <Link href="/products?category=hand-tools" className="hover:text-brand-400 transition-colors">
                  Mechanics & Hand Tools
                </Link>
              </li>
              <li>
                <Link href="/products?category=plumbing" className="hover:text-brand-400 transition-colors">
                  Pipes, Valves & Fittings
                </Link>
              </li>
              <li>
                <Link href="/products?category=electrical" className="hover:text-brand-400 transition-colors">
                  Breakers & Distribution Panels
                </Link>
              </li>
              <li>
                <Link href="/products?category=building-materials" className="hover:text-brand-400 transition-colors">
                  Screws, Fasteners & Concrete
                </Link>
              </li>
              <li>
                <Link href="/products?category=safety-fasteners" className="hover:text-brand-400 transition-colors">
                  OSHA Safety Gear & Helmets
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Store Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Customer Center
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="hover:text-brand-400 transition-colors">
                  Browse All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-brand-400 transition-colors">
                  Request Trade Quote / View Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">
                  Store Hours & Driving Directions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-400 text-slate-500 transition-colors">
                  Shop Owner Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Store Information
            </h3>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>{settings?.address || '128 Industrial Parkway, Builder District'}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              <a href={`tel:${settings?.phone || '+15551234567'}`} className="hover:text-white">
                {settings?.phone || '+1 (555) 123-4567'}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{settings?.email || 'sales@apexhardware.com'}</span>
            </div>
            <div className="flex items-start gap-2.5 pt-1">
              <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>{settings?.opening_hours || 'Mon - Sat: 7:30 AM - 6:30 PM | Sun: 8:00 AM - 2:00 PM'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings?.store_name || 'Apex Tools & Hardware Supply'}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-[11px] text-slate-400">
              ⚡ Powered by Next.js & Supabase Free Tier
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
