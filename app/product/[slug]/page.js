'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, Star, Check, ArrowLeft, Sprout, ShieldCheck, Truck, RefreshCw, Leaf } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = Router();
  const { addToCart } = useCart();

  const product = INITIAL_PRODUCTS.find((p) => p.slug === params?.slug) || INITIAL_PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back Link */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Product Images Showcase */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl bg-emerald-900/40 border border-emerald-800 overflow-hidden shadow-xl">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-emerald-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-emerald-700/60 flex items-center gap-1.5">
              <Sprout className="w-4 h-4" />
              <span>Plantable Seed Capsule</span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === imgUrl ? 'border-emerald-400 scale-95' : 'border-emerald-800 hover:border-emerald-600'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
              {product.category_name}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1 text-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-white">{product.rating}</span>
              <span className="text-emerald-400 text-xs">({product.reviews_count} verified buyer reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 bg-emerald-900/40 border border-emerald-800 rounded-2xl flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-white">₹{product.price.toFixed(2)}</span>
            <span className="text-xs text-emerald-300">Inclusive of all taxes</span>
            <span className="ml-auto text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
              In Stock ({product.stock} units ready)
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-emerald-200 leading-relaxed">
            {product.description}
          </p>

          {/* Key Features Bullet List */}
          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Key Features & Benefits</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-200">
              {product.features?.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-800/60">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="pt-4 border-t border-emerald-800 flex flex-col sm:flex-row items-center gap-4">
            
            <div className="flex items-center border-2 border-emerald-700 bg-emerald-950 rounded-xl p-1 w-full sm:w-auto justify-between">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-emerald-300 hover:text-white font-bold text-base"
              >
                -
              </button>
              <span className="px-4 font-extrabold text-sm text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-emerald-300 hover:text-white font-bold text-base"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full sm:flex-1 py-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                added
                  ? 'bg-amber-400 text-emerald-950 shadow-amber-400/20'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 shadow-emerald-950/60 hover:scale-105'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Add to Cart (₹{(product.price * quantity).toFixed(2)})
                </>
              )}
            </button>

          </div>

          {/* Plantable Instructions Box */}
          <div className="p-4 bg-gradient-to-r from-emerald-900/60 to-teal-950/60 border border-emerald-700/60 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-emerald-800 text-amber-300 rounded-xl shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h5 className="font-bold text-white">How to Plant This Pencil</h5>
              <p className="text-emerald-300 leading-relaxed">
                When your pencil becomes too stubby to write with, stick the green capsule end downward in a pot of soil, water daily, and give it sunlight. Seeds will sprout in 5–10 days!
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
