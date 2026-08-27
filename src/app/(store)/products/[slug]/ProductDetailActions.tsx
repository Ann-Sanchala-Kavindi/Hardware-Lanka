'use client';

import React, { useState } from 'react';
import { ShoppingCart, MessageSquare, Plus, Minus, Check } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { generateWhatsAppProductLink } from '@/lib/utils';

export function ProductDetailActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const whatsAppLink = generateWhatsAppProductLink(product, quantity);

  return (
    <div className="space-y-4 pt-2">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-slate-300">Quantity:</span>
        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-inner">
          <button
            onClick={handleDecrement}
            className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 text-xs font-black text-white min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {product.unit}(s)
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 py-3.5 px-6 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:-translate-y-0.5"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add {quantity} to Cart</span>
            </>
          )}
        </button>

        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
