import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-supabase.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    category_id: 'cat-pencils',
    category_name: 'Eco Pencils',
    name: 'Recycled Newspaper Pencils (Pack of 10)',
    slug: 'recycled-newspaper-pencils-pack-10',
    sku: 'EILA-NEWS-10',
    price: 99.00,
    stock: 500,
    rating: 4.8,
    reviews_count: 76,
    description: 'Affordable pencils crafted from 100% recycled newsprint paper. Easy to sharpen, sturdy, and helps prevent deforestation. Ideal for schools, colleges, and bulk institutional usage.',
    features: [
      '100% Recycled Newspaper body',
      'Deforestation-free writing',
      'Smooth dark graphite lead',
      'Minimum Order Quantity: 10 packs'
    ],
    moq: 10,
    image: '/newspaper_pencils.png',
    images: ['/newspaper_pencils.png'],
    active: true
  },
  {
    id: 'prod-2',
    category_id: 'cat-pencils',
    category_name: 'Eco Pencils',
    name: 'Plantable Seed Pencils (Pack of 10)',
    slug: 'plantable-seed-pencils-pack-10',
    sku: 'EILA-SEED-10',
    price: 149.00,
    stock: 450,
    rating: 4.9,
    reviews_count: 124,
    description: 'Aesthetic pencils embedded with organic seeds in a water-soluble capsule. Once the pencil becomes too short, plant it bottom-first in soil to watch herbs, vegetables, or flowers grow!',
    features: [
      'Biodegradable non-GMO seed capsule',
      'Assorted seeds: Tomato, Basil, Marigold, Chilli, Sunflower',
      'Rolled recycled paper barrel',
      'Minimum Order Quantity: 10 packs'
    ],
    moq: 10,
    image: '/hero_seed_pencils.png',
    images: ['/hero_seed_pencils.png'],
    active: true
  },
  {
    id: 'prod-3',
    category_id: 'cat-pencils',
    category_name: 'Eco Pencils',
    name: 'Customizable Plantable Seed Pencils (Bulk)',
    slug: 'customizable-plantable-seed-pencils-bulk',
    sku: 'EILA-SEED-CUSTOM',
    price: 12.00,
    stock: 10000,
    rating: 4.9,
    reviews_count: 42,
    description: 'Custom plantable pencils for corporate gifting, institutional branding, or special events. Brand logo and custom text printing options available directly on the recycled paper barrel.',
    features: [
      'Custom brand logo/text printing included',
      'Choice of premium seeds',
      'Perfect for brand marketing, conferences & events',
      'Minimum Order Quantity: 1000 units'
    ],
    moq: 1000,
    image: '/hero_finished_pencils.png',
    images: ['/hero_finished_pencils.png'],
    active: true
  },
  {
    id: 'prod-4',
    category_id: 'cat-gift-sets',
    category_name: 'Gift Sets',
    name: 'Eco-Friendly Gift Box Set (10 Seed Pencils)',
    slug: 'eco-friendly-gift-box-set-10',
    sku: 'EILA-GIFT-BOX',
    price: 199.00,
    stock: 250,
    rating: 5.0,
    reviews_count: 58,
    description: 'An attractive, eco-conscious box set containing 10 premium plantable seed pencils. Excellent choice for birthdays, corporate returns, educational events, and zero-waste gifting.',
    features: [
      'Aesthetic recyclable kraft box packaging',
      '10 Assorted seed pencils inside',
      'Informative plantable instructions card included',
      'Minimum Order Quantity: 10 boxes'
    ],
    moq: 10,
    image: '/hero_seed_pencils.png',
    images: ['/hero_seed_pencils.png'],
    active: true
  },
  {
    id: 'prod-5',
    category_id: 'cat-pens',
    category_name: 'Eco Pens',
    name: 'Recycled Paper Pens (Pack of 10)',
    slug: 'recycled-paper-pens-pack-10',
    sku: 'EILA-PEN-PAPER-10',
    price: 149.00,
    stock: 350,
    rating: 4.7,
    reviews_count: 31,
    description: 'Smooth-writing ballpoint pens constructed using rolled recycled paper bodies instead of plastic barrels. A smart, sustainable alternative for everyday writing.',
    features: [
      'Barrels made from 100% recycled paper',
      'Reduces single-use plastic waste',
      'Premium blue ink with smudge-free writing',
      'Minimum Order Quantity: 10 packs'
    ],
    moq: 10,
    image: '/recycled_paper_pens.png',
    images: ['/recycled_paper_pens.png'],
    active: true
  },
  {
    id: 'prod-6',
    category_id: 'cat-pens',
    category_name: 'Eco Pens',
    name: 'Plantable Seed Pens (Pack of 10)',
    slug: 'plantable-seed-pens-pack-10',
    sku: 'EILA-PEN-SEED-10',
    price: 199.00,
    stock: 300,
    rating: 4.8,
    reviews_count: 47,
    description: 'Eco-conscious paper pens embedded with seed capsules at the rear end. Use the pen to express your thoughts, and plant it to sprout beautiful greenery once exhausted.',
    features: [
      'Water-soluble organic seed capsule',
      'Zero-plastic barrel construction',
      'Engages students and children in sustainability',
      'Minimum Order Quantity: 10 packs'
    ],
    moq: 10,
    image: '/plantable_seed_pens.png',
    images: ['/plantable_seed_pens.png'],
    active: true
  },
  {
    id: 'prod-7',
    category_id: 'cat-pens',
    category_name: 'Eco Pens',
    name: 'Customizable Plantable Seed Pens (Bulk)',
    slug: 'customizable-plantable-seed-pens-bulk',
    sku: 'EILA-PEN-SEED-CUSTOM',
    price: 15.00,
    stock: 8000,
    rating: 4.8,
    reviews_count: 22,
    description: 'Custom plantable seed pens featuring brand logo printing, corporate slogans, or event messaging on the recycled paper body. Ideal for green brand marketing campaigns.',
    features: [
      'Custom brand screen-printing available',
      'High-germination rate organic seeds',
      'Ideal for eco-conscious businesses and exhibitions',
      'Minimum Order Quantity: 500 units'
    ],
    moq: 500,
    image: '/customizable_seed_pens.png',
    images: ['/customizable_seed_pens.png'],
    active: true
  },
  {
    id: 'prod-8',
    category_id: 'cat-bags-pouches',
    category_name: 'Bags & Pouches',
    name: 'Handmade Newspaper Pouches (Bulk)',
    slug: 'handmade-newspaper-pouches-bulk',
    sku: 'EILA-POUCH-NEWS',
    price: 5.00,
    stock: 5000,
    rating: 4.6,
    reviews_count: 18,
    description: 'Artisanal pouches handmade from folded waste newspapers by local women. Biodegradable, light, and vintage-looking bags suitable for small gifts, accessories, or retail packaging.',
    features: [
      'Handcrafted by local women artisans',
      'Upcycled from waste newspapers',
      'Fully biodegradable and compostable',
      'Minimum Order Quantity: 100 units'
    ],
    moq: 100,
    image: '/newspaper_pouches.png',
    images: ['/newspaper_pouches.png'],
    active: true
  },
  {
    id: 'prod-9',
    category_id: 'cat-bags-pouches',
    category_name: 'Bags & Pouches',
    name: 'Customizable Brown Paper Carry Bags',
    slug: 'customizable-brown-paper-carry-bags',
    sku: 'EILA-BAG-CARRY',
    price: 18.00,
    stock: 4000,
    rating: 4.8,
    reviews_count: 29,
    description: 'Strong, premium kraft brown paper carry bags with handles. Suitable for retail shopping, gifting, and delivery. Brand logo printing and marketing ads can be custom printed on both sides.',
    features: [
      'Heavy-duty paper stock with strong handles',
      'Custom logo and advertisement printing available',
      'Eco-alternative to single-use plastic carry bags',
      'Minimum Order Quantity: 10 units'
    ],
    moq: 10,
    image: '/brown_carry_bags.png',
    images: ['/brown_carry_bags.png'],
    active: true
  },
  {
    id: 'prod-10',
    category_id: 'cat-bags-pouches',
    category_name: 'Bags & Pouches',
    name: 'Eco-Friendly Brown Paper Pouches',
    slug: 'eco-friendly-brown-paper-pouches',
    sku: 'EILA-POUCH-BROWN',
    price: 8.00,
    stock: 6000,
    rating: 4.7,
    reviews_count: 14,
    description: 'Bio-safe, grease-resistant brown paper packaging pouches. Ideal for packing food items, dry items, spices, small retail accessories, or clothing shipments.',
    features: [
      'Food-grade, bio-safe kraft paper',
      'Grease-resistant and sturdy construction',
      'Ideal for bakery, retail, packaging & shipping',
      'Minimum Order Quantity: 10 units'
    ],
    moq: 10,
    image: '/brown_paper_pouches.png',
    images: ['/brown_paper_pouches.png'],
    active: true
  }
];

export const INITIAL_CATEGORIES = [
  { id: 'cat-all', name: 'All Products', slug: 'all' },
  { id: 'cat-pencils', name: 'Eco Pencils', slug: 'eco-pencils' },
  { id: 'cat-pens', name: 'Eco Pens', slug: 'eco-pens' },
  { id: 'cat-gift-sets', name: 'Gift Sets', slug: 'gift-sets' },
  { id: 'cat-bags-pouches', name: 'Bags & Pouches', slug: 'bags-pouches' }
];
