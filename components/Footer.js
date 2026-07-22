'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, ShieldCheck, Truck, RefreshCw, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#081c15] text-[#d8f3dc] border-t border-[#1b4332] mt-24">
      
      {/* Eco Values Bar */}
      <div className="border-b border-[#1b4332]/60 bg-[#1b4332]/20 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#1b4332] flex items-center justify-center text-[#74c69d] shrink-0 shadow-md">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Tree Free</h4>
              <p className="text-xs text-[#b7e4c7]">Made from 100% recycled newsprint paper</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#1b4332] flex items-center justify-center text-[#74c69d] shrink-0 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Fast Pan-India Delivery</h4>
              <p className="text-xs text-[#b7e4c7]">Free shipping on orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#1b4332] flex items-center justify-center text-[#74c69d] shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Secure INR Payments</h4>
              <p className="text-xs text-[#b7e4c7]">Encrypted Razorpay UPI, Cards & NetBanking</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#1b4332] flex items-center justify-center text-[#74c69d] shrink-0 shadow-md">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Plantable Seeds</h4>
              <p className="text-xs text-[#b7e4c7]">Non-GMO organic herbs & flower seeds</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#52b788] flex items-center justify-center text-[#081c15] font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">EILA ECO PENCILS</span>
          </div>
          <p className="text-xs text-[#b7e4c7] leading-relaxed">
            Pioneering sustainable stationery in India. We turn old newspaper waste and organic plant seeds into beautiful, high-performance writing instruments.
          </p>
          <div className="text-xs text-[#74c69d] flex items-center gap-1 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 inline" />
            <span>for Earth</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-white text-sm mb-4">Quick Links</h5>
          <ul className="space-y-2.5 text-xs text-[#b7e4c7]">
            <li><Link href="/shop" className="hover:text-[#74c69d] transition-colors">Plantable Seed Pencils</Link></li>
            <li><Link href="/shop" className="hover:text-[#74c69d] transition-colors">Recycled Newspaper Pencils</Link></li>
            <li><Link href="/shop" className="hover:text-[#74c69d] transition-colors">Eco Gift Boxes & Combos</Link></li>
            <li><Link href="/bulk-orders" className="hover:text-[#74c69d] transition-colors">Corporate Gifting & Wholesale</Link></li>
            <li><Link href="/sustainability" className="hover:text-[#74c69d] transition-colors">Our Environmental Impact</Link></li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h5 className="font-bold text-white text-sm mb-4">Customer Support</h5>
          <ul className="space-y-2.5 text-xs text-[#b7e4c7]">
            <li><Link href="/contact" className="hover:text-[#74c69d] transition-colors">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-[#74c69d] transition-colors">Shipping & Delivery Info</Link></li>
            <li><Link href="/returns" className="hover:text-[#74c69d] transition-colors">Returns & Refund Policy</Link></li>
            <li><Link href="/faq" className="hover:text-[#74c69d] transition-colors">Frequently Asked Questions</Link></li>
            <li><Link href="/admin/login" className="hover:text-amber-300 text-[#74c69d] transition-colors">Admin Portal Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h5 className="font-bold text-white text-sm mb-4">Get In Touch</h5>
          <div className="flex items-start gap-2.5 text-xs text-[#b7e4c7]">
            <MapPin className="w-4 h-4 text-[#74c69d] shrink-0 mt-0.5" />
            <span>Eila Eco Pencils Pvt. Ltd.<br />Bengaluru, Karnataka 560001, India</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#b7e4c7]">
            <Phone className="w-4 h-4 text-[#74c69d] shrink-0" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#b7e4c7]">
            <Mail className="w-4 h-4 text-[#74c69d] shrink-0" />
            <span>hello@eilaecopencils.com</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#1b4332] bg-[#05110d] py-5 px-4 text-center text-xs text-[#74c69d]">
        <p>© {new Date().getFullYear()} Eila Eco Pencils. All rights reserved. Built for sustainability.</p>
      </div>

    </footer>
  );
}
