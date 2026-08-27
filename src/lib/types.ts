export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image_url?: string;
  display_order?: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  category_slug: string;
  brand?: string;
  price: number;
  discount_price?: number | null;
  unit: string; // 'piece', 'set', 'meter', 'kg', 'box', 'bucket', 'kit'
  stock_quantity: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  is_featured?: boolean;
  is_popular?: boolean;
  description: string;
  image_url: string;
  additional_images?: string[];
  specifications?: Record<string, string>;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Inquiry {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address?: string;
  inquiry_type: 'quote_request' | 'bulk_order' | 'general_inquiry';
  items: {
    product_id: string;
    product_title: string;
    sku: string;
    quantity: number;
    price: number;
    unit: string;
  }[];
  total_amount?: number;
  notes?: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  created_at: string;
}

export interface StoreSettings {
  store_name: string;
  tagline: string;
  whatsapp_number: string;
  phone: string;
  email: string;
  address: string;
  opening_hours: string;
  announcement_banner: string;
}
