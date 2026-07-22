'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, ShieldCheck, ArrowLeft, MessageSquare, Mail, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5e9] border border-[#b7e4c7] text-[#1b4332] text-xs font-extrabold">
          <RefreshCw className="w-4 h-4 text-[#52b788]" />
          <span>Hassle-Free Satisfaction Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0f231c] tracking-tight">
          Returns & Replacement Policy 🔄
        </h1>
        <p className="text-sm text-[#4a5e55] max-w-2xl">
          We stand behind the quality of every eco pencil. If anything arrives damaged or defective, we replace it free of cost within 7 days.
        </p>
      </div>

      {/* Guarantee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-8 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6 text-[#52b788]" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">7-Day Free Replacement</h3>
          <p className="text-xs text-[#3b5247] leading-relaxed">
            If your pencils arrive damaged, broken during transit, or missing items, simply let us know within 7 days of delivery. We will dispatch a brand new replacement package free of charge!
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-8 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-[#2d6a4f]" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">Seed Germination Promise</h3>
          <p className="text-xs text-[#3b5247] leading-relaxed">
            All our seed capsules contain fresh, high-germination non-GMO seeds. If your seeds fail to sprout after following planting instructions, contact our support team for a free seed capsule pack replacement.
          </p>
        </div>

      </div>

      {/* How to Request Return Card */}
      <div className="bg-white border border-[#e8e6da] rounded-3xl p-8 space-y-6 shadow-sm">
        <h3 className="font-extrabold text-xl text-[#0f231c] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#2d6a4f]" /> How to Claim a Replacement
        </h3>

        <div className="space-y-4 text-xs text-[#2d4036]">
          <div className="flex gap-4 items-start bg-[#faf9f5] p-4 rounded-2xl border border-[#e8e6da]">
            <span className="w-7 h-7 rounded-xl bg-[#1b4332] text-white flex items-center justify-center font-black shrink-0">1</span>
            <div className="space-y-1">
              <strong className="block text-[#0f231c]">Take a Photo of the Damaged Item</strong>
              <span>Snap a quick picture of the shipping box and damaged items.</span>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-[#faf9f5] p-4 rounded-2xl border border-[#e8e6da]">
            <span className="w-7 h-7 rounded-xl bg-[#1b4332] text-white flex items-center justify-center font-black shrink-0">2</span>
            <div className="space-y-1">
              <strong className="block text-[#0f231c]">Send Us Your Order Number</strong>
              <span>Email <a href="mailto:hello@eilaecopencils.com" className="text-[#1b4332] font-bold underline">hello@eilaecopencils.com</a> or WhatsApp us with your order number.</span>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-[#faf9f5] p-4 rounded-2xl border border-[#e8e6da]">
            <span className="w-7 h-7 rounded-xl bg-[#1b4332] text-white flex items-center justify-center font-black shrink-0">3</span>
            <div className="space-y-1">
              <strong className="block text-[#0f231c]">Instant Replacement Dispatch</strong>
              <span>Our support team will process and dispatch your fresh replacement within 24 hours!</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/918971456552"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#52b788] hover:bg-[#40916c] text-white font-extrabold text-xs rounded-full inline-flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-105"
          >
            <MessageSquare className="w-4 h-4" /> Message Support on WhatsApp
          </a>
          <a
            href="mailto:hello@eilaecopencils.com"
            className="px-6 py-3.5 bg-[#faf9f5] hover:bg-[#f0efe6] text-[#0f231c] border border-[#e8e6da] font-extrabold text-xs rounded-full inline-flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            <Mail className="w-4 h-4" /> Email Customer Care
          </a>
        </div>

      </div>

    </div>
  );
}
