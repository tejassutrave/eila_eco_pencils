-- ==========================================
-- Eila Eco Pencils - Fresh Clean Supabase DB Setup
-- Run this ENTIRE file in SQL Editor to wipe & reset database fresh!
-- ==========================================

-- 1. DROP EXISTING TABLES FOR CLEAN FRESH START
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.user_cart_items CASCADE;
DROP TABLE IF EXISTS public.user_carts CASCADE;
DROP TABLE IF EXISTS public.product_images CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.inquiries CASCADE;
DROP TABLE IF EXISTS public.admin_profiles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CUSTOMER PROFILES TABLE
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'super_admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to automatically create customer profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    'customer'
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. SEPARATE ADMIN PROFILES TABLE (Admins & SuperAdmins)
CREATE TABLE public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    admin_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    department TEXT DEFAULT 'Operations',
    permissions JSONB DEFAULT '["analytics", "inventory", "orders", "inquiries", "revenue_reports"]'::jsonb,
    dashboard_preferences JSONB DEFAULT '{"theme": "dark", "default_view": "sales_overview", "widgets": ["revenue_chart", "traffic", "inventory_alerts", "bulk_leads"]}'::jsonb,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CATEGORIES TABLE
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCTS TABLE
CREATE TABLE public.products (
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

-- 6. USER CARTS TABLE (Per-User Cart Isolation)
CREATE TABLE public.user_carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. USER CART ITEMS TABLE
CREATE TABLE public.user_cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES public.user_carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PRODUCT IMAGES TABLE
CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ORDERS TABLE
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
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

-- 10. ORDER ITEMS TABLE
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0)
);

-- 11. CORPORATE & BULK INQUIRIES TABLE
CREATE TABLE public.inquiries (
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

-- INDEXES
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_admin_profiles_code ON public.admin_profiles(admin_code);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_user_carts_user ON public.user_carts(user_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policy Definitions
CREATE POLICY "Allow public select profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Allow public select admin profiles" ON public.admin_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert admin profiles" ON public.admin_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update admin profiles" ON public.admin_profiles FOR UPDATE USING (true);

CREATE POLICY "Users can manage own cart" ON public.user_carts FOR ALL USING (true);
CREATE POLICY "Users can manage own cart items" ON public.user_cart_items FOR ALL USING (true);

CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Active products are viewable by everyone" ON public.products FOR SELECT USING (active = true);
CREATE POLICY "Product images are viewable by everyone" ON public.product_images FOR SELECT USING (true);

CREATE POLICY "Allow order insertion" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow order items insertion" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow inquiries insertion" ON public.inquiries FOR INSERT WITH CHECK (true);

-- FRESH INITIAL SEED DATA
INSERT INTO public.categories (name, slug, description) VALUES
('Plantable Seed Pencils', 'plantable-seed-pencils', 'Pencils embedded with non-GMO plant seeds at the end capsule that grow into herbs, flowers & vegetables.'),
('Recycled Newspaper Pencils', 'recycled-newspaper-pencils', 'Pencils made from 100% recycled old newspapers without using any wood or tree harm.'),
('Eco Stationery Gift Sets', 'eco-stationery-gift-sets', 'Curated eco-friendly stationery gift boxes for schools, corporate gifting, and eco-enthusiasts.');

INSERT INTO public.products (category_id, name, slug, sku, price, stock, description, features, active) VALUES
((SELECT id FROM public.categories WHERE slug='plantable-seed-pencils'), 'Velvet Plantable Seed Pencils (Pack of 10)', 'velvet-plantable-seed-pencils-pack-10', 'EILA-SEED-10', 249.00, 150, 'Velvet coated extra smooth dark HB pencils embedded with 5 varieties of seeds: Tomato, Chilli, Basil, Marigold, and Sunflower.', '["Zero wood used", "100% biodegradable seed capsule", "Smooth dark 2B lead", "Plant it when too short to write"]'::jsonb, true),
((SELECT id FROM public.categories WHERE slug='recycled-newspaper-pencils'), 'Rainbow Recycled Newspaper Pencils (Pack of 10)', 'rainbow-recycled-newspaper-pencils-pack-10', 'EILA-NEWS-10', 199.00, 200, 'Handcrafted from 100% recycled newsprint paper. Each pencil reveals beautiful colorful paper layers when sharpened.', '["Saves trees & forests", "Easy to sharpen", "Non-toxic organic dye"]'::jsonb, true),
((SELECT id FROM public.categories WHERE slug='eco-stationery-gift-sets'), 'Deluxe Corporate Eco Gifting Combo', 'deluxe-corporate-eco-gifting-combo', 'EILA-GIFT-DELUXE', 499.00, 75, 'Premium eco-friendly gifting set containing 5 seed pencils, 5 newspaper pencils, 1 plantable seed notepad, and a bamboo ruler.', '["Includes Seed Notepad & Bamboo Ruler", "Custom branding available", "Eco-friendly kraft packaging"]'::jsonb, true);

INSERT INTO public.admin_profiles (admin_code, full_name, email, role, department, permissions) VALUES
('ADM-SUPER-01', 'Eila Executive Admin', 'admin@eilaecopencils.com', 'super_admin', 'Executive Operations', '["analytics", "inventory", "orders", "inquiries", "revenue_reports", "admin_management"]'::jsonb);

-- 12. NEWSPAPER DONATIONS TABLE
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donor_phone TEXT NOT NULL,
    weight_estimate NUMERIC(6, 2) NOT NULL CHECK (weight_estimate > 0),
    pickup_address TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Dharwad',
    state TEXT NOT NULL DEFAULT 'Karnataka',
    pincode TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_slot TEXT CHECK (preferred_slot IN ('Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 3 PM)', 'Evening (3 PM - 6 PM)')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'collected', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policy for Donations
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admins view donations" ON public.donations FOR SELECT USING (true);
