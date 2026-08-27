'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Wrench,
  Search,
  ShoppingCart,
  Phone,
  MessageSquare,
  ShieldCheck,
  Menu,
  X,
  Lock,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export function Navbar({ announcement, whatsappNumber, phone }: {
  announcement?: string;
  whatsappNumber?: string;
  phone?: string;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { itemCount, openCart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/products');
    }
  };

  const cleanWhatsApp = (whatsappNumber || '15551234567').replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 text-white shadow-lg">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-brand-400 font-medium truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            {announcement || '⚡ Contractor Discounts on Bulk Orders! WhatsApp us for instant trade quotes.'}
          </div>
          <div className="flex items-center gap-4 text-slate-300 ml-auto">
            <a
              href={`tel:${phone || '+15551234567'}`}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>{phone || '+1 (555) 123-4567'}</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link
              href="/admin"
              className="hover:text-brand-400 flex items-center gap-1 text-slate-400 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                APEX<span className="text-brand-400">HARDWARE</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Tools • Building • Supplies
              </div>
            </div>
          </Link>

          {/* Search Form (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl relative items-center mx-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search power tools, PVC pipes, bolts, cement, SKUs..."
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-10 pr-24 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1 bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold text-xs rounded-md transition-colors"
            >
              Search
            </button>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Order Button */}
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=Hello%20Apex%20Hardware!%20I%20have%20an%20inquiry%20regarding%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all hover:shadow-emerald-600/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 text-brand-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold">Cart / Quote</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-500 text-slate-950 text-xs font-black rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="md:hidden mt-3 relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, materials, SKUs..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-20 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1 bg-brand-500 text-slate-950 font-semibold text-xs rounded-md"
          >
            Go
          </button>
        </form>

        {/* Categories / Sub-Nav */}
        <nav className="hidden md:flex items-center justify-between border-t border-slate-800/80 mt-3 pt-2 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-6">
            <Link href="/products" className="hover:text-brand-400 transition-colors">
              All Products
            </Link>
            <Link href="/products?category=power-tools" className="hover:text-brand-400 transition-colors">
              Power Tools
            </Link>
            <Link href="/products?category=hand-tools" className="hover:text-brand-400 transition-colors">
              Hand Tools
            </Link>
            <Link href="/products?category=plumbing" className="hover:text-brand-400 transition-colors">
              Plumbing
            </Link>
            <Link href="/products?category=electrical" className="hover:text-brand-400 transition-colors">
              Electrical
            </Link>
            <Link href="/products?category=building-materials" className="hover:text-brand-400 transition-colors">
              Building Supplies
            </Link>
            <Link href="/products?category=safety-fasteners" className="hover:text-brand-400 transition-colors">
              Fasteners & Safety
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
              Store Location & Hours
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-4 space-y-3">
          <Link
            href="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-semibold text-white hover:text-brand-400 py-1"
          >
            📦 All Products & Catalog
          </Link>
          <Link
            href="/products?category=power-tools"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-brand-400 py-1"
          >
            ⚡ Power Tools
          </Link>
          <Link
            href="/products?category=hand-tools"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-brand-400 py-1"
          >
            🔧 Hand Tools
          </Link>
          <Link
            href="/products?category=plumbing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-brand-400 py-1"
          >
            💧 Plumbing & Valves
          </Link>
          <Link
            href="/products?category=electrical"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-brand-400 py-1"
          >
            💡 Electrical & Panels
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-slate-300 hover:text-brand-400 py-1"
          >
            📍 Store Location & Contact
          </Link>
          <Link
            href="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm text-brand-400 hover:text-brand-300 font-semibold pt-2 border-t border-slate-800"
          >
            🔒 Shop Owner Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
