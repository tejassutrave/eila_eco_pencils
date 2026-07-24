-- EILA ECO PRODUCTS - ENTERPRISE DATABASE SCHEMA
-- Target Database: Supabase PostgreSQL (PostgREST Compliant)
-- Features: Row-Level Security (RLS), Automated Triggers, Indexes, and Initial Seed Data.

-- ==========================================
-- 0. CLEANUP (For rebuilds)
-- ==========================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.newspaper_donations CASCADE;
DROP TABLE IF EXISTS public.inquiries CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.user_cart_items CASCADE;
DROP TABLE IF EXISTS public.user_carts CASCADE;
DROP TABLE IF EXISTS public.product_images CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.admin_profiles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. PROFILES & USER ACCOUNTS
-- ==========================================

-- Customer Profiles (Extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'manager')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Profiles (Detailed administrative records)
CREATE TABLE public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    admin_code TEXT UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'manager')),
    department TEXT NOT NULL DEFAULT 'Operations',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. PRODUCT CATALOG
-- ==========================================

-- Categories
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    active BOOLEAN NOT NULL DEFAULT true,
    moq INTEGER NOT NULL DEFAULT 1 CHECK (moq >= 1), -- Minimum Order Quantity
    features TEXT[] DEFAULT '{}',
    image TEXT NOT NULL, -- Main thumb image
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Image Gallery
CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. SHOPPING CARTS
-- ==========================================

-- User Carts
CREATE TABLE public.user_carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Cart Items
CREATE TABLE public.user_cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID REFERENCES public.user_carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cart_id, product_id)
);

-- ==========================================
-- 4. SALES ORDERS
-- ==========================================

-- Orders
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    order_number TEXT UNIQUE NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    pincode TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    payment_id TEXT, -- Razorpay Payment ID
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. LEADS & CONTACT CHANNELS
-- ==========================================

-- Corporate & Bulk Inquiries
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    quantity_needed INTEGER NOT NULL CHECK (quantity_needed > 0),
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Doorstep Newspaper Donations
CREATE TABLE public.newspaper_donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
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

-- Product Reviews
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    username TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    review_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, user_id)
);

-- ==========================================
-- 6. AUTOMATED DB TRIGGERS (Auth Sync)
-- ==========================================

-- Function to handle auto profile and cart creations on Auth Sign-Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_username TEXT;
    new_role TEXT;
BEGIN
    new_username := COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1));
    new_role     := COALESCE(new.raw_user_meta_data->>'role', 'customer');

    -- 1. Create public profile
    INSERT INTO public.profiles (id, username, full_name, email, role)
    VALUES (
        new.id,
        new_username,
        COALESCE(new.raw_user_meta_data->>'full_name', new_username),
        new.email,
        new_role
    );

    -- 2. Create admin profile if registering as admin
    IF new_role = 'admin' OR new.email LIKE 'admin%' THEN
        INSERT INTO public.admin_profiles (user_id, admin_code, full_name, email, role, department)
        VALUES (
            new.id,
            'ADM-' || FLOOR(1000 + RANDOM() * 9000),
            COALESCE(new.raw_user_meta_data->>'full_name', new_username),
            new.email,
            'admin',
            'Operations'
        );
    END IF;

    -- 3. Create shopping cart container
    INSERT INTO public.user_carts (user_id)
    VALUES (new.id);

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 7. ROW-LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS across all schema entities
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newspaper_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper Function to check if a user is an Admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_profiles WHERE admin_profiles.user_id = $1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can manage own profile" ON public.profiles 
    FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles 
    FOR SELECT USING (public.is_admin(auth.uid()));

-- Admin Profiles policies
CREATE POLICY "Admins can view admin profiles" ON public.admin_profiles 
    FOR SELECT USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

-- Catalog policies (Read is public, modify is admin only)
CREATE POLICY "Categories are public viewable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Products are public viewable" ON public.products FOR SELECT USING (active = true OR public.is_admin(auth.uid()));
CREATE POLICY "Admins manage products" ON public.products FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Gallery images are public viewable" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Admins manage galleries" ON public.product_images FOR ALL USING (public.is_admin(auth.uid()));

-- Shopping Cart policies
CREATE POLICY "Users manage own cart" ON public.user_carts 
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own cart items" ON public.user_cart_items 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_carts 
            WHERE user_carts.id = user_cart_items.cart_id 
            AND user_carts.user_id = auth.uid()
        )
    );

-- Orders & Checkout policies
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin(auth.uid()));
CREATE POLICY "Admins manage orders" ON public.orders FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can insert own order items" ON public.order_items FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND (orders.user_id = auth.uid() OR auth.uid() IS NULL)
    )
);
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND (orders.user_id = auth.uid() OR public.is_admin(auth.uid()))
    )
);

-- Inquiries policies
CREATE POLICY "Anyone can submit bulk inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage inquiries" ON public.inquiries FOR ALL USING (public.is_admin(auth.uid()));

-- Donations policies
CREATE POLICY "Anyone can request pickup donations" ON public.newspaper_donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own donations" ON public.newspaper_donations FOR SELECT USING (auth.uid() = user_id OR public.is_admin(auth.uid()));
CREATE POLICY "Admins manage donations" ON public.newspaper_donations FOR ALL USING (public.is_admin(auth.uid()));

-- Product Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Logged in users can manage reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);

-- ==========================================
-- 8. QUERY OPTIMIZATION INDEXES
-- ==========================================
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_cart_items_cart ON public.user_cart_items(cart_id);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_donations_user ON public.newspaper_donations(user_id);
CREATE INDEX idx_reviews_product ON public.reviews(product_id);

-- ==========================================
-- 9. INITIAL SEED DATA
-- ==========================================

-- Seed Categories
INSERT INTO public.categories (name, slug, description) VALUES
('Plantable Seed Pencils', 'seed-pencils', 'Pencils crafted from recycled paper containing seeds at the end to grow herbs/flowers after use.'),
('Eco-Friendly Pens', 'eco-pens', 'Recycled paper pens with plantable seeds, replacing single-use plastic stationery.'),
('Newspaper Pouches', 'newspaper-pouches', 'Handmade, durable carry cases made from upcycled newspapers by local women cooperatives.'),
('Kraft Carry Bags', 'carry-bags', 'Strong, premium kraft brown shopping and delivery bags with handles.');

-- Seed Products (Query IDs based on names)
INSERT INTO public.products (category_id, name, slug, description, price, stock, moq, image, features) 
SELECT 
    id, 
    'Recycled Newspaper Pencils (Pack of 10)', 
    'recycled-newspaper-pencils-pack-10', 
    '100% wood-free pencils crafted from recycled newspapers. Contains premium HB graphite leads and assorted plantable seeds at the tips.',
    99.00, 
    1500, 
    1, 
    '/hero_finished_pencils.png',
    ARRAY['100% Tree-free recycled paper', 'Assorted organic seeds (tomato, mustard, chili)', 'Smooth dark HB graphite', 'Non-toxic and child-safe']
FROM public.categories WHERE slug = 'seed-pencils';

INSERT INTO public.products (category_id, name, slug, description, price, stock, moq, image, features) 
SELECT 
    id, 
    'Plantable Seed Pens (Pack of 10)', 
    'plantable-seed-pens-pack-10', 
    'Recycled paper ball pens containing plantable seeds at the bottom. Excludes plastic barrels to prevent landfills pollution.',
    199.00, 
    1200, 
    1, 
    '/plantable_seed_pens.png',
    ARRAY['Recycled paper barrelbody', 'Organic seeds inside capsules', 'Fine 0.7mm blue ink', 'Biodegradable design']
FROM public.categories WHERE slug = 'eco-pens';

INSERT INTO public.products (category_id, name, slug, description, price, stock, moq, image, features) 
SELECT 
    id, 
    'Recycled Paper Pens (Pack of 10)', 
    'recycled-paper-pens-pack-10', 
    'Sustainable fine-writing paper pens crafted from upcycled cardboard rolls and newspapers. Zero-waste packaging.',
    149.00, 
    800, 
    1, 
    '/recycled_paper_pens.png',
    ARRAY['Crafted from upcycled paper', 'Non-toxic ink formulas', 'Premium grip barrel design', 'Recyclable carton packs']
FROM public.categories WHERE slug = 'eco-pens';

INSERT INTO public.products (category_id, name, slug, description, price, stock, moq, image, features) 
SELECT 
    id, 
    'Handmade Newspaper Pouch (Pack of 5)', 
    'handmade-newspaper-pouches-pack-5', 
    'Quirky, upcycled newspapers pouches hand-woven by local artisan cooperatives. Lightweight, sturdy, and eco-chic.',
    120.00, 
    300, 
    1, 
    '/newspaper_pouches.png',
    ARRAY['Upcycled newspapers', 'Laminated for splash protection', 'Sturdy snap button locks', 'Supports rural artisan livelihoods']
FROM public.categories WHERE slug = 'newspaper-pouches';

INSERT INTO public.products (category_id, name, slug, description, price, stock, moq, image, features) 
SELECT 
    id, 
    'Kraft Paper Carry Bags (Pack of 50)', 
    'kraft-carry-bags-pack-50', 
    'Sturdy brown paper carry bags with strong handles. Perfect for retailers, grocers, and environment-friendly gift packaging.',
    450.00, 
    500, 
    1, 
    '/brown_carry_bags.png',
    ARRAY['100% biodegradable kraft paper', 'Sturdy twisted paper handles', 'Flat base structure', 'Holds up to 3kg payload']
FROM public.categories WHERE slug = 'carry-bags';
