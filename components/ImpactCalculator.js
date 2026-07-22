'use client';

import React, { useState } from 'react';
import { Trees, Droplets, Wind, Flower2, Sparkles, Award } from 'lucide-react';

export default function ImpactCalculator() {
  const [pencilCount, setPencilCount] = useState(50);

  // Formulas for Eco Impact Calculation:
  // 1 Wooden Pencil = 0.0001 Trees (1 Tree = ~10,000 Pencils)
  // 1 Pencil = ~5 Liters of Water in wood processing
  // 1 Pencil = ~0.08 kg CO2 emissions offset
  const treesSaved = (pencilCount / 1000).toFixed(2);
  const waterSaved = (pencilCount * 4.5).toFixed(0);
  const carbonSaved = (pencilCount * 0.08).toFixed(1);
  const plantsGrown = Math.round(pencilCount * 0.9);

  return (
    <section className="py-16 bg-white border-y border-[#e8e6da] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="bg-[#e8f5e9] text-[#1b4332] text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 border border-[#b7e4c7]">
            <Award className="w-3.5 h-3.5 text-[#52b788]" /> Interactive Eco Impact Calculator
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f231c] tracking-tight">
            Calculate Your Personal Forest Impact 🌳
          </h2>
          <p className="text-sm text-[#4a5e55]">
            Drag the slider below to see how switching your annual pencil consumption to Eila Eco Pencils directly saves trees, water, and plants greenery!
          </p>
        </div>

        {/* Slider Card */}
        <div className="max-w-3xl mx-auto bg-[#faf9f5] border border-[#e8e6da] rounded-3xl p-6 sm:p-10 space-y-8 shadow-inner">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-extrabold text-[#0f231c]">
              <span>Annual Pencils Used:</span>
              <span className="bg-[#1b4332] text-white text-base font-black px-4 py-1.5 rounded-full shadow-md">
                {pencilCount} Pencils / Year
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={pencilCount}
              onChange={(e) => setPencilCount(parseInt(e.target.value, 10))}
              className="w-full h-3 bg-[#e8e6da] rounded-lg appearance-none cursor-pointer accent-[#1b4332]"
            />

            <div className="flex justify-between text-[11px] font-bold text-[#6c8075]">
              <span>5 Pencils (Individual)</span>
              <span>100 Pencils (Classroom)</span>
              <span>500 Pencils (Corporate Office)</span>
            </div>
          </div>

          {/* Dynamic Metrics Result Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            
            <div className="bg-white border border-[#e8e6da] rounded-2xl p-5 text-center space-y-1 shadow-sm hover:scale-105 transition-transform">
              <Trees className="w-6 h-6 text-[#2d6a4f] mx-auto" />
              <span className="text-2xl font-black text-[#0f231c] block">{treesSaved}</span>
              <span className="text-[11px] font-bold text-[#4a5e55]">Trees Preserved 🌲</span>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-2xl p-5 text-center space-y-1 shadow-sm hover:scale-105 transition-transform">
              <Droplets className="w-6 h-6 text-teal-600 mx-auto" />
              <span className="text-2xl font-black text-[#0f231c] block">{waterSaved} L</span>
              <span className="text-[11px] font-bold text-[#4a5e55]">Water Conserved 💧</span>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-2xl p-5 text-center space-y-1 shadow-sm hover:scale-105 transition-transform">
              <Wind className="w-6 h-6 text-emerald-600 mx-auto" />
              <span className="text-2xl font-black text-[#0f231c] block">{carbonSaved} kg</span>
              <span className="text-[11px] font-bold text-[#4a5e55]">CO₂ Offset 🍃</span>
            </div>

            <div className="bg-white border border-[#e8e6da] rounded-2xl p-5 text-center space-y-1 shadow-sm hover:scale-105 transition-transform">
              <Flower2 className="w-6 h-6 text-amber-500 mx-auto" />
              <span className="text-2xl font-black text-[#0f231c] block">{plantsGrown}</span>
              <span className="text-[11px] font-bold text-[#4a5e55]">New Plants Sprouted 🌻</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
