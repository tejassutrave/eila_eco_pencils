'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Leaf, Menu, X, Search, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/90 backdrop-blur-md border-b border-[#e8e6da] text-[#1b4332]">
      {/* Top Banner */}
      <div className="bg-[#1b4332] text-[#e8f5e9] text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Free Shipping across India on orders above ₹499! | Plant a tree with every purchase 🌿</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-[#1b4332] flex items-center justify-center shadow-md shadow-[#1b4332]/10 group-hover:scale-105 transition-transform duration-300">
              <Leaf className="w-6 h-6 text-[#74c69d]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-[#0f231c] group-hover:text-[#2d6a4f] transition-colors">
                EILA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#2d6a4f] font-bold -mt-1">
                Eco Pencils
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#2d4036]">
            <Link href="/" className="hover:text-[#1b4332] transition-colors py-1 border-b-2 border-transparent hover:border-[#2d6a4f]">
              Home
            </Link>
            <Link href="/shop" className="hover:text-[#1b4332] transition-colors py-1 border-b-2 border-transparent hover:border-[#2d6a4f]">
              Shop Catalog
            </Link>
            <Link href="/sustainability" className="hover:text-[#1b4332] transition-colors py-1 border-b-2 border-transparent hover:border-[#2d6a4f]">
              Our Impact
            </Link>
            <Link href="/bulk-orders" className="hover:text-[#1b4332] transition-colors py-1 border-b-2 border-transparent hover:border-[#2d6a4f]">
              Corporate & Bulk
            </Link>
            <Link href="/about" className="hover:text-[#1b4332] transition-colors py-1 border-b-2 border-transparent hover:border-[#2d6a4f]">
              About Us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Search Link */}
            <Link href="/shop" className="p-2.5 text-[#2d4036] hover:text-[#1b4332] hover:bg-[#f0efe6] rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#1b4332]/20 font-bold text-xs group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#74c69d] group-hover:scale-110 transition-transform" />
              <span>Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-amber-400 text-[#0f231c] font-black text-[11px] px-2 py-0.5 rounded-full">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1b4332] hover:bg-[#f0efe6] rounded-xl"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ffffff] border-b border-[#e8e6da] px-4 pt-3 pb-6 space-y-3 font-semibold text-[#1b4332] shadow-xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-[#f0efe6]">
            Home
          </Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-[#f0efe6]">
            Shop Catalog
          </Link>
          <Link href="/sustainability" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-[#f0efe6]">
            Our Impact
          </Link>
          <Link href="/bulk-orders" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-[#f0efe6]">
            Corporate & Bulk Enquiries
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-[#f0efe6]">
            About Us
          </Link>
          <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-xs text-[#2d6a4f] hover:underline">
            Admin Portal Login →
          </Link>
        </div>
      )}
    </header>
  );
}
