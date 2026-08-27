-- ==============================================================================
-- LANKA HARDWARE STORE - SUPABASE DATABASE SCHEMA & SEED DATA
-- Instructions: Copy and paste all of this into the Supabase SQL Editor and click RUN
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sku TEXT UNIQUE,
    category_slug TEXT REFERENCES public.categories(slug) ON UPDATE CASCADE ON DELETE SET NULL,
    brand TEXT,
    price NUMERIC(10, 2) NOT NULL,
    discount_price NUMERIC(10, 2),
    unit TEXT DEFAULT 'piece', -- e.g. 'piece', 'set', 'meter', 'kg', 'box', 'bag'
    stock_quantity INT DEFAULT 10,
    stock_status TEXT DEFAULT 'in_stock', -- 'in_stock', 'low_stock', 'out_of_stock'
    is_featured BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    description TEXT,
    image_url TEXT,
    additional_images TEXT[] DEFAULT '{}',
    specifications JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Customer Inquiries & Quote Requests Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    delivery_address TEXT,
    inquiry_type TEXT DEFAULT 'quote_request', -- 'quote_request', 'bulk_order', 'general_inquiry'
    items JSONB DEFAULT '[]'::jsonb,
    total_amount NUMERIC(10, 2),
    notes TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'completed', 'cancelled'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Store Settings Table
CREATE TABLE IF NOT EXISTS public.store_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_name TEXT DEFAULT 'Lanka Hardware',
    tagline TEXT DEFAULT 'Your Trusted Partner in Building & Contracting',
    whatsapp_number TEXT DEFAULT '15551234567',
    phone TEXT DEFAULT '+1 (555) 123-4567',
    email TEXT DEFAULT 'sales@lankahardware.com',
    address TEXT DEFAULT '128 Industrial Parkway, Builder District',
    opening_hours TEXT DEFAULT 'Mon - Sat: 7:30 AM - 6:30 PM | Sun: 8:00 AM - 2:00 PM',
    announcement_banner TEXT DEFAULT '⚡ Contractor Discounts Available for Bulk Orders! Call or WhatsApp us today.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Setup Row-Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access for storefront items
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Store settings are viewable by everyone" ON public.store_settings FOR SELECT USING (true);

-- Allow Public to submit Quote Requests & Inquiries
CREATE POLICY "Public can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Allow Full Access for Authenticated Admin Users
CREATE POLICY "Admins full access to categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to inquiries" ON public.inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to settings" ON public.store_settings FOR ALL USING (auth.role() = 'authenticated');

-- 7. Setup Storage Bucket for Product Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public bucket read" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- ==============================================================================
-- 8. SEED DATA - REALISTIC HARDWARE CATEGORIES & PRODUCTS
-- ==============================================================================

INSERT INTO public.categories (name, slug, description, icon, image_url, display_order)
VALUES
('Power Tools', 'power-tools', 'Heavy-duty drills, angle grinders, circular saws & demolition hammers', 'Hammer', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80', 1),
('Hand Tools', 'hand-tools', 'Wrenches, pliers, screwdrivers, sockets, tape measures & levels', 'Wrench', 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=600&q=80', 2),
('Plumbing & Pipes', 'plumbing', 'PVC pipes, brass ball valves, copper fittings & water pumps', 'Droplet', 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80', 3),
('Electrical & Lighting', 'electrical', 'Wiring, conduit, circuit breakers, switches, LED floodlights', 'Zap', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80', 4),
('Building Materials', 'building-materials', 'Cement, rebar, drywall screws, adhesives, waterproofing & sealants', 'Building2', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', 5),
('Paints & Coatings', 'paints', 'Exterior emulsions, primer, spray paint, brushes, rollers & thinners', 'Paintbrush', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80', 6),
('Safety & Fasteners', 'safety-fasteners', 'Hard hats, safety boots, high-vis vests, anchors, nuts & bolts', 'ShieldCheck', 'https://images.unsplash.com/photo-1578873375955-467f53fd7f67?auto=format&fit=crop&w=600&q=80', 7)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.store_settings (store_name, tagline, whatsapp_number, phone, email, address, opening_hours, announcement_banner)
VALUES (
    'Lanka Hardware',
    'Your Trusted Contractor & DIY Hardware Supply Partner',
    '15551234567',
    '+1 (555) 123-4567',
    'sales@lankahardware.com',
    '128 Industrial Parkway, Builder District',
    'Mon - Sat: 7:30 AM - 6:30 PM | Sun: 8:00 AM - 2:00 PM',
    '⚡ Special Wholesale Discounts for Contractors & Bulk Builders! WhatsApp Us for an Instant Quote.'
);

-- Seed Products
INSERT INTO public.products (title, slug, sku, category_slug, brand, price, discount_price, unit, stock_quantity, stock_status, is_featured, is_popular, description, image_url, specifications)
VALUES
(
    'DeWalt 20V MAX Brushless Cordless Drill / Driver Kit',
    'dewalt-20v-max-brushless-cordless-drill',
    'PT-DW20V-01',
    'power-tools',
    'DeWalt',
    149.99,
    129.99,
    'kit',
    24,
    'in_stock',
    true,
    true,
    'High-performance brushless motor delivers 340 unit watts out (UWO) of power. Compact, lightweight design fits into tight areas with ergonomic comfort grip handle.',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    '{"Voltage": "20V MAX", "Battery": "2x 2.0Ah Li-Ion", "Chuck Size": "1/2 inch", "RPM": "0-450 / 0-1,650", "Warranty": "3 Years Limited"}'::jsonb
),
(
    'Bosch 4.5-Inch 11-Amp Heavy Duty Angle Grinder',
    'bosch-4-5-inch-11-amp-angle-grinder',
    'PT-BSH-AG45',
    'power-tools',
    'Bosch',
    89.00,
    79.50,
    'piece',
    18,
    'in_stock',
    true,
    false,
    'Powerful 11 Amp motor producing up to 11,500 RPM for fast material removal and cutting through metal, masonry, and tile. Features vibration-control side handle.',
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
    '{"Amperage": "11.0A", "Disc Diameter": "4-1/2 Inch (115mm)", "No Load RPM": "11,500", "Spindle Thread": "5/8-11 Inch", "Weight": "4.8 lbs"}'::jsonb
),
(
    'Stanley 200-Piece Mechanics Socket & Ratchet Tool Set',
    'stanley-200-piece-mechanics-socket-tool-set',
    'HT-STN-200S',
    'hand-tools',
    'Stanley',
    119.00,
    99.00,
    'set',
    12,
    'in_stock',
    true,
    true,
    'Complete master mechanics tool set with chrome vanadium steel construction. Includes 1/4", 3/8", and 1/2" pear-head ratchets, extensive SAE & metric sockets, and heavy-duty carry case.',
    'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80',
    '{"Piece Count": "200 Pieces", "Material": "Chrome Vanadium Steel", "Ratchets Included": "1/4\", 3/8\", 1/2\"", "Case": "Blow-Molded Rugged Case"}'::jsonb
),
(
    'Heavy-Duty Brass Full-Port Ball Valve (3/4 Inch)',
    'heavy-duty-brass-ball-valve-3-4-inch',
    'PL-BV-34BR',
    'plumbing',
    'LankaPlumb',
    14.50,
    null,
    'piece',
    85,
    'in_stock',
    false,
    true,
    'Lead-free solid forged brass construction with rust-resistant vinyl-coated steel lever handle. Rated for 600 PSI WOG and 150 PSI WSP.',
    'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    '{"Connection Type": "NPT Female x NPT Female", "Size": "3/4 Inch", "Max Pressure": "600 PSI", "Body Material": "Forged Brass (Lead Free)"}'::jsonb
),
(
    'Industrial Grade Schedule 40 PVC Pressure Pipe (2\" x 10ft)',
    'industrial-grade-pvc-pipe-2-inch-10ft',
    'PL-PVC-2IN10',
    'plumbing',
    'PipePro',
    18.75,
    null,
    'piece',
    120,
    'in_stock',
    false,
    false,
    'Rigid PVC Schedule 40 pipe suitable for potable water distribution, irrigation systems, and drainage. Resistant to corrosion and chemicals.',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    '{"Diameter": "2 Inch", "Length": "10 Feet", "Schedule": "SCH 40", "Max Temp": "140°F (60°C)"}'::jsonb
),
(
    'Schneider 200A 24-Space Main Breaker Distribution Panel',
    'schneider-200a-main-breaker-distribution-panel',
    'EL-SCH-200A',
    'electrical',
    'Schneider Electric',
    185.00,
    165.00,
    'piece',
    8,
    'in_stock',
    true,
    false,
    'Indoor surface/flush mount load center panel. Includes factory-installed 200 Amp main circuit breaker with copper bus bars for superior electrical conductivity.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    '{"Amperage Rating": "200 Amp", "Spaces": "24 Spaces / 48 Circuits", "Voltage": "120/240V AC", "Bus Bar Material": "Plated Copper"}'::jsonb
),
(
    'High-Strength Structural Drywall & Wood Screws (Box of 1,000)',
    'structural-drywall-wood-screws-box-1000',
    'BM-SCR-DW1000',
    'building-materials',
    'FastenMax',
    28.50,
    24.99,
    'box',
    50,
    'in_stock',
    false,
    true,
    'Bugle-head coarse thread black phosphate coated screws. Sharp piercing tip designed for rapid penetration into wood and metal studs without pre-drilling.',
    'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    '{"Quantity": "1,000 pcs per box", "Size": "#6 x 1-5/8 Inch", "Drive Type": "Phillips #2", "Coating": "Black Phosphate"}'::jsonb
),
(
    'All-Weather Exterior Weatherproof Wall Primer & Sealer (5 Gallons)',
    'all-weather-exterior-wall-primer-5gal',
    'PT-EXT-PRM5',
    'paints',
    'DuraCoat Pro',
    84.00,
    null,
    'bucket',
    15,
    'in_stock',
    false,
    false,
    '100% acrylic formula engineered to seal masonry, stucco, concrete, and wood surfaces. Blocks alkali and efflorescence with outstanding moisture resistance.',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    '{"Volume": "5 Gallons (18.9 L)", "Coverage": "1,500 - 2,000 sq ft", "Dry Time": "1 Hour to touch", "Base": "100% Acrylic Water-Based"}'::jsonb
),
(
    'OSHA-Certified Construction Safety Hard Hat & High-Vis Vest Kit',
    'osha-certified-safety-hard-hat-high-vis-kit',
    'SF-KIT-OSHA01',
    'safety-fasteners',
    'GuardMaster',
    34.99,
    29.99,
    'set',
    40,
    'in_stock',
    true,
    true,
    'High-density polyethylene vented hard hat with 6-point suspension ratchet dial. Includes ANSI Class 2 high-visibility reflective safety vest and anti-scratch safety goggles.',
    'https://images.unsplash.com/photo-1578873375955-467f53fd7f67?auto=format&fit=crop&w=800&q=80',
    '{"Standards": "ANSI/ISEA Z89.1 Type 1, Class C", "Suspension": "6-Point Ratchet", "Vest Class": "ANSI Class 2", "Includes": "Hard Hat, Vest, Safety Glasses"}'::jsonb
)
ON CONFLICT (slug) DO NOTHING;
