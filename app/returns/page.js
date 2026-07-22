'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300">
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Returns & Refund Policy</h1>
        <p className="text-xs text-emerald-300">Hassle-free customer satisfaction guarantee</p>
      </div>

      <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs text-emerald-200 leading-relaxed">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-400" /> 7-Day Replacement Guarantee
          </h3>
          <p>If your items arrive damaged or defective during transit, we offer a free replacement or instant refund within 7 days of delivery.</p>
        </div>

        <div className="space-y-2 border-t border-emerald-800/80 pt-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> How to Request a Return
          </h3>
          <p>Simply send an email to <strong>hello@eilaecopencils.com</strong> or message us on WhatsApp with your Order Number and a photo of the damaged package. Our support team will process your replacement within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}
