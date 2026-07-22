import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-supabase.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fallback seed catalog for local testing when Supabase is disconnected
export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    category_id: 'cat-1',
    category_name: 'Plantable Seed Pencils',
    name: 'Velvet Plantable Seed Pencils (Pack of 10)',
    slug: 'velvet-plantable-seed-pencils-pack-10',
    sku: 'EILA-SEED-10',
    price: 249.00,
    stock: 150,
    rating: 4.9,
    reviews_count: 38,
    description: 'Velvet coated extra smooth dark HB pencils embedded with 5 varieties of seeds: Tomato, Chilli, Basil, Marigold, and Sunflower. Plant the bottom capsule in soil when the pencil becomes too short to write!',
    features: [
      'Zero wood used — 100% recycled newsprint',
      '5 Varieties of non-GMO organic seeds',
      'Smooth velvet coating with dark 2B lead',
      '100% Biodegradable plantable capsule'
    ],
    image: 'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800'
    ],
    active: true
  },
  {
    id: 'prod-2',
    category_id: 'cat-2',
    category_name: 'Recycled Newspaper Pencils',
    name: 'Rainbow Recycled Newspaper Pencils (Pack of 10)',
    slug: 'rainbow-recycled-newspaper-pencils-pack-10',
    sku: 'EILA-NEWS-10',
    price: 199.00,
    stock: 200,
    rating: 4.8,
    reviews_count: 52,
    description: 'Handcrafted from 100% recycled newsprint paper. Each pencil reveals beautiful colorful paper layers when sharpened and helps prevent deforestation.',
    features: [
      'Saves trees & reduces landfill waste',
      'Extra dark & break-resistant Graphite lead',
      'Easy to sharpen with standard sharpener',
      'Organic non-toxic dye finish'
    ],
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800'
    ],
    active: true
  },
  {
    id: 'prod-3',
    category_id: 'cat-3',
    category_name: 'Eco Gift Sets',
    name: 'Deluxe Corporate Eco Gifting Combo Box',
    slug: 'deluxe-corporate-eco-gifting-combo',
    sku: 'EILA-GIFT-DELUXE',
    price: 499.00,
    stock: 75,
    rating: 5.0,
    reviews_count: 24,
    description: 'Premium eco-friendly gifting set containing 5 seed pencils, 5 newspaper pencils, 1 plantable seed notebook (50 pages), and 1 handcrafted bamboo ruler.',
    features: [
      'Includes Plantable Seed Notebook & Bamboo Ruler',
      'Custom company logo branding options',
      'Recyclable Kraft paper gift packaging',
      'Ideal for corporate giveaways, schools & return gifts'
    ],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
    ],
    active: true
  },
  {
    id: 'prod-4',
    category_id: 'cat-1',
    category_name: 'Plantable Seed Pencils',
    name: 'Herb Garden Plantable Seed Pencils (Pack of 5)',
    slug: 'herb-garden-plantable-seed-pencils-pack-5',
    sku: 'EILA-HERB-5',
    price: 149.00,
    stock: 120,
    rating: 4.7,
    reviews_count: 19,
    description: 'Special edition pack featuring kitchen herb seeds: Coriander, Mint, Mustard, Fenugreek, and Spinach. Perfect for home gardening enthusiasts!',
    features: [
      '5 Culinary herb seeds',
      'High germination rate seeds',
      'Soft grip body for comfortable writing',
      'Eco-conscious plastic-free packaging'
    ],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
    ],
    active: true
  }
];

export const INITIAL_CATEGORIES = [
  { id: 'cat-all', name: 'All Products', slug: 'all' },
  { id: 'cat-1', name: 'Plantable Seed Pencils', slug: 'plantable-seed-pencils' },
  { id: 'cat-2', name: 'Recycled Newspaper Pencils', slug: 'recycled-newspaper-pencils' },
  { id: 'cat-3', name: 'Eco Gift Sets', slug: 'eco-stationery-gift-sets' }
];
