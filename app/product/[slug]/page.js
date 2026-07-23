'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, Star, Check, ArrowLeft, Sprout, ShieldCheck, Truck, RefreshCw, Leaf } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
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
        className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Product Images Showcase */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl bg-white border border-[#e8e6da] overflow-hidden shadow-md p-4">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1b4332] border border-[#e8e6da] shadow-sm flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-[#52b788]" />
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
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white ${
                    selectedImage === imgUrl ? 'border-[#1b4332] scale-95' : 'border-[#e8e6da] hover:border-[#52b788]'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-extrabold tracking-wider text-[#2d6a4f] uppercase">
              {product.category_name}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f231c] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1 text-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-black text-[#0f231c]">{product.rating}</span>
              <span className="text-[#4a5e55] text-xs">({product.reviews_count} verified buyer reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="p-5 bg-white border border-[#e8e6da] rounded-3xl flex items-baseline gap-3 shadow-sm">
            <span className="text-3xl font-black text-[#0f231c]">₹{product.price.toFixed(2)}</span>
            <span className="text-xs text-[#4a5e55]">Inclusive of all taxes</span>
            <span className="ml-auto text-xs font-bold text-[#1b4332] bg-[#e8f5e9] px-3 py-1 rounded-full border border-[#b7e4c7]">
              In Stock ({product.stock} units ready)
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#3b5247] leading-relaxed">
            {product.description}
          </p>

          {/* Key Features */}
          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs text-[#0f231c] uppercase tracking-wider">Key Features & Benefits</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2d4036]">
              {product.features?.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-[#e8e6da]">
                  <Check className="w-4 h-4 text-[#52b788] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="pt-4 border-t border-[#e8e6da] flex flex-col sm:flex-row items-center gap-4">
            
            <div className="flex items-center border border-[#e8e6da] bg-white rounded-full p-1.5 w-full sm:w-auto justify-between">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1 text-[#2d4036] hover:text-[#0f231c] font-bold text-base"
              >
                -
              </button>
              <span className="px-4 font-black text-sm text-[#0f231c]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1 text-[#2d4036] hover:text-[#0f231c] font-bold text-base"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full sm:flex-1 py-4 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                added
                  ? 'bg-amber-400 text-[#0f231c]'
                  : 'bg-[#1b4332] hover:bg-[#2d6a4f] text-white shadow-[#1b4332]/20 hover:scale-105'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 text-[#74c69d]" /> Add to Cart (₹{(product.price * quantity).toFixed(2)})
                </>
              )}
            </button>

          </div>

          {/* Plantable Instructions */}
          <div className="p-5 bg-[#e8f5e9] border border-[#b7e4c7] rounded-3xl flex items-start gap-3.5">
            <div className="p-2.5 bg-[#1b4332] text-[#74c69d] rounded-2xl shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h5 className="font-extrabold text-[#0f231c]">How to Plant This Pencil</h5>
              <p className="text-[#2d6a4f] leading-relaxed">
                When your pencil becomes too stubby to write with, stick the green capsule end downward in a pot of soil, water daily, and give it sunlight. Seeds will sprout in 5–10 days!
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
