'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Leaf, Menu, X, Search, Sparkles, User, LogOut, UserCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const ANNOUNCEMENTS = [
  '🚚 Free Shipping Above ₹499',
  '♻ Made from Recycled Newspapers',
  '👩 Every Purchase Supports Women Employment',
  '🌱 Plant It After Use',
  '🌍 Zero Waste Manufacturing',
];

export default function Navbar() {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { user, openAuthModal, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setIsFading(false);
      }, 300);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/90 backdrop-blur-md border-b border-[#e8e6da] text-[#1b4332]">
      {/* Top Banner */}
      <div className="bg-[#1b4332] text-[#e8f5e9] text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 h-8 overflow-hidden">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
        <span
          className={`transition-all duration-300 transform ${
            isFading ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
          }`}
        >
          {ANNOUNCEMENTS[currentAnnouncementIndex]}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo_leaf_transparent.png"
              alt="Eila Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
            />
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
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#2d4036]">
            <Link href="/" className="hover:text-[#1b4332] transition-colors py-1 border-b-2 border-transparent hover:border-[#2d6a4f]">
              Home
            </Link>
            <Link href="/shop" className="hover:text-[#1b4332] transition-colors py-1 border-b-2 border-transparent hover:border-[#2d6a4f]">
              Shop Catalog
            </Link>
            <Link href="/donate-newspapers" className="text-[#1b4332] hover:text-[#2d6a4f] bg-[#e8f5e9] hover:bg-[#d8f3dc] px-3 py-1.5 rounded-full border border-[#b7e4c7] transition-all flex items-center gap-1.5 font-bold shadow-xs">
              <span className="animate-bounce text-xs">♻️</span> Donate Newspapers
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
            <Link href="/track-order" className="hover:text-[#1b4332] transition-colors py-1 border-b-2 border-transparent hover:border-[#2d6a4f] flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#52b788]" /> Track Order
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Search Link */}
            <Link href="/shop" className="p-2.5 text-[#2d4036] hover:text-[#1b4332] hover:bg-[#f0efe6] rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            {/* Auth / Sign In Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="px-3.5 py-2 bg-[#e8f5e9] border border-[#b7e4c7] hover:bg-[#d8f3dc] text-[#1b4332] rounded-full font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <UserCheck className="w-4 h-4 text-[#2d6a4f]" />
                  <span>{user.username}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e8e6da] rounded-2xl shadow-xl p-2 z-50 text-xs font-semibold text-[#1b4332]">
                    <div className="px-3 py-2 border-b border-[#f0efe6] text-[11px] text-[#4a5e55]">
                      Logged in as <strong className="block text-[#0f231c] truncate">{user.email}</strong>
                    </div>
                    <Link
                      href="/track-order"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 hover:bg-[#faf9f5] rounded-xl flex items-center gap-2 transition-colors mt-1 text-[#0f231c]"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#52b788]" /> Track My Shipment
                    </Link>
                    <button
                      onClick={() => { signOut(); setUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2.5 bg-white border border-[#e8e6da] hover:bg-[#f0efe6] text-[#1b4332] rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <User className="w-4 h-4 text-[#2d6a4f]" />
                <span>Sign In</span>
              </button>
            )}

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

            {/* Mobile Menu Trigger */}
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
          <Link href="/donate-newspapers" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl bg-[#e8f5e9] text-[#1b4332] font-bold border border-[#b7e4c7] flex items-center gap-2">
            <span>♻️</span> Donate Newspapers (Free Doorstep Pickup)
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
          <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-xl hover:bg-[#f0efe6] text-[#2d6a4f] font-bold">
            🚚 Track My Order
          </Link>
          {!user ? (
            <button
              onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 text-[#2d6a4f] font-bold"
            >
              Sign In / Create Account →
            </button>
          ) : (
            <button
              onClick={() => { signOut(); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 text-red-600 font-bold"
            >
              Sign Out ({user.username})
            </button>
          )}
        </div>
      )}
    </header>
  );
}
