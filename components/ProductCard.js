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
    <div className="group relative bg-emerald-950/60 border border-emerald-800/60 rounded-2xl overflow-hidden hover:border-emerald-500/80 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/30 flex flex-col justify-between">
      
      {/* Image & Badge Overlay */}
      <div className="relative aspect-square bg-emerald-900/40 overflow-hidden">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&q=80&w=600'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-60" />

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-md text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-700/60 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{product.category_name || 'Plantable Eco Pencil'}</span>
        </div>

        {/* Stock Badge */}
        {product.stock <= 20 && (
          <div className="absolute top-3 right-3 bg-amber-500 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
            Only {product.stock} left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-emerald-200 font-bold ml-1">{product.rating || 4.9}</span>
            <span className="text-emerald-400 text-[10px]">({product.reviews_count || 28})</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-emerald-300/80 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-emerald-900 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-emerald-400 block font-medium">Price</span>
            <span className="text-lg font-extrabold text-white">₹{product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all duration-300 shadow-md ${
              added
                ? 'bg-amber-400 text-emerald-950 scale-95'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105 shadow-emerald-900/50'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
