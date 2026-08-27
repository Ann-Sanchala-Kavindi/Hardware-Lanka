import { supabase, isSupabaseConfigured } from './client';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../mock-data';
import { Category, Product, Inquiry, StoreSettings } from '../types';

// In-memory fallback state for client-side testing when Supabase is not connected
let localProducts: Product[] = [...INITIAL_PRODUCTS];
let localCategories: Category[] = [...INITIAL_CATEGORIES];
let localInquiries: Inquiry[] = [
  {
    id: 'inq-101',
    customer_name: 'David Miller (Contractor)',
    customer_phone: '+1 (555) 987-6543',
    customer_email: 'david.builder@example.com',
    delivery_address: '45 Lakeview Heights, Site 3',
    inquiry_type: 'bulk_order',
    items: [
      {
        product_id: 'prod-1',
        product_title: 'DeWalt 20V MAX Brushless Cordless Drill / Driver Kit',
        sku: 'PT-DW20V-01',
        quantity: 4,
        price: 129.99,
        unit: 'kit',
      },
      {
        product_id: 'prod-7',
        product_title: 'High-Strength Structural Drywall Screws',
        sku: 'BM-SCR-DW1000',
        quantity: 10,
        price: 24.99,
        unit: 'box',
      },
    ],
    total_amount: 769.86,
    notes: 'Need this delivered to the construction site by Thursday morning.',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];
let localSettings: StoreSettings = { ...INITIAL_SETTINGS };

export const StoreService = {
  // === CATEGORIES ===
  async getCategories(): Promise<Category[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    return localCategories;
  },

  // === PRODUCTS ===
  async getProducts(categorySlug?: string, searchQuery?: string): Promise<Product[]> {
    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('products').select('*');
      if (categorySlug && categorySlug !== 'all') {
        query = query.eq('category_slug', categorySlug);
      }
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%`);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }

    // Fallback Mock Filtering
    let results = [...localProducts];
    if (categorySlug && categorySlug !== 'all') {
      results = results.filter((p) => p.category_slug === categorySlug);
    }
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return results;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) return data;
    }
    const found = localProducts.find((p) => p.slug === slug);
    return found || null;
  },

  async saveProduct(product: Partial<Product>): Promise<Product> {
    if (isSupabaseConfigured && supabase) {
      if (product.id) {
        const { data, error } = await supabase
          .from('products')
          .update(product)
          .eq('id', product.id)
          .select()
          .single();
        if (!error && data) return data;
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([product])
          .select()
          .single();
        if (!error && data) return data;
      }
    }

    // Local in-memory save
    if (product.id) {
      const index = localProducts.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        localProducts[index] = { ...localProducts[index], ...product } as Product;
        return localProducts[index];
      }
    }
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: product.title || 'New Hardware Product',
      slug: product.slug || `prod-${Date.now()}`,
      sku: product.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
      category_slug: product.category_slug || 'power-tools',
      brand: product.brand || '',
      price: product.price || 0,
      discount_price: product.discount_price,
      unit: product.unit || 'piece',
      stock_quantity: product.stock_quantity ?? 10,
      stock_status: product.stock_status || 'in_stock',
      description: product.description || '',
      image_url: product.image_url || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      is_featured: product.is_featured ?? false,
      is_popular: product.is_popular ?? false,
      specifications: product.specifications || {},
      created_at: new Date().toISOString(),
    };
    localProducts.unshift(newProduct);
    return newProduct;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    }
    localProducts = localProducts.filter((p) => p.id !== id);
    return true;
  },

  // === INQUIRIES & QUOTE REQUESTS ===
  async getInquiries(): Promise<Inquiry[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return localInquiries;
  },

  async submitInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<Inquiry> {
    const payload = {
      ...inquiry,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([payload])
        .select()
        .single();
      if (!error && data) return data;
    }

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      ...payload,
    };
    localInquiries.unshift(newInquiry);
    return newInquiry;
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);
      if (!error) return true;
    }
    const target = localInquiries.find((i) => i.id === id);
    if (target) {
      target.status = status;
      return true;
    }
    return false;
  },

  // === STORE SETTINGS ===
  async getStoreSettings(): Promise<StoreSettings> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('store_settings')
        .select('*')
        .limit(1)
        .single();
      if (!error && data) return data;
    }
    return localSettings;
  },

  async updateStoreSettings(settings: Partial<StoreSettings>): Promise<StoreSettings> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('store_settings')
        .upsert([{ ...settings, updated_at: new Date().toISOString() }])
        .select()
        .single();
      if (!error && data) return data;
    }
    localSettings = { ...localSettings, ...settings };
    return localSettings;
  },
};
