'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StoreService } from '@/lib/supabase/store-service';
import { Product, Category } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { StockBadge } from '@/components/ui/Badge';
import { ProductFormModal } from '@/components/admin/ProductFormModal';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        StoreService.getProducts(),
        StoreService.getCategories(),
      ]);
      setProducts(prodRes);
      setCategories(catRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this hardware product?')) {
      await StoreService.deleteProduct(id);
      await fetchData();
    }
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    await StoreService.saveProduct(productData);
    await fetchData();
  };

  const handleToggleStockStatus = async (product: Product) => {
    const nextStatus =
      product.stock_status === 'in_stock'
        ? 'out_of_stock'
        : 'in_stock';
    await StoreService.saveProduct({
      id: product.id,
      stock_status: nextStatus,
    });
    await fetchData();
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category_slug === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader
        title="Hardware Product Inventory"
        description="Add, edit, or adjust stock levels and pricing for all tools and building materials."
      />

      <div className="px-6 space-y-4">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex flex-1 items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, SKU, brand..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Product</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">SKU / Brand</th>
                  <th className="px-4 py-3.5">Price & Unit</th>
                  <th className="px-4 py-3.5">Stock Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No products matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Product Thumbnail & Title */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                            <Image
                              src={p.image_url}
                              alt={p.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-white block max-w-xs truncate">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-slate-500 line-clamp-1">
                              {p.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 capitalize font-medium text-slate-400">
                        {p.category_slug.replace('-', ' ')}
                      </td>

                      {/* SKU & Brand */}
                      <td className="px-4 py-3 font-mono text-[11px]">
                        <span className="text-white">{p.sku}</span>
                        {p.brand && <span className="block text-slate-400 font-sans">{p.brand}</span>}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3">
                        <span className="font-bold text-white">
                          {formatCurrency(p.discount_price || p.price)}
                        </span>
                        {p.discount_price && (
                          <span className="block text-[10px] text-slate-500 line-through">
                            {formatCurrency(p.price)}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">/ {p.unit}</span>
                      </td>

                      {/* Stock Status with 1-Click Toggle */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleStockStatus(p)}
                          title="Click to toggle availability"
                          className="text-left group"
                        >
                          <StockBadge status={p.stock_status} quantity={p.stock_quantity} />
                          <span className="text-[10px] text-slate-500 group-hover:text-brand-400 block mt-0.5 underline">
                            Click to toggle
                          </span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-400 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        product={editingProduct}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
