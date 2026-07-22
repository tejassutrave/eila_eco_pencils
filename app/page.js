'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, ArrowRight, Sparkles, Sprout, CheckCircle2, Trees, ShieldCheck, Heart, Star, Award } from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? INITIAL_PRODUCTS
    : INITIAL_PRODUCTS.filter(p => p.category_name.toLowerCase().includes(selectedCategory.split('-')[0]));

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION (Off-white / Warm Cream Dribbble Style) */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#faf9f5] via-[#f4f3ed] to-[#faf9f5]">
        
        {/* Soft Organic Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#52b788]/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Text & CTA (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8f5e9] border border-[#b7e4c7] text-[#1b4332] text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>India’s Leading Plantable Stationery Brand</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f231c] leading-[1.15]">
              Don’t Throw Away Your Pencils — <span className="text-[#2d6a4f] underline decoration-[#52b788]/50 decoration-wavy decoration-2">Plant Them!</span> 🌿
            </h1>

            <p className="text-[#3b5247] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Crafted from 100% recycled newsprint paper without cutting a single tree. Embedded with organic non-GMO seeds that sprout into tomato, basil, marigold & sunflower!
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-sm rounded-full flex items-center justify-center gap-2.5 shadow-xl shadow-[#1b4332]/20 transition-all hover:scale-105"
              >
                Shop Eco Catalog <ArrowRight className="w-5 h-5 text-[#74c69d]" />
              </Link>
              <Link
                href="/bulk-orders"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#f0efe6] text-[#1b4332] border border-[#e8e6da] font-extrabold text-sm rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-sm"
              >
                Corporate Bulk Orders
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-8 border-t border-[#e8e6da] grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <span className="block text-3xl font-black text-[#0f231c]">100K+</span>
                <span className="text-xs text-[#2d6a4f] font-semibold">Trees Saved</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-[#2d6a4f]">50K+</span>
                <span className="text-xs text-[#2d6a4f] font-semibold">Seeds Planted</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-amber-500">4.9 ★</span>
                <span className="text-xs text-[#2d6a4f] font-semibold">Happy Buyers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Feature Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative mx-auto max-w-md lg:max-w-none">
            <div className="relative bg-white p-4 sm:p-5 rounded-[2.5rem] border border-[#e8e6da] shadow-2xl">
              
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&q=80&w=1000"
                  alt="Eila Plantable Seed Pencils"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Seed Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#e8e6da] flex items-center gap-3.5 shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-[#74c69d] flex items-center justify-center shrink-0 font-bold">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#0f231c] text-xs">Embedded Seed Capsule</h5>
                    <p className="text-[11px] text-[#2d6a4f]">Tomato • Basil • Chilli • Marigold • Sunflower</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW PLANTABLE SEED PENCILS WORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold">
            <Sprout className="w-4 h-4 text-[#2d6a4f]" />
            <span>Simple 3-Step Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f231c]">How Seed Pencils Grow</h2>
          <p className="text-[#3b5247] text-sm">
            Experience the magic of turning your writing instrument into a living plant!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white border border-[#e8e6da] rounded-3xl p-8 text-center space-y-4 hover:border-[#52b788] transition-all shadow-sm hover:shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center mx-auto text-xl font-black shadow-inner">
              1
            </div>
            <h3 className="font-extrabold text-lg text-[#0f231c]">Write & Sharpen</h3>
            <p className="text-xs text-[#4a5e55] leading-relaxed">
              Use your smooth dark 2B velvet pencil for daily writing, drawing, and studying just like any regular pencil.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#e8e6da] rounded-3xl p-8 text-center space-y-4 hover:border-[#52b788] transition-all shadow-sm hover:shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl font-black shadow-inner">
              2
            </div>
            <h3 className="font-extrabold text-lg text-[#0f231c]">Plant Upside Down</h3>
            <p className="text-xs text-[#4a5e55] leading-relaxed">
              When the pencil grows too short to hold, push the green seed capsule end upside down into moist fertile soil.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#e8e6da] rounded-3xl p-8 text-center space-y-4 hover:border-[#52b788] transition-all shadow-sm hover:shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-[#e8f5e9] text-[#52b788] flex items-center justify-center mx-auto text-xl font-black shadow-inner">
              3
            </div>
            <h3 className="font-extrabold text-lg text-[#0f231c]">Water & Watch It Grow</h3>
            <p className="text-xs text-[#4a5e55] leading-relaxed">
              Provide sunlight & daily water. The biodegradable capsule dissolves, and your seeds sprout into healthy plants in 5-10 days!
            </p>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f231c]">Featured Eco Products</h2>
            <p className="text-sm text-[#2d6a4f]">100% Tree-free pencils & plantable stationery</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-[#1b4332] text-white shadow-md'
                    : 'bg-white text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Explore Complete Store Catalog <ArrowRight className="w-4 h-4 text-[#74c69d]" />
          </Link>
        </div>
      </section>

      {/* 4. CORPORATE & BULK ORDERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1b4332] text-white rounded-[2.5rem] p-8 sm:p-14 border border-[#2d6a4f] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <span className="inline-block px-3.5 py-1 bg-amber-400 text-[#0f231c] rounded-full text-xs font-black">
              Bulk Discounts & Custom Logo Branding
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Green Gifting for Corporate Events, Schools & Weddings
            </h2>
            <p className="text-sm text-[#d8f3dc] leading-relaxed">
              Order customized seed pencils featuring your company logo or school name. Perfect return gifts that reflect your brand’s commitment to sustainability!
            </p>
          </div>

          <Link
            href="/bulk-orders"
            className="px-8 py-4 bg-white hover:bg-[#f0efe6] text-[#0f231c] font-black text-sm rounded-full shadow-xl transition-transform hover:scale-105 shrink-0"
          >
            Request Bulk Quote →
          </Link>

        </div>
      </section>

    </div>
  );
}
