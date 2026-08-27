'use client';

import React, { useState } from 'react';
import { X, CheckCircle, FileSpreadsheet, Send, MessageSquare } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { StoreService } from '@/lib/supabase/store-service';
import { formatCurrency, generateWhatsAppCartLink } from '@/lib/utils';

export function QuoteModal() {
  const {
    isQuoteModalOpen,
    closeQuoteModal,
    items,
    subtotal,
    clearCart,
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    try {
      await StoreService.submitInquiry({
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        delivery_address: address,
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

  const whatsAppConfirmationUrl = generateWhatsAppCartLink(
    items,
    subtotal,
    name,
    address
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeQuoteModal}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-lg shadow-2xl p-6 overflow-hidden z-10">
        <button
          onClick={closeQuoteModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">Quote Request Received!</h3>
              <p className="text-xs text-slate-300">
                Our sales team has received your material list. We will call you back at <span className="text-brand-400 font-bold">{phone}</span> with wholesale pricing & delivery scheduling.
              </p>
            </div>

            <div className="pt-3 space-y-2">
              <a
                href={whatsAppConfirmationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp as well for Fast-Track Priority</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  closeQuoteModal();
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-colors"
              >
                Close & Return to Store
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileSpreadsheet className="w-5 h-5 text-brand-400" />
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Request an Official Trade Quote
                </h3>
                <p className="text-[11px] text-slate-400">
                  {items.length} items • Estimated: {formatCurrency(subtotal)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name / Contractor *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe / Ace Builders"
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 555 123 4567"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sales@yourcompany.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Site Delivery Address / City
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Jobsite address or Store Pickup"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Additional Notes / Required Delivery Date
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Need delivery by Friday morning, need 30 extra meters of conduit..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-400 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Quote Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
