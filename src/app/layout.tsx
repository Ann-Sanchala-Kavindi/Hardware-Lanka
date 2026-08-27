import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'Apex Tools & Hardware Supply | Premium Tools & Contractor Materials',
  description: 'Wholesale & Retail Hardware Supplies: Power Tools, Hand Tools, Plumbing, Electrical Panels, Structural Fasteners & Safety Gear. WhatsApp Ordering & Site Delivery.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-slate-950">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
