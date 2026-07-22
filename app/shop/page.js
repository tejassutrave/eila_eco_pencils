'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, Leaf, Sparkles } from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter products by search & category
  let filtered = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category_name.toLowerCase().includes(selectedCategory.split('-')[0]);

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Sustainable Storefront</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Eco Pencil Catalog</h1>
        <p className="text-xs sm:text-sm text-emerald-200">
          Browse our eco-friendly stationery crafted from 100% recycled newsprint paper and embedded with organic seeds.
        </p>
      </div>

      {/* Controls Bar: Search & Sort */}
      <div className="bg-emerald-900/40 border border-emerald-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plantable pencils, seed sets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-950/80 border border-emerald-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-emerald-400 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Category Pills & Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-500 text-emerald-950'
                    : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-800 border border-emerald-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-emerald-950 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-emerald-900/20 border border-emerald-800/60 rounded-3xl space-y-3">
          <Leaf className="w-12 h-12 text-emerald-500 mx-auto opacity-60" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-emerald-300 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Reset Catalog Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
