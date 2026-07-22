'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, Clock, ShieldCheck, MapPin, ArrowLeft } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300">
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Shipping & Delivery Information</h1>
        <p className="text-xs text-emerald-300">Pan-India eco-friendly packaging and dispatch policy</p>
      </div>

      <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs text-emerald-200 leading-relaxed">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" /> Free Shipping Threshold
          </h3>
          <p>We offer <strong>FREE Shipping across India</strong> on all retail orders above <strong>₹499</strong>. For orders below ₹499, a flat shipping fee of ₹49 applies.</p>
        </div>

        <div className="space-y-2 border-t border-emerald-800/80 pt-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" /> Dispatch & Delivery Timelines
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-emerald-300">
            <li><strong>Order Dispatch:</strong> Orders are dispatched from our Bengaluru warehouse within 24 to 48 hours of payment verification.</li>
            <li><strong>Metro Cities:</strong> Delivered within 2–4 business days.</li>
            <li><strong>Rest of India:</strong> Delivered within 4–7 business days.</li>
          </ul>
        </div>

        <div className="space-y-2 border-t border-emerald-800/80 pt-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-300" /> 100% Plastic-Free Packaging
          </h3>
          <p>All items are shipped using 100% plastic-free recycled paper bubble wraps and kraft tape to ensure your order arrives safely while remaining true to our zero-waste mission.</p>
        </div>
      </div>
    </div>
  );
}
