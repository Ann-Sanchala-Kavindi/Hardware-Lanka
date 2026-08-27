'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  AlertTriangle,
  FileSpreadsheet,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StoreService } from '@/lib/supabase/store-service';
import { Product, Inquiry, Category } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { StockBadge } from '@/components/ui/Badge';
import { ProductFormModal } from '@/components/admin/ProductFormModal';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [prodRes, inqRes, catRes] = await Promise.all([
        StoreService.getProducts(),
        StoreService.getInquiries(),
        StoreService.getCategories(),
      ]);
      setProducts(prodRes);
      setInquiries(inqRes);
      setCategories(catRes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProduct = async (productData: Partial<Product>) => {
    await StoreService.saveProduct(productData);
    await fetchData();
  };

  const lowStockCount = products.filter(
    (p) => p.stock_status === 'low_stock' || p.stock_status === 'out_of_stock' || p.stock_quantity <= 5
  ).length;

  const pendingQuotes = inquiries.filter((i) => i.status === 'pending').length;

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader
        title="Hardware Store Overview"
        description="Monitor product inventory, respond to contractor quotes, and manage shop settings."
      />

      <div className="px-6 space-y-6">
        {/* Quick Action & Add Product */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div>
            <h2 className="text-base font-black text-white">Store Inventory Control</h2>
            <p className="text-xs text-slate-400">
              Manage your hardware catalog, update selling prices, or add new tools.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
              <Package className="w-4 h-4 text-brand-400" />
            </div>
            <div className="text-2xl font-black text-white">{products.length}</div>
            <p className="text-[11px] text-slate-400">Across {categories.length} hardware categories</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Low / Out of Stock</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">{lowStockCount}</div>
            <p className="text-[11px] text-slate-400">Items needing re-stock</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Quotes</span>
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{pendingQuotes}</div>
            <p className="text-[11px] text-slate-400">Inquiries awaiting customer contact</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">{inquiries.length}</div>
            <p className="text-[11px] text-slate-400">Total quotes received to date</p>
          </div>
        </div>

        {/* Two-Column Grid: Recent Inquiries & Low Stock Warning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recent Inquiries */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-brand-400" />
                <h3 className="text-sm font-bold text-white">Recent Trade Quotes & Inquiries</h3>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-bold text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No inquiries received yet.</p>
            ) : (
              <div className="space-y-3">
                {inquiries.slice(0, 4).map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{inq.customer_name}</h4>
                      <p className="text-[11px] text-slate-400">{inq.customer_phone}</p>
                      <p className="text-[11px] text-brand-400 font-semibold mt-0.5">
                        {inq.items.length} item(s) • Total: {formatCurrency(inq.total_amount)}
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {inq.status.toUpperCase()}
                      </span>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Low Stock Warning List */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Stock Level Monitor</h3>
              </div>
              <Link
                href="/admin/products"
                className="text-xs font-bold text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>Manage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {products.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white truncate">{p.title}</p>
                    <p className="text-[11px] text-slate-400">SKU: {p.sku}</p>
                  </div>
                  <StockBadge status={p.stock_status} quantity={p.stock_quantity} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Add Product Modal */}
      <ProductFormModal
        isOpen={isAddModalOpen}
        categories={categories}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
