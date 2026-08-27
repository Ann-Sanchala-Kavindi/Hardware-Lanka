'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, MessageSquare, Check, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatCurrency, generateWhatsAppProductLink } from '@/lib/utils';
import { StockBadge } from '@/components/ui/Badge';
import { useCart } from '@/lib/cart-context';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const hasDiscount = Boolean(product.discount_price && product.discount_price < product.price);
  const currentPrice = product.discount_price || product.price;
  const whatsAppLink = generateWhatsAppProductLink(product, 1);

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Thumbnail Image */}
        <div className="relative w-full aspect-square bg-slate-950 overflow-hidden">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {hasDiscount && (
              <span className="px-2 py-0.5 bg-rose-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-md shadow">
                Save {Math.round(((product.price - product.discount_price!) / product.price) * 100)}%
              </span>
            )}
            {product.brand && (
              <span className="px-2 py-0.5 bg-slate-900/90 text-brand-300 border border-slate-700 font-bold text-[10px] uppercase rounded-md backdrop-blur-sm">
                {product.brand}
              </span>
            )}
          </div>

          <div className="absolute top-2.5 right-2.5 z-10">
            <StockBadge status={product.stock_status} quantity={product.stock_quantity} />
          </div>

          {/* Quick View Button on Hover */}
          <Link
            href={`/products/${product.slug}`}
            className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold"
          >
            <div className="px-3 py-1.5 bg-slate-900/90 rounded-lg border border-slate-700 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-brand-400" />
              <span>View Specs</span>
            </div>
          </Link>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-2">
          {/* SKU & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono">{product.sku}</span>
            <span className="capitalize">{product.category_slug.replace('-', ' ')}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-brand-300 transition-colors">
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-black text-white">
              {formatCurrency(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-500 line-through font-semibold">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="text-[11px] text-slate-400">
              / {product.unit}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 font-bold text-xs rounded-xl transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
