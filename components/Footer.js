'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, ShieldCheck, Truck, RefreshCw, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 mt-20">
      
      {/* Eco Values Bar */}
      <div className="border-b border-emerald-900/60 bg-emerald-900/30 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Tree Free</h4>
              <p className="text-xs text-emerald-300">Made from 100% recycled newsprint paper</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Fast Pan-India Delivery</h4>
              <p className="text-xs text-emerald-300">Free shipping on orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Secure INR Payments</h4>
              <p className="text-xs text-emerald-300">Encrypted Razorpay UPI, Cards & NetBanking</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Plantable Seeds</h4>
              <p className="text-xs text-emerald-300">Non-GMO organic herbs & flower seeds</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-emerald-950 font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">EILA ECO PENCILS</span>
          </div>
          <p className="text-xs text-emerald-300/90 leading-relaxed">
            Pioneering sustainable stationery in India. We turn old newspaper waste and organic plant seeds into beautiful, high-performance writing instruments.
          </p>
          <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 inline" />
            <span>for Earth</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-white text-sm mb-4">Quick Links</h5>
          <ul className="space-y-2 text-xs text-emerald-300">
            <li><Link href="/shop" className="hover:text-emerald-400 transition-colors">Plantable Seed Pencils</Link></li>
            <li><Link href="/shop" className="hover:text-emerald-400 transition-colors">Recycled Newspaper Pencils</Link></li>
            <li><Link href="/shop" className="hover:text-emerald-400 transition-colors">Eco Gift Boxes & Combos</Link></li>
            <li><Link href="/bulk-orders" className="hover:text-emerald-400 transition-colors">Corporate Gifting & Wholesale</Link></li>
            <li><Link href="/sustainability" className="hover:text-emerald-400 transition-colors">Our Environmental Impact</Link></li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h5 className="font-bold text-white text-sm mb-4">Customer Support</h5>
          <ul className="space-y-2 text-xs text-emerald-300">
            <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-emerald-400 transition-colors">Shipping & Delivery Info</Link></li>
            <li><Link href="/returns" className="hover:text-emerald-400 transition-colors">Returns & Refund Policy</Link></li>
            <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</Link></li>
            <li><Link href="/admin/login" className="hover:text-amber-300 text-emerald-400 transition-colors">Admin Portal Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h5 className="font-bold text-white text-sm mb-4">Get In Touch</h5>
          <div className="flex items-start gap-2.5 text-xs text-emerald-300">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Eila Eco Pencils Pvt. Ltd.<br />Bengaluru, Karnataka 560001, India</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-emerald-300">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-emerald-300">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>hello@eilaecopencils.com</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-emerald-900/80 bg-emerald-950 py-4 px-4 text-center text-xs text-emerald-400">
        <p>© {new Date().getFullYear()} Eila Eco Pencils. All rights reserved. Built for sustainability.</p>
      </div>

    </footer>
  );
}
