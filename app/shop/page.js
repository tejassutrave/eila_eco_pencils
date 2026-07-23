'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, Leaf } from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  let filtered = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category_name.toLowerCase().includes(selectedCategory.split('-')[0]);

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold border border-[#b7e4c7]">
          <Leaf className="w-4 h-4 text-[#2d6a4f]" />
          <span>Sustainable Storefront</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f231c]">Eco Pencil Catalog</h1>
        <p className="text-xs sm:text-sm text-[#3b5247]">
          Browse our eco-friendly stationery crafted from 100% recycled newsprint paper and embedded with organic seeds.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#e8e6da] rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#2d6a4f] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plantable pencils, seed sets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-full pl-11 pr-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
          />
        </div>

        {/* Categories & Sort */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-[#1b4332] text-white'
                    : 'bg-[#faf9f5] text-[#2d4036] hover:bg-[#f0efe6] border border-[#e8e6da]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-[#2d6a4f] shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#faf9f5] border border-[#e8e6da] rounded-full px-4 py-2.5 text-xs text-[#0f231c] font-semibold focus:outline-none focus:border-[#52b788]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#e8e6da] rounded-3xl space-y-3">
          <Leaf className="w-12 h-12 text-[#52b788] mx-auto opacity-60" />
          <h3 className="text-lg font-bold text-[#0f231c]">No products found</h3>
          <p className="text-xs text-[#4a5e55] max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="px-5 py-2.5 bg-[#1b4332] text-white rounded-full text-xs font-bold hover:bg-[#2d6a4f] transition-colors"
          >
            Reset Filters
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
