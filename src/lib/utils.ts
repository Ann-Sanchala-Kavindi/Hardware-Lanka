import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product, CartItem } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function generateWhatsAppProductLink(
  product: Product,
  quantity: number = 1,
  whatsappNumber?: string
): string {
  const targetNumber = whatsappNumber || process.env.NEXT_PUBLIC_SHOP_WHATSAPP_NUMBER || '94704194147';
  const cleanNumber = targetNumber.replace(/[^0-9]/g, '');
  
  const priceToUse = product.discount_price || product.price;
  const lineTotal = priceToUse * quantity;

  const message = `Hello UNITED ARI LANKA! 👋
I would like to order / inquire about the following item:

🔨 *Product:* ${product.title}
🏷️ *SKU:* ${product.sku || 'N/A'}
📦 *Quantity:* ${quantity} ${product.unit}(s)
💰 *Price:* ${formatCurrency(priceToUse)} each (${formatCurrency(lineTotal)} total)

Is this item currently in stock and available for delivery/pickup?
Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppCartLink(
  items: CartItem[],
  totalAmount: number,
  customerName?: string,
  deliveryAddress?: string,
  whatsappNumber?: string
): string {
  const targetNumber = whatsappNumber || process.env.NEXT_PUBLIC_SHOP_WHATSAPP_NUMBER || '94704194147';
  const cleanNumber = targetNumber.replace(/[^0-9]/g, '');

  let itemsBreakdown = '';
  items.forEach((item, index) => {
    const unitPrice = item.product.discount_price || item.product.price;
    const subtotal = unitPrice * item.quantity;
    itemsBreakdown += `${index + 1}. *${item.product.title}*\n   Qty: ${item.quantity} ${item.product.unit} | SKU: ${item.product.sku} | ${formatCurrency(subtotal)}\n`;
  });

  const message = `Hello UNITED ARI LANKA! 👋
I would like to place an order / request an official trade quote:

📋 *ORDER ITEMS:*
${itemsBreakdown}
💵 *Estimated Total:* ${formatCurrency(totalAmount)}

${customerName ? `👤 *Customer Name:* ${customerName}\n` : ''}${deliveryAddress ? `📍 *Delivery Address:* ${deliveryAddress}\n` : ''}
Please confirm availability, delivery fee, and payment methods. Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
