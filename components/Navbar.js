'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Leaf, Menu, X, Search, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/90 backdrop-blur-md border-b border-emerald-800/40 text-emerald-50">
      {/* Top Banner */}
      <div className="bg-emerald-900 text-emerald-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Free Shipping across India on orders above ₹499! | Plant a tree with every purchase 🌿</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/50 group-hover:scale-105 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-emerald-950 font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                EILA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-semibold -mt-1">
                Eco Pencils
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-100">
            <Link href="/" className="hover:text-emerald-400 transition-colors py-1 border-b-2 border-transparent hover:border-emerald-400">
              Home
            </Link>
            <Link href="/shop" className="hover:text-emerald-400 transition-colors py-1 border-b-2 border-transparent hover:border-emerald-400">
              Shop Catalog
            </Link>
            <Link href="/sustainability" className="hover:text-emerald-400 transition-colors py-1 border-b-2 border-transparent hover:border-emerald-400">
              Our Impact
            </Link>
            <Link href="/bulk-orders" className="hover:text-emerald-400 transition-colors py-1 border-b-2 border-transparent hover:border-emerald-400">
              Corporate & Bulk
            </Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors py-1 border-b-2 border-transparent hover:border-emerald-400">
              About Us
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Search Link */}
            <Link href="/shop" className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/60 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-emerald-800/60 hover:bg-emerald-700/80 text-white rounded-xl transition-all duration-300 flex items-center justify-center border border-emerald-700/50 shadow-md group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-emerald-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-950 animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-emerald-200 hover:text-white rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-emerald-950 border-b border-emerald-800 px-4 pt-3 pb-6 space-y-3 font-medium text-emerald-100">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-emerald-900"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-emerald-900"
          >
            Shop Catalog
          </Link>
          <Link
            href="/sustainability"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-emerald-900"
          >
            Our Impact
          </Link>
          <Link
            href="/bulk-orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-emerald-900"
          >
            Corporate & Bulk Enquiries
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-emerald-900"
          >
            About Us
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 text-xs text-emerald-400 hover:text-white"
          >
            Admin Portal Login →
          </Link>
        </div>
      )}
    </header>
  );
}
