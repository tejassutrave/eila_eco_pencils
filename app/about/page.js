'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Heart, Award, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/60 text-emerald-300 text-xs font-bold border border-emerald-600/50">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Reimagining Everyday Stationery for a Greener Tomorrow
        </h1>
        <p className="text-base text-emerald-200 leading-relaxed">
          Founded with a passion for environmental conservation, Eila Eco Pencils is dedicated to eliminating wood waste in stationery while inspiring eco-conscious living across India.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-4 text-emerald-200 text-sm leading-relaxed">
          <h2 className="text-3xl font-extrabold text-white">Why Eila Eco Pencils?</h2>
          <p>
            Millions of students and professionals use pencils every single day. Traditional wooden pencils require felling millions of trees annually, damaging delicate ecosystems and accelerating climate change.
          </p>
          <p>
            We set out to create a better alternative: a pencil that performs impeccably, saves trees by utilizing recycled newspaper waste, and leaves behind a living plant instead of trash!
          </p>
          <div className="p-4 bg-emerald-900/40 border border-emerald-800 rounded-2xl space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" /> Our Promise
            </h4>
            <p className="text-xs text-emerald-300">
              Zero trees cut, 100% biodegradable materials, and non-GMO plant seeds guaranteed to sprout under proper soil and sunlight conditions.
            </p>
          </div>
        </div>

        <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-emerald-700/60 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000"
            alt="Eila Eco Pencils Artisans"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 text-emerald-400 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">Tree-Free Innovation</h3>
          <p className="text-xs text-emerald-300">
            Utilizing patented rolling technology to turn recycled paper layers into graphite-tight, easy-to-sharpen pencil barrels.
          </p>
        </div>

        <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">Social Empowerment</h3>
          <p className="text-xs text-emerald-300">
            Providing sustainable livelihoods, fair wages, and safe working conditions for local artisan communities.
          </p>
        </div>

        <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 text-teal-300 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">Uncompromised Quality</h3>
          <p className="text-xs text-emerald-300">
            Dark 2B graphite lead that writes smoothly without breaking easily or causing paper smudges.
          </p>
        </div>

      </div>

    </div>
  );
}
