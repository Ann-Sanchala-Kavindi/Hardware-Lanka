import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  Wrench,
  CheckCircle,
} from 'lucide-react';
import { StoreService } from '@/lib/supabase/store-service';
import { formatCurrency } from '@/lib/utils';
import { StockBadge } from '@/components/ui/Badge';
import { SpecsTable } from '@/components/store/SpecsTable';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductDetailActions } from './ProductDetailActions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await StoreService.getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await StoreService.getProducts(product.category_slug);
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const hasDiscount = Boolean(product.discount_price && product.discount_price < product.price);
  const currentPrice = product.discount_price || product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-white">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/products?category=${product.category_slug}`}
          className="hover:text-white capitalize"
        >
          {product.category_slug.replace('-', ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full aspect-square bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {hasDiscount && (
                <span className="px-3 py-1 bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg">
                  Save {Math.round(((product.price - product.discount_price!) / product.price) * 100)}% Off
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              {product.brand && (
                <span className="px-2.5 py-1 bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold text-xs uppercase rounded-lg">
                  {product.brand}
                </span>
              )}
              <StockBadge status={product.stock_status} quantity={product.stock_quantity} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span>SKU: {product.sku || 'N/A'}</span>
              <span>•</span>
              <span className="capitalize">Category: {product.category_slug.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">
                {formatCurrency(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-slate-500 line-through font-semibold">
                  {formatCurrency(product.price)}
                </span>
              )}
              <span className="text-xs text-slate-400">
                per {product.unit}
              </span>
            </div>

            <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Wholesale volume discounts available from UNITED ARI LANKA</span>
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Product Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          <ProductDetailActions product={product} />

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Genuine Warranty</p>
                <p className="text-[10px] text-slate-400">Official manufacturer warranty</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Island-wide Delivery</p>
                <p className="text-[10px] text-slate-400">Direct to construction sites</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4 pt-6 border-t border-slate-800">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Wrench className="w-4 h-4 text-brand-400" />
          <span>Technical Specifications & Data</span>
        </h2>
        <div className="max-w-3xl">
          <SpecsTable specifications={product.specifications} />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white">
              Related Supplies & Accessories
            </h2>
            <Link
              href={`/products?category=${product.category_slug}`}
              className="text-xs font-bold text-brand-400 hover:underline"
            >
              View More in this Category
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
