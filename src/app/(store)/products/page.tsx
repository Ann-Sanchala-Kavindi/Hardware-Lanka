import React, { Suspense } from 'react';
import { LayoutGrid, Search, SlidersHorizontal } from 'lucide-react';
import { StoreService } from '@/lib/supabase/store-service';
import { ProductCard } from '@/components/store/ProductCard';
import { CategoryPills } from '@/components/store/CategoryPills';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
    inStockOnly?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search, sort, inStockOnly } = searchParams;

  const [categories, allProducts] = await Promise.all([
    StoreService.getCategories(),
    StoreService.getProducts(category, search),
  ]);

  let filtered = [...allProducts];

  if (inStockOnly === 'true') {
    filtered = filtered.filter((p) => p.stock_status === 'in_stock');
  }

  if (sort === 'price_asc') {
    filtered.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
  }

  const activeCategoryObj = categories.find((c) => c.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-400 uppercase tracking-wider">
            <LayoutGrid className="w-4 h-4" />
            <span>UNITED ARI LANKA Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {activeCategoryObj ? activeCategoryObj.name : 'All Tools & Hardware Supplies'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            {activeCategoryObj?.description ||
              'Browse professional power tools, hand tools, plumbing, electrical, and structural construction materials with instant WhatsApp ordering.'}
          </p>
        </div>
      </div>

      <CategoryPills categories={categories} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-400" />
                <span>Filter Supplies</span>
              </h3>
              {(category || search || inStockOnly) && (
                <Link
                  href="/products"
                  className="text-[11px] text-rose-400 hover:underline font-semibold"
                >
                  Clear Filters
                </Link>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Category
              </span>
              <div className="space-y-1 text-xs">
                <Link
                  href="/products"
                  className={`block px-3 py-1.5 rounded-lg transition-colors ${
                    !category || category === 'all'
                      ? 'bg-brand-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  All Categories
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}${search ? `&search=${search}` : ''}`}
                    className={`block px-3 py-1.5 rounded-lg transition-colors ${
                      category === cat.slug
                        ? 'bg-brand-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Availability
              </span>
              <div className="space-y-1 text-xs">
                <Link
                  href={`/products?${category ? `category=${category}&` : ''}inStockOnly=${inStockOnly === 'true' ? 'false' : 'true'}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
                    inStockOnly === 'true'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                      : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>In Stock Only</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
              <p className="font-bold text-white">Need Bulk Contractor Rates?</p>
              <p className="text-slate-400 text-[11px]">
                Send your material list on WhatsApp for instant quote calculation.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_SHOP_WHATSAPP_NUMBER || '94704194147'}?text=Hello!%20I%20have%20a%20bulk%20hardware%20quote%20request.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Right Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300">
            <div>
              Showing <span className="font-bold text-white">{filtered.length}</span> hardware items
              {search && <span> matching &ldquo;<span className="text-brand-400">{search}</span>&rdquo;</span>}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Sort By:</span>
              <Link
                href={`/products?${category ? `category=${category}&` : ''}${search ? `search=${search}&` : ''}sort=price_asc`}
                className={`px-2.5 py-1 rounded-md transition-colors ${sort === 'price_asc' ? 'bg-brand-500 text-slate-950 font-bold' : 'hover:text-white'}`}
              >
                Price: Low to High
              </Link>
              <span className="text-slate-700">|</span>
              <Link
                href={`/products?${category ? `category=${category}&` : ''}${search ? `search=${search}&` : ''}sort=price_desc`}
                className={`px-2.5 py-1 rounded-md transition-colors ${sort === 'price_desc' ? 'bg-brand-500 text-slate-950 font-bold' : 'hover:text-white'}`}
              >
                Price: High to Low
              </Link>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No hardware items found</h3>
                <p className="text-xs text-slate-400">
                  Try adjusting your search keywords or switching category filters.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-block px-4 py-2 bg-brand-500 text-slate-950 font-bold text-xs rounded-xl shadow"
              >
                Reset All Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
