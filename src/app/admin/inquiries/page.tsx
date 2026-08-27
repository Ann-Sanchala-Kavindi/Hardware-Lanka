'use client';

import { AdminHeader } from '@/components/admin/AdminHeader';
import { StoreService } from '@/lib/supabase/store-service';
import { Inquiry } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
    Eye,
    MessageSquare,
    Phone,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchData = async () => {
    try {
      const data = await StoreService.getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, status: Inquiry['status']) => {
    await StoreService.updateInquiryStatus(id, status);
    await fetchData();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  return (
    <div className="flex-1 space-y-6 pb-12">
      <AdminHeader
        title="Trade Quote Requests & Inquiries"
        description="View customer inquiries submitted from the website and follow up with contractors."
      />

      <div className="px-6 space-y-4">
        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Customer & Phone</th>
                  <th className="px-4 py-3.5">Items & Amount</th>
                  <th className="px-4 py-3.5">Delivery Site</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No trade quote requests received yet.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => {
                    const cleanPhone = inq.customer_phone.replace(/[^0-9]/g, '');

                    return (
                      <tr key={inq.id} className="hover:bg-slate-800/30 transition-colors">
                        {/* Customer */}
                        <td className="px-4 py-3">
                          <span className="font-bold text-white block">{inq.customer_name}</span>
                          <span className="text-[11px] text-brand-400 font-mono">
                            {inq.customer_phone}
                          </span>
                          {inq.customer_email && (
                            <span className="text-[10px] text-slate-500 block">
                              {inq.customer_email}
                            </span>
                          )}
                        </td>

                        {/* Items & Value */}
                        <td className="px-4 py-3">
                          <span className="font-bold text-white block">
                            {inq.items.length} hardware item(s)
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Est: {formatCurrency(inq.total_amount)}
                          </span>
                        </td>

                        {/* Delivery */}
                        <td className="px-4 py-3 text-slate-400 max-w-xs truncate">
                          {inq.delivery_address || 'In-store Pickup'}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3 text-[11px] text-slate-500 font-mono">
                          {new Date(inq.created_at).toLocaleString()}
                        </td>

                        {/* Status dropdown */}
                        <td className="px-4 py-3">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleStatusChange(inq.id, e.target.value as Inquiry['status'])
                            }
                            className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none ${
                              inq.status === 'pending'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : inq.status === 'contacted'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                : inq.status === 'completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            }`}
                          >
                            <option value="pending" className="bg-slate-900 text-white">Pending</option>
                            <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
                            <option value="completed" className="bg-slate-900 text-white">Completed</option>
                            <option value="cancelled" className="bg-slate-900 text-white">Cancelled</option>
                          </select>
                        </td>

                        {/* Quick Contact Buttons */}
                        <td className="px-4 py-3 text-right space-x-1.5">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="View order details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(inq.customer_name)}!%20This%20is%20Lanka%20Hardware%20regarding%20your%20quote%20request.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white"
                            title="Message customer on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`tel:${cleanPhone}`}
                            className="inline-flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-400 hover:text-white"
                            title="Call customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setSelectedInquiry(null)} className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />

          <div className="relative bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-xl shadow-2xl p-6 overflow-hidden z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Quote Request Details</h3>
              <button onClick={() => setSelectedInquiry(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Customer Name</span>
                <span className="font-bold text-white text-sm">{selectedInquiry.customer_name}</span>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Phone / WhatsApp</span>
                <span className="font-mono text-brand-400 font-bold">{selectedInquiry.customer_phone}</span>
              </div>
            </div>

            {selectedInquiry.delivery_address && (
              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-500 block">Site Delivery Address</span>
                <span className="text-white">{selectedInquiry.delivery_address}</span>
              </div>
            )}

            {selectedInquiry.notes && (
              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-500 block">Customer Notes</span>
                <span className="text-slate-300 italic">{selectedInquiry.notes}</span>
              </div>
            )}

            {/* Requested Items Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Requested Hardware List
              </h4>
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 text-[11px]">
                    <tr>
                      <th className="p-2.5">Item</th>
                      <th className="p-2.5">SKU</th>
                      <th className="p-2.5">Qty</th>
                      <th className="p-2.5 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {selectedInquiry.items.map((it, idx) => (
                      <tr key={idx} className="bg-slate-900/50">
                        <td className="p-2.5 font-semibold text-white">{it.product_title}</td>
                        <td className="p-2.5 font-mono text-slate-400">{it.sku}</td>
                        <td className="p-2.5 text-white">{it.quantity} {it.unit}</td>
                        <td className="p-2.5 text-right text-brand-400 font-bold">
                          {formatCurrency(it.price * it.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">Estimated Total:</span>
              <span className="text-lg font-black text-white">
                {formatCurrency(selectedInquiry.total_amount)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
