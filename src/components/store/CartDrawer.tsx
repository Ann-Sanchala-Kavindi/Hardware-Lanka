'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  FileSpreadsheet,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatCurrency, generateWhatsAppCartLink } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    itemCount,
    openQuoteModal,
  } = useCart();

  if (!isCartOpen) return null;

  const whatsAppCheckoutUrl = generateWhatsAppCartLink(items, subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-400" />
              <h2 className="text-base font-extrabold tracking-tight">Your Hardware Cart</h2>
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-brand-400 text-xs font-bold rounded-full">
                {itemCount} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 text-slate-500 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Your cart is currently empty</p>
                  <p className="text-xs text-slate-400">
                    Add tools, plumbing supplies, or building materials to request a trade quote.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Start Browsing Hardware
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const price = product.discount_price || product.price;
                const lineTotal = price * quantity;

                return (
                  <div
                    key={product.id}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-800 flex gap-3 items-center justify-between"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-lg bg-slate-950 overflow-hidden shrink-0">
                      <Image
                        src={product.image_url}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-white truncate">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {formatCurrency(price)} / {product.unit}
                      </p>
                      <p className="text-xs font-black text-brand-400 mt-0.5">
                        {formatCurrency(lineTotal)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Estimated Total:</span>
                <span className="text-xl font-black text-white">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="space-y-2">
                {/* 1-Click WhatsApp Order */}
                <a
                  href={whatsAppCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order via WhatsApp</span>
                </a>

                {/* Submit Trade Quote Request */}
                <button
                  onClick={() => {
                    closeCart();
                    openQuoteModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Submit for Official Trade Quote</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <button
                  onClick={clearCart}
                  className="text-rose-400 hover:underline"
                >
                  Clear all items
                </button>
                <span>Free in-store pickup available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
