'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatCurrency, generateWhatsAppCartLink } from '@/lib/utils';
import { StoreService } from '@/lib/supabase/store-service';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    itemCount,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whatsAppCheckoutUrl = generateWhatsAppCartLink(
    items,
    subtotal,
    customerName,
    deliveryAddress
  );

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setSubmitting(true);
    try {
      await StoreService.submitInquiry({
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        delivery_address: deliveryAddress,
        inquiry_type: 'quote_request',
        items: items.map((i) => ({
          product_id: i.product.id,
          product_title: i.product.title,
          sku: i.product.sku,
          quantity: i.quantity,
          price: i.product.discount_price || i.product.price,
          unit: i.product.unit,
        })),
        total_amount: subtotal,
        notes: notes,
      });

      setSubmitted(true);
      clearCart();
    } catch (err) {
      console.error('Error submitting quote:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">Trade Quote Request Sent!</h1>
          <p className="text-sm text-slate-300">
            Thank you, <span className="font-bold text-brand-400">{customerName}</span>. Our trade sales desk will review your items and follow up via WhatsApp or phone.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <p className="text-xs text-slate-400">
            Want an immediate response? Forward your request directly to our active WhatsApp line:
          </p>
          <a
            href={whatsAppCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open in WhatsApp</span>
          </a>
        </div>

        <Link
          href="/products"
          className="inline-block px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
        >
          Return to Hardware Store
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">Your Hardware Cart is Empty</h1>
          <p className="text-sm text-slate-400">
            Browse our wide selection of power tools, plumbing fittings, and building supplies.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
        >
          <span>Browse Hardware Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Hardware Cart & Trade Quote
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review your material list, calculate estimated prices, and submit for contractor quote or WhatsApp order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Selected Items ({itemCount})
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-rose-400 hover:underline font-semibold"
              >
                Clear Cart
              </button>
            </div>

            <div className="divide-y divide-slate-800">
              {items.map(({ product, quantity }) => {
                const price = product.discount_price || product.price;
                const lineTotal = price * quantity;

                return (
                  <div key={product.id} className="py-4 flex gap-4 items-center justify-between">
                    <div className="relative w-16 h-16 rounded-xl bg-slate-950 overflow-hidden shrink-0">
                      <Image
                        src={product.image_url}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="text-sm font-bold text-white truncate">
                        <Link href={`/products/${product.slug}`} className="hover:text-brand-400">
                          {product.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-400">
                        {formatCurrency(price)} per {product.unit} • SKU: {product.sku}
                      </p>
                      <p className="text-sm font-black text-brand-400 mt-0.5">
                        {formatCurrency(lineTotal)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2.5 py-1.5 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-white min-w-[24px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2.5 py-1.5 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Checkout & Quote Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Order Summary & Quote Submission
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Items:</span>
                <span className="font-bold text-white">{itemCount} items</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Subtotal:</span>
                <span className="text-xl font-black text-white">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            {/* Instant WhatsApp Order Option */}
            <div className="pt-2">
              <a
                href={whatsAppCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order Instant on WhatsApp</span>
              </a>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-slate-500">OR REQUEST FORMAL QUOTE</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Trade Quote Form */}
            <form onSubmit={handleSubmitQuote} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name / Contractor *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Mike Vance Construction"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +1 555 123 4567"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Jobsite Delivery Address (Optional)
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Delivery address or store pickup"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-colors disabled:opacity-50"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit for Trade Quote'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
