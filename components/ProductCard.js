'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Check, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white border border-[#e8e6da] rounded-3xl overflow-hidden hover:border-[#52b788] transition-all duration-300 hover:shadow-xl hover:shadow-[#1b4332]/10 flex flex-col justify-between">
      
      {/* Image Container */}
      <div className="relative aspect-square bg-[#f4f3ed] overflow-hidden p-3">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&q=80&w=600'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Category Tag */}
        <div className="absolute top-5 left-5 bg-[#ffffff]/90 backdrop-blur-md text-[#1b4332] text-[10px] font-bold px-3 py-1 rounded-full border border-[#e8e6da] shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{product.category_name || 'Plantable Eco Pencil'}</span>
        </div>

        {/* Low Stock Badge */}
        {product.stock <= 20 && (
          <div className="absolute top-5 right-5 bg-amber-400 text-[#0f231c] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
            Only {product.stock} left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-medium">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[#1a2e26] font-bold ml-1">{product.rating || 4.9}</span>
            <span className="text-[#52b788] text-[10px]">({product.reviews_count || 28})</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-extrabold text-base text-[#0f231c] group-hover:text-[#2d6a4f] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-[#4a5e55] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-[#f0efe6] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#2d6a4f] block font-bold uppercase tracking-wider">Price</span>
            <span className="text-xl font-black text-[#0f231c]">₹{product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition-all duration-300 shadow-md ${
              added
                ? 'bg-amber-400 text-[#0f231c] scale-95'
                : 'bg-[#1b4332] hover:bg-[#2d6a4f] text-white hover:scale-105 shadow-[#1b4332]/20'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#74c69d]" /> Add to Cart
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
