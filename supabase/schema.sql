-- ==========================================
-- Eila Eco Pencils - Supabase Database Schema
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sku TEXT NOT NULL UNIQUE,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
    order_status TEXT NOT NULL DEFAULT 'processing' CHECK (order_status IN ('processing', 'shipped', 'delivered', 'cancelled')),
    razorpay_order_id TEXT UNIQUE,
    razorpay_payment_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0)
);

-- 7. CORPORATE & BULK INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    quantity_needed INTEGER NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR FAST QUERYING
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(active);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anonymous public read access for active categories, products & images
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Active products are viewable by everyone" ON public.products FOR SELECT USING (active = true);
CREATE POLICY "Product images are viewable by everyone" ON public.product_images FOR SELECT USING (true);

-- Allow public checkout order insertion
CREATE POLICY "Allow public order insertion" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public order items insertion" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inquiries insertion" ON public.inquiries FOR INSERT WITH CHECK (true);

-- SAMPLE SEED DATA
INSERT INTO public.categories (name, slug, description) VALUES
('Plantable Seed Pencils', 'plantable-seed-pencils', 'Pencils embedded with non-GMO plant seeds at the end capsule that grow into herbs, flowers & vegetables.'),
('Recycled Newspaper Pencils', 'recycled-newspaper-pencils', 'Pencils made from 100% recycled old newspapers without using any wood or tree harm.'),
('Eco Stationery Gift Sets', 'eco-stationery-gift-sets', 'Curated eco-friendly stationery gift boxes for schools, corporate gifting, and eco-enthusiasts.')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.products (category_id, name, slug, sku, price, stock, description, features, active) VALUES
((SELECT id FROM public.categories WHERE slug='plantable-seed-pencils'), 'Velvet Plantable Seed Pencils (Pack of 10)', 'velvet-plantable-seed-pencils-pack-10', 'EILA-SEED-10', 249.00, 150, 'Velvet coated extra smooth dark HB pencils embedded with 5 varieties of seeds: Tomato, Chilli, Basil, Marigold, and Sunflower.', '["Zero wood used", "100% biodegradable seed capsule", "Smooth dark 2B lead", "Plant it when too short to write"]'::jsonb, true),
((SELECT id FROM public.categories WHERE slug='recycled-newspaper-pencils'), 'Rainbow Recycled Newspaper Pencils (Pack of 10)', 'rainbow-recycled-newspaper-pencils-pack-10', 'EILA-NEWS-10', 199.00, 200, 'Handcrafted from 100% recycled newsprint paper. Each pencil reveals beautiful colorful paper layers when sharpened.', '["Saves trees & forests", "Extra dark smooth lead", "Easy to sharpen", "Non-toxic organic dye"]'::jsonb, true),
((SELECT id FROM public.categories WHERE slug='eco-stationery-gift-sets'), 'Deluxe Corporate Eco Gifting Combo', 'deluxe-corporate-eco-gifting-combo', 'EILA-GIFT-DELUXE', 499.00, 75, 'Premium eco-friendly gifting set containing 5 seed pencils, 5 newspaper pencils, 1 plantable seed notepad, and a bamboo ruler.', '["Includes Seed Notepad & Bamboo Ruler", "Custom branding available", "Eco-friendly kraft packaging", "Great for corporate events & schools"]'::jsonb, true)
ON CONFLICT (slug) DO NOTHING;
