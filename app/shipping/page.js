'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Clock, ShieldCheck, ArrowLeft, PackageCheck, MapPin, Sparkles } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5e9] border border-[#b7e4c7] text-[#1b4332] text-xs font-extrabold">
          <Truck className="w-4 h-4 text-[#52b788]" />
          <span>Pan-India Dispatch & Delivery Policy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0f231c] tracking-tight">
          Shipping & Delivery Information 🚚
        </h1>
        <p className="text-sm text-[#4a5e55] max-w-2xl">
          Fast, eco-friendly, 100% plastic-free packaging dispatched across India.
        </p>
      </div>

      {/* Delivery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="font-extrabold text-base text-[#0f231c]">Free Shipping</h3>
          <p className="text-xs text-[#3b5247] leading-relaxed">
            Free shipping across India on all retail orders above <strong>₹499</strong>. Flat ₹49 delivery fee applies on smaller orders.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold">
            <Clock className="w-6 h-6 text-[#2d6a4f]" />
          </div>
          <h3 className="font-extrabold text-base text-[#0f231c]">Fast 24-48 hr Dispatch</h3>
          <p className="text-xs text-[#3b5247] leading-relaxed">
            Orders are processed and dispatched from our Bengaluru warehouse within 24 to 48 hours of payment verification.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold">
            <PackageCheck className="w-6 h-6 text-[#52b788]" />
          </div>
          <h3 className="font-extrabold text-base text-[#0f231c]">100% Zero Plastic</h3>
          <p className="text-xs text-[#3b5247] leading-relaxed">
            Shipped using 100% plastic-free recycled paper bubble wraps and organic kraft paper tape to ensure zero waste.
          </p>
        </div>

      </div>

      {/* Detailed Delivery Timelines Table Card */}
      <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="font-extrabold text-xl text-[#0f231c] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#2d6a4f]" /> Estimated Delivery Timelines
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#faf9f5] rounded-2xl border border-[#e8e6da] space-y-1">
            <span className="font-extrabold text-[#0f231c] text-sm block">Metro Cities (Bengaluru, Mumbai, Delhi, Chennai, Hyderabad)</span>
            <span className="text-[#2d6a4f] font-bold block">Delivered in 2 – 4 Business Days</span>
          </div>

          <div className="p-4 bg-[#faf9f5] rounded-2xl border border-[#e8e6da] space-y-1">
            <span className="font-extrabold text-[#0f231c] text-sm block">Rest of India & Tier-2/3 Towns</span>
            <span className="text-[#2d6a4f] font-bold block">Delivered in 4 – 7 Business Days</span>
          </div>
        </div>

        <div className="p-4 bg-[#e8f5e9] rounded-2xl border border-[#b7e4c7] text-xs text-[#1b4332] flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#2d6a4f] shrink-0" />
          <span>Real-time courier tracking links are sent via SMS and WhatsApp as soon as your parcel is dispatched!</span>
        </div>
      </div>

    </div>
  );
}
