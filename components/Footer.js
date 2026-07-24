'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Heart, Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f231c] text-[#e8f5e9] pt-16 pb-12 border-t border-[#1b4332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-[#1b4332] text-xs">
          
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#1b4332]/40 border border-[#2d6a4f]/50">
            <div className="w-10 h-10 rounded-xl bg-[#52b788] text-[#0f231c] flex items-center justify-center font-bold shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white">100% Tree Free</h4>
              <p className="text-[#a3b18a] text-[11px]">Made from 100% recycled newsprint paper</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#1b4332]/40 border border-[#2d6a4f]/50">
            <div className="w-10 h-10 rounded-xl bg-[#52b788] text-[#0f231c] flex items-center justify-center font-bold shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white">Fast Pan-India Delivery</h4>
              <p className="text-[#a3b18a] text-[11px]">Free shipping on orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#1b4332]/40 border border-[#2d6a4f]/50">
            <div className="w-10 h-10 rounded-xl bg-[#52b788] text-[#0f231c] flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white">Secure INR Payments</h4>
              <p className="text-[#a3b18a] text-[11px]">Encrypted Razorpay UPI, Cards & NetBanking</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#1b4332]/40 border border-[#2d6a4f]/50">
            <div className="w-10 h-10 rounded-xl bg-[#52b788] text-[#0f231c] flex items-center justify-center font-bold shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white">Plantable Seeds</h4>
              <p className="text-[#a3b18a] text-[11px]">Non-GMO organic herbs & flower seeds</p>
            </div>
          </div>

        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          
          {/* Brand Info (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo_leaf_transparent.png"
                alt="Eila Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white">EILA</span>
                <span className="text-[9px] tracking-widest uppercase text-[#74c69d] font-bold -mt-1">Eco Pencils</span>
              </div>
            </Link>
            <p className="text-[#a3b18a] leading-relaxed max-w-sm">
              Empowering India to write sustainably. 100% tree-free recycled paper pencils embedded with organic non-GMO plant seeds that sprout into fresh greenery.
            </p>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase">Shop & Discover</h4>
            <ul className="space-y-2 text-[#a3b18a]">
              <li><Link href="/shop" className="hover:text-white transition-colors">Plantable Seed Pencils</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Recycled Newspaper Pencils</Link></li>
              <li><Link href="/donate-newspapers" className="hover:text-[#74c69d] text-emerald-400 font-bold transition-colors">Donate Old Newspapers ♻️</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Eco Stationery Gift Combos</Link></li>
              <li><Link href="/bulk-orders" className="hover:text-white transition-colors">Corporate Bulk Enquiries</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors">Our Eco Impact</Link></li>
            </ul>
          </div>

          {/* Customer Care (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase">Customer Support</h4>
            <ul className="space-y-2 text-[#a3b18a]">
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">7-Day Replacement Guarantee</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support Team</Link></li>
            </ul>
          </div>

          {/* Contact Details (2 Cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase">Get In Touch</h4>
            <div className="space-y-2 text-[#a3b18a]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#52b788] shrink-0" />
                <span className="truncate">eilaecoproducts@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#52b788] shrink-0" />
                <span>+91 99800 04585</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#52b788] shrink-0" />
                <span>Bilva Enterprise, Dharwad, Karnataka, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[#1b4332] flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#a3b18a] gap-4">
          <p>© {new Date().getFullYear()} Eila Eco Pencils. All rights reserved. Crafted with care for Earth.</p>
          <div className="flex items-center gap-4">
            <Link href="/faq" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
