'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, ArrowRight, Sparkles, CheckCircle2, Sprout, Sun, RefreshCw, Award, Heart, ShieldCheck } from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? INITIAL_PRODUCTS
    : INITIAL_PRODUCTS.filter(p => p.category_name.toLowerCase().includes(selectedCategory.split('-')[0]));

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-950 via-emerald-900/60 to-emerald-950">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Column: Text & CTA */}
          <div className="space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-600/50 text-emerald-300 text-xs font-bold shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>India’s Leading Plantable Stationery Brand</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Don’t Throw Away Your Pencils — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Plant Them!</span> 🌿
            </h1>

            <p className="text-emerald-200 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Crafted from 100% recycled newsprint paper without cutting a single tree. Embedded with organic seeds that sprout into tomatoes, basil, sunflower & marigold!
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-900/60 transition-all hover:scale-105"
              >
                Shop Eco Catalog <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/bulk-orders"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-900/80 hover:bg-emerald-800 text-white border border-emerald-700/60 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                Corporate Bulk Orders
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-emerald-800/60 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-2xl font-extrabold text-white">100K+</span>
                <span className="text-xs text-emerald-300">Trees Saved</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-amber-400">50K+</span>
                <span className="text-xs text-emerald-300">Seeds Planted</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-emerald-400">4.9 ★</span>
                <span className="text-xs text-emerald-300">Happy Customers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative bg-gradient-to-tr from-emerald-900/80 to-emerald-800/40 p-4 sm:p-6 rounded-3xl border border-emerald-700/50 shadow-2xl glass-panel">
              
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-emerald-600/40">
                <img
                  src="https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&q=80&w=1000"
                  alt="Eila Plantable Seed Pencils"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Seed Capsule Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md p-3.5 rounded-xl border border-emerald-700/60 flex items-center gap-3 text-xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 font-bold">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">Embedded Seed Capsule</h5>
                    <p className="text-[11px] text-emerald-300">Tomato • Basil • Chilli • Marigold • Sunflower</p>
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Simple 3-Step Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How Seed Pencils Grow</h2>
          <p className="text-emerald-200 text-sm">
            Experience the joy of turning your writing instrument into a living plant in 3 easy steps!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-emerald-900/40 border border-emerald-800 rounded-2xl p-6 text-center space-y-4 hover:border-emerald-500 transition-colors relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center mx-auto text-xl font-black border border-emerald-700 shadow-md">
              1
            </div>
            <h3 className="font-bold text-lg text-white">Write & Sharpen</h3>
            <p className="text-xs text-emerald-300 leading-relaxed">
              Use your smooth dark 2B velvet pencil for daily writing, drawing, and studying just like any regular pencil.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-emerald-900/40 border border-emerald-800 rounded-2xl p-6 text-center space-y-4 hover:border-emerald-500 transition-colors relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-800/80 text-amber-400 flex items-center justify-center mx-auto text-xl font-black border border-emerald-700 shadow-md">
              2
            </div>
            <h3 className="font-bold text-lg text-white">Plant Upside Down</h3>
            <p className="text-xs text-emerald-300 leading-relaxed">
              When the pencil grows too short to hold, push the green seed capsule end upside down into moist fertile soil.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-emerald-900/40 border border-emerald-800 rounded-2xl p-6 text-center space-y-4 hover:border-emerald-500 transition-colors relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-800/80 text-emerald-400 flex items-center justify-center mx-auto text-xl font-black border border-emerald-700 shadow-md">
              3
            </div>
            <h3 className="font-bold text-lg text-white">Water & Watch It Grow</h3>
            <p className="text-xs text-emerald-300 leading-relaxed">
              Provide sunlight & daily water. The biodegradable capsule dissolves, and your seeds sprout into healthy plants in 5-10 days!
            </p>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Featured Eco Products</h2>
            <p className="text-sm text-emerald-300">100% Tree-free pencils & plantable stationery</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-500 text-emerald-950 shadow-md'
                    : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800 border border-emerald-800'
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-900/80 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl border border-emerald-700/60 transition-all hover:scale-105"
          >
            Explore Complete Store Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. CORPORATE & BULK ORDERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 rounded-3xl p-8 sm:p-12 border border-emerald-700/50 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold border border-amber-400/40">
              Bulk Discounts & Custom Logo Branding
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Green Gifting for Corporate Events, Schools & Weddings
            </h2>
            <p className="text-sm text-emerald-200 leading-relaxed">
              Order customized seed pencils featuring your company logo or school name. Perfect return gifts that reflect your brand’s commitment to sustainability!
            </p>
          </div>

          <Link
            href="/bulk-orders"
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm rounded-xl shadow-xl transition-transform hover:scale-105 shrink-0"
          >
            Request Bulk Quote →
          </Link>

        </div>
      </section>

    </div>
  );
}
