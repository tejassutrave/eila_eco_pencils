'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Recycle,
  Truck,
  Heart,
  CheckCircle2,
  Sparkles,
  Leaf,
  ShieldCheck,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Scale,
  FileText,
  Copy,
  Check,
  ArrowRight,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function DonateNewspapersPage() {
  const [weightKg, setWeightKg] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    preferredPickupDate: '',
    notes: ''
  });

  // Calculate eco impact live
  const pencilsCrafted = Math.round(weightKg * 10);
  const treesSaved = (weightKg * 0.015).toFixed(1);
  const waterSavedLiters = Math.round(weightKg * 26);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimatedWeightKg: weightKg
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionResult(data);
      } else {
        setErrorMessage(data.error || 'Failed to submit pickup request.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sqlSnippet = `-- SQL Schema for Eila Eco Pencils Newspaper Donations
CREATE TABLE IF NOT EXISTS public.newspaper_donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    pincode TEXT NOT NULL,
    estimated_weight_kg NUMERIC NOT NULL,
    preferred_pickup_date DATE,
    notes TEXT,
    status TEXT DEFAULT 'pending_pickup', -- pending_pickup, collected, processed, canceled
    pencils_generated INTEGER GENERATED ALWAYS AS (ROUND(estimated_weight_kg * 10)) STORED
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.newspaper_donations ENABLE ROW LEVEL SECURITY;

-- Allow public users to submit donation requests
CREATE POLICY "Allow public insert to newspaper_donations"
ON public.newspaper_donations FOR INSERT TO public WITH CHECK (true);

-- Allow admins to read donation requests
CREATE POLICY "Allow admin read newspaper_donations"
ON public.newspaper_donations FOR SELECT TO authenticated USING (true);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-16 pb-24 text-[#1b4332]">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#1b4332] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Decorative blur glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#52b788]/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#74c69d]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d6a4f] text-[#74c69d] text-xs font-bold border border-[#52b788]/30 shadow-inner">
            <Recycle className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>Zero Waste Initiative • Free Doorstep Pickup</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Turn Your Old Newspapers Into <span className="text-[#74c69d]">Plantable Pencils!</span> 🌿
          </h1>

          <p className="text-[#d8f3dc] text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Don't burn or discard old newspaper stacks. We collect your paper waste right from your doorstep and transform it into 100% tree-free seed pencils!
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-8 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-[#2d6a4f]/50 border border-[#52b788]/30 p-4 rounded-2xl backdrop-blur-xs">
              <span className="block text-2xl sm:text-3xl font-black text-amber-300">45,000+ kg</span>
              <span className="text-[11px] text-[#b7e4c7] font-semibold">Newspapers Recycled</span>
            </div>
            <div className="bg-[#2d6a4f]/50 border border-[#52b788]/30 p-4 rounded-2xl backdrop-blur-xs">
              <span className="block text-2xl sm:text-3xl font-black text-[#74c69d]">450,000+</span>
              <span className="text-[11px] text-[#b7e4c7] font-semibold">Pencils Crafted</span>
            </div>
            <div className="bg-[#2d6a4f]/50 border border-[#52b788]/30 p-4 rounded-2xl backdrop-blur-xs">
              <span className="block text-2xl sm:text-3xl font-black text-white">675+</span>
              <span className="text-[11px] text-[#b7e4c7] font-semibold">Trees Saved</span>
            </div>
            <div className="bg-[#2d6a4f]/50 border border-[#52b788]/30 p-4 rounded-2xl backdrop-blur-xs">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-300">₹0 Free</span>
              <span className="text-[11px] text-[#b7e4c7] font-semibold">Doorstep Pickup</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 2. INTERACTIVE IMPACT ESTIMATOR */}
        <section className="bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold">
              <Scale className="w-4 h-4 text-[#2d6a4f]" />
              <span>Live Eco Impact Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c]">
              How Much Impact Will Your Donation Make?
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5e55]">
              Adjust the slider to see how many tree-free pencils your old paper stack will create!
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-between font-bold text-sm text-[#0f231c]">
              <span>Estimated Weight:</span>
              <span className="bg-[#1b4332] text-amber-300 text-lg px-4 py-1 rounded-xl shadow-xs">
                {weightKg} kg
              </span>
            </div>

            <input
              type="range"
              min="2"
              max="100"
              step="1"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full h-3 bg-[#e8e6da] rounded-lg appearance-none cursor-pointer accent-[#2d6a4f]"
            />

            <div className="flex justify-between text-[11px] text-[#4a5e55] font-semibold px-1">
              <button type="button" onClick={() => setWeightKg(5)} className="hover:text-[#1b4332] underline">5 kg (Small Bag)</button>
              <button type="button" onClick={() => setWeightKg(15)} className="hover:text-[#1b4332] underline">15 kg (Medium Stack)</button>
              <button type="button" onClick={() => setWeightKg(35)} className="hover:text-[#1b4332] underline">35 kg (Large Bundle)</button>
              <button type="button" onClick={() => setWeightKg(75)} className="hover:text-[#1b4332] underline">75+ kg (Office / School)</button>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#f0efe6]">
            <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-2xl p-5 text-center space-y-1">
              <span className="text-3xl">✏️</span>
              <span className="block text-2xl font-black text-[#0f231c]">{pencilsCrafted}</span>
              <span className="text-xs text-[#2d6a4f] font-bold">Plantable Seed Pencils</span>
            </div>

            <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-2xl p-5 text-center space-y-1">
              <span className="text-3xl">🌳</span>
              <span className="block text-2xl font-black text-[#2d6a4f]">{treesSaved}</span>
              <span className="text-xs text-[#2d6a4f] font-bold">Tree Bark Preserved</span>
            </div>

            <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-2xl p-5 text-center space-y-1">
              <span className="text-3xl">💧</span>
              <span className="block text-2xl font-black text-[#1b4332]">{waterSavedLiters} L</span>
              <span className="text-xs text-[#2d6a4f] font-bold">Water Saved in Mill</span>
            </div>
          </div>
        </section>

        {/* 3. PICKUP FORM & CONFIRMATION SECTION */}
        <section id="pickup-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form / Success Card (7 Cols) */}
          <div className="lg:col-span-7">
            {submissionResult ? (
              <div className="bg-white border-2 border-[#52b788] rounded-3xl p-8 space-y-6 shadow-xl animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#e8f5e9] text-[#2d6a4f] flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-[#52b788]" />
                </div>

                <div className="text-center space-y-2">
                  <span className="bg-[#1b4332] text-amber-300 text-xs font-mono font-bold px-3.5 py-1 rounded-full">
                    Ref ID: {submissionResult.donationId}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0f231c]">
                    Doorstep Pickup Scheduled!
                  </h3>
                  <p className="text-xs text-[#4a5e55]">
                    {submissionResult.message}
                  </p>
                </div>

                <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-2xl p-5 space-y-3 text-xs">
                  <h4 className="font-extrabold text-[#0f231c] uppercase tracking-wider text-[11px]">
                    Pickup Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-[#3b5247]">
                    <div>
                      <span className="block text-[10px] text-[#789085] uppercase">Paper Weight</span>
                      <strong className="text-[#0f231c]">{submissionResult.summary.weightKg} kg</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#789085] uppercase">Pencils Crafted</span>
                      <strong className="text-[#2d6a4f]">~{submissionResult.summary.estimatedPencils} Pencils</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#789085] uppercase">Trees Saved</span>
                      <strong className="text-[#2d6a4f]">~{submissionResult.summary.estimatedTreesSaved} Trees</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#789085] uppercase">Estimated Pickup</span>
                      <strong className="text-[#0f231c]">{submissionResult.summary.pickupDate}</strong>
                    </div>
                  </div>
                </div>

                {/* Reward Voucher Promo */}
                <div className="p-5 rounded-2xl bg-[#e8f5e9] border border-[#b7e4c7] flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold text-[#1b4332] uppercase tracking-wider block">
                      🎁 Thank You Eco Reward
                    </span>
                    <p className="text-xs text-[#2d6a4f]">
                      Get 15% OFF plantable seed pencils with code:
                    </p>
                  </div>
                  <span className="bg-[#1b4332] text-amber-300 font-mono font-bold px-3 py-1.5 rounded-xl text-xs shrink-0">
                    {submissionResult.summary.discountVoucher}
                  </span>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => { setSubmissionResult(null); setFormData({ fullName: '', phone: '', email: '', address: '', city: '', pincode: '', preferredPickupDate: '', notes: '' }); }}
                    className="w-full py-3 bg-[#faf9f5] hover:bg-[#f0efe6] text-[#1b4332] border border-[#e8e6da] font-bold text-xs rounded-2xl transition-all"
                  >
                    Schedule Another Pickup
                  </button>
                  <Link
                    href="/shop"
                    className="w-full py-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs rounded-2xl text-center transition-all shadow-md"
                  >
                    Browse Eco Shop →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
                <div className="space-y-1 border-b border-[#f0efe6] pb-4">
                  <h3 className="text-xl font-extrabold text-[#0f231c] flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#2d6a4f]" /> Schedule Free Newspaper Pickup
                  </h3>
                  <p className="text-xs text-[#4a5e55]">
                    Fill in your address and bundle details. Our logistics agent will collect the newspapers at zero charge!
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-[#0f231c] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#52b788]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-[#0f231c] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#52b788]" /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-extrabold text-[#0f231c] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#52b788]" /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f]"
                  />
                </div>

                {/* Location Fields */}
                <div className="space-y-1.5 text-xs">
                  <label className="font-extrabold text-[#0f231c] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#52b788]" /> Doorstep Pickup Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    placeholder="House/Flat No., Building Name, Street Address, Landmark"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-[#0f231c]">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Bengaluru / Mumbai / Delhi"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-[#0f231c]">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      placeholder="e.g. 560001"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f]"
                    />
                  </div>
                </div>

                {/* Schedule & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-[#0f231c] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#52b788]" /> Preferred Pickup Date
                    </label>
                    <input
                      type="date"
                      name="preferredPickupDate"
                      value={formData.preferredPickupDate}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-[#0f231c]">Est. Weight (kg)</label>
                    <input
                      type="number"
                      min="1"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f] font-bold text-[#1b4332]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-extrabold text-[#0f231c]">Special Pickup Notes (Optional)</label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="e.g. Gate security code / call before arriving"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#faf9f5] border border-[#e8e6da] rounded-xl focus:outline-none focus:border-[#2d6a4f]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Scheduling Free Pickup...</span>
                  ) : (
                    <>
                      <span>Confirm Doorstep Pickup Request</span>
                      <ArrowRight className="w-4 h-4 text-[#74c69d]" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#789085] text-center">
                  🔒 100% Free Service. No hidden charges or credit card required.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Process & Guidelines (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* How It Works Card */}
            <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-3xl p-6 sm:p-7 space-y-5">
              <h3 className="font-extrabold text-lg text-[#0f231c] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> How Newspaper Recycling Works
              </h3>

              <div className="space-y-4 text-xs text-[#3b5247]">
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-xl bg-[#e8f5e9] text-[#1b4332] font-black flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="block text-[#0f231c] font-extrabold">Stack & Bundle Paper</strong>
                    <p className="text-[#4a5e55]">Gather old newspapers, magazines, circulars, or unused notebooks into a bundle.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-xl bg-[#e8f5e9] text-[#1b4332] font-black flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="block text-[#0f231c] font-extrabold">Doorstep Collection</strong>
                    <p className="text-[#4a5e55]">Our pickup executive arrives at your doorstep on the selected date to weigh & collect the bundle.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-xl bg-[#e8f5e9] text-[#1b4332] font-black flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="block text-[#0f231c] font-extrabold">Paper Sterilization & Rolling</strong>
                    <p className="text-[#4a5e55]">We clean, sanitize, and roll the newsprint around high-density graphite lead without cutting any trees.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-xl bg-[#e8f5e9] text-[#1b4332] font-black flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <strong className="block text-[#0f231c] font-extrabold">Embedded Seed Capsules</strong>
                    <p className="text-[#4a5e55]">Each pencil is finished with a non-GMO seed capsule ready to sprout after writing!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accepted vs Not Accepted */}
            <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-7 space-y-4">
              <h4 className="font-extrabold text-sm text-[#0f231c]">Paper Acceptance Guidelines</h4>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 bg-[#e8f5e9]/60 border border-[#b7e4c7]/50 p-3.5 rounded-2xl">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Accepted
                  </span>
                  <ul className="space-y-1 text-[#2d4036] text-[11px]">
                    <li>• Daily newspapers</li>
                    <li>• School notebooks</li>
                    <li>• Kraft paper boxes</li>
                    <li>• Office printouts</li>
                  </ul>
                </div>

                <div className="space-y-2 bg-red-50/60 border border-red-200/50 p-3.5 rounded-2xl">
                  <span className="font-bold text-red-800 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-red-600" /> Not Accepted
                  </span>
                  <ul className="space-y-1 text-red-900 text-[11px]">
                    <li>• Laminated plastic</li>
                    <li>• Metallic foil wrap</li>
                    <li>• Wet / oily paper</li>
                    <li>• Food stained boxes</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* 4. SQL DATABASE INTEGRATION SNIPPET (For Devs & Admins) */}
        <section className="bg-[#0f231c] text-[#e8f5e9] rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl border border-[#1b4332]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b4332] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332] text-amber-300 text-xs font-mono font-bold">
                <FileText className="w-3.5 h-3.5 text-emerald-400" /> Database Setup Code
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Supabase SQL Schema (`newspaper_donations` table)
              </h3>
              <p className="text-xs text-[#a3b18a]">
                Execute this SQL snippet in your Supabase SQL Editor to enable full database persistence for donations.
              </p>
            </div>

            <button
              type="button"
              onClick={copySqlToClipboard}
              className="px-4 py-2.5 bg-[#52b788] hover:bg-[#74c69d] text-[#0f231c] font-bold text-xs rounded-xl flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-md"
            >
              {copiedSql ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied SQL!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy SQL Code</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#091712] border border-[#1b4332] rounded-2xl p-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed">
            <pre>{sqlSnippet}</pre>
          </div>
        </section>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold">
              <HelpCircle className="w-4 h-4 text-[#2d6a4f]" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f231c]">
              Newspaper Donation FAQs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#e8e6da] rounded-2xl p-6 space-y-2">
              <h4 className="font-extrabold text-sm text-[#0f231c]">Is doorstep pickup really 100% free?</h4>
              <p className="text-xs text-[#4a5e55] leading-relaxed">
                Yes! Doorstep pickup is completely free of charge. We cover all logistics costs to encourage paper recycling across India.
              </p>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-2xl p-6 space-y-2">
              <h4 className="font-extrabold text-sm text-[#0f231c]">What is the minimum weight requirement?</h4>
              <p className="text-xs text-[#4a5e55] leading-relaxed">
                We recommend a minimum bundle size of 5 kg for household pickups. For corporate offices or schools, we accept bulk bundles of 100+ kg!
              </p>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-2xl p-6 space-y-2">
              <h4 className="font-extrabold text-sm text-[#0f231c]">Can corporate offices & schools donate in bulk?</h4>
              <p className="text-xs text-[#4a5e55] leading-relaxed">
                Absolutely! We partner with schools, universities, and corporate tech parks for regular paper recycling drives and issue Eco Contribution Certificates.
              </p>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-2xl p-6 space-y-2">
              <h4 className="font-extrabold text-sm text-[#0f231c]">What happens to my donated newspapers?</h4>
              <p className="text-xs text-[#4a5e55] leading-relaxed">
                They are sanitized, tightly rolled around dark graphite lead, embedded with plant seeds, and turned into 100% tree-free pencils.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
