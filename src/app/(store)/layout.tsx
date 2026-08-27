import React from 'react';
import { Navbar } from '@/components/store/Navbar';
import { Footer } from '@/components/store/Footer';
import { CartDrawer } from '@/components/store/CartDrawer';
import { QuoteModal } from '@/components/store/QuoteModal';
import { StoreService } from '@/lib/supabase/store-service';

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await StoreService.getStoreSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        announcement={settings.announcement_banner}
        whatsappNumber={settings.whatsapp_number}
        phone={settings.phone}
      />
      
      <main className="flex-1">
        {children}
      </main>

      <CartDrawer />
      <QuoteModal />
      <Footer settings={settings} />
    </div>
  );
}
