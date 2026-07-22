'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Sprout, Trees, Recycle, Globe, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function SustainabilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/60 text-emerald-300 text-xs font-bold border border-emerald-600/50">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Our Environmental Commitment</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          Turning Waste into Greenery
        </h1>
        <p className="text-base text-emerald-200 leading-relaxed">
          Over 8 billion wooden pencils are manufactured globally every year, sacrificing over 80,000 mature trees daily. At Eila Eco Pencils, we are changing that narrative.
        </p>
      </div>

      {/* Impact Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-8 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <Trees className="w-8 h-8" />
          </div>
          <span className="text-4xl font-extrabold text-white block">100,000+</span>
          <h3 className="font-bold text-emerald-200 text-sm">Trees Preserved From Deforestation</h3>
          <p className="text-xs text-emerald-300 leading-relaxed">
            By upcycling discarded old newspapers, we eliminate the need for virgin timber in pencil manufacturing.
          </p>
        </div>

        <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-8 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Sprout className="w-8 h-8" />
          </div>
          <span className="text-4xl font-extrabold text-amber-400 block">50,000+</span>
          <h3 className="font-bold text-emerald-200 text-sm">Plantable Seeds Sprouted</h3>
          <p className="text-xs text-emerald-300 leading-relaxed">
            Every pencil stub planted contributes organic herbs, marigolds, and sunflowers to home gardens across India.
          </p>
        </div>

        <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-8 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-teal-300 flex items-center justify-center mx-auto shadow-inner">
            <Recycle className="w-8 h-8" />
          </div>
          <span className="text-4xl font-extrabold text-teal-300 block">10+ Tons</span>
          <h3 className="font-bold text-emerald-200 text-sm">Newsprint Recycled From Landfills</h3>
          <p className="text-xs text-emerald-300 leading-relaxed">
            We intercept discarded post-consumer newspaper waste and transform it into smooth, durable pencil barrels.
          </p>
        </div>

      </div>

      {/* Sustainable Manufacturing Process */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-12 border border-emerald-800 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Our Zero-Waste Principles</h2>
          <p className="text-xs text-emerald-300">How we ensure 100% circular eco-friendly production</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <span className="text-emerald-400 font-extrabold text-sm">01. Non-Toxic Dyes</span>
            <p className="text-xs text-emerald-300">
              We use organic, non-toxic food-grade dyes to color our newspaper layers, making them 100% safe for children.
            </p>
          </div>

          <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <span className="text-emerald-400 font-extrabold text-sm">02. Non-GMO Seeds</span>
            <p className="text-xs text-emerald-300">
              Our seed capsules contain high-germination non-GMO organic seeds sourced from certified Indian agricultural cooperatives.
            </p>
          </div>

          <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <span className="text-emerald-400 font-extrabold text-sm">03. Plastic-Free Boxes</span>
            <p className="text-xs text-emerald-300">
              All retail packaging is made from 100% unbleached recyclable kraft paper without plastic window film.
            </p>
          </div>

          <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-800/80 space-y-2">
            <span className="text-emerald-400 font-extrabold text-sm">04. Local Empowerment</span>
            <p className="text-xs text-emerald-300">
              Our manufacturing unit empowers local rural women artisans through fair wage employment and skill training.
            </p>
          </div>

        </div>

      </div>

      <div className="text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm rounded-xl shadow-xl transition-transform hover:scale-105"
        >
          Join the Green Revolution — Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
