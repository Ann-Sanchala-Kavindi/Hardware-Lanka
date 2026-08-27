import React from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { StoreService } from '@/lib/supabase/store-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  const settings = await StoreService.getStoreSettings();
  const cleanWhatsApp = (settings.whatsapp_number || '94704194147').replace(/[^0-9]/g, '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-black text-white">Contact UNITED ARI LANKA (PVT) LTD</h1>
        <p className="text-sm text-slate-400">
          Have a bulk hardware requirement or need technical advice on tools? Contact our trade desk or visit our store in Kathankudy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Store Information & Contact Details
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Store Address</h4>
                  <p className="text-slate-300 mt-0.5">{settings.address || 'NO.66/3 AMANULLA ROAD, KATHANKUDY 06, SRILANKA'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Phone Support</h4>
                  <a href={`tel:${settings.phone || '0704194147'}`} className="text-slate-300 hover:text-white mt-0.5 block font-semibold">
                    {settings.phone || '0704194147'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Email</h4>
                  <a href={`mailto:${settings.email || 'Unitedarilanka@gmail.com'}`} className="text-slate-300 hover:text-white mt-0.5 block font-semibold">
                    {settings.email || 'Unitedarilanka@gmail.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">WhatsApp Fast Desk</h4>
                  <a
                    href={`https://wa.me/${cleanWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline mt-0.5 block font-semibold"
                  >
                    Click to Open WhatsApp Chat (0704194147)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Opening Hours</h4>
                  <p className="text-slate-300 mt-0.5">{settings.opening_hours || 'Mon - Sat: 7:30 AM - 6:30 PM | Sun: 8:00 AM - 2:00 PM'}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20United%20Ari%20Lanka!%20I%20have%20a%20question.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-black text-white">Location Map</h2>
            <div className="w-full h-80 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative flex items-center justify-center">
              <iframe
                title="Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.535434509374!2d81.728!3d7.683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDEnMDAuMCJOIDgxwrA0Myc0MC44IkU!5e0!3m2!1sen!2slk!4v1614134812345!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="opacity-80 contrast-125"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free customer loading bay for trucks & vans</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Contractor trade counter at Amanulla Road, Kathankudy 06</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
