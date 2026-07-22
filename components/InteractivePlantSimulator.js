'use client';

import React, { useState } from 'react';
import { Droplets, Sun, Sprout, Sparkles, Heart, RefreshCw, CheckCircle2, Trophy, Leaf } from 'lucide-react';

const SEED_TYPES = [
  { id: 'tomato', name: 'Organic Tomato', icon: '🍅', color: 'from-red-500 to-amber-500', days: 28, yield: 'Juicy Red Tomatoes' },
  { id: 'sunflower', name: 'Golden Sunflower', icon: '🌻', color: 'from-amber-400 to-yellow-600', days: 21, yield: 'Bright Blooming Sunflowers' },
  { id: 'basil', name: 'Sweet Basil', icon: '🌿', color: 'from-emerald-500 to-teal-700', days: 14, yield: 'Fresh Culinary Herbs' },
  { id: 'marigold', name: 'French Marigold', icon: '🌼', color: 'from-orange-400 to-amber-600', days: 25, yield: 'Vibrant Floral Garden' },
  { id: 'chilli', name: 'Green Chilli', icon: '🌶️', color: 'from-green-600 to-emerald-800', days: 30, yield: 'Spicy Green Chillies' }
];

export default function InteractivePlantSimulator() {
  const [selectedSeed, setSelectedSeed] = useState(SEED_TYPES[0]);
  const [growthStage, setGrowthStage] = useState(1); // 1: Soil Pencil, 2: Seed Sprout, 3: Growing Plant, 4: Full Bloom
  const [waterCount, setWaterCount] = useState(0);
  const [sunlight, setSunlight] = useState(false);

  const handleWaterPlant = () => {
    setWaterCount((prev) => prev + 1);
    if (growthStage < 4) {
      setGrowthStage((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setGrowthStage(1);
    setWaterCount(0);
    setSunlight(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#faf9f5] via-[#e8f5e9]/40 to-[#faf9f5] relative overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#74c69d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#52b788]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="bg-[#1b4332] text-white text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" /> Interactive Plant Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f231c] tracking-tight">
            See How Your Pencil Turns Into A Plant! 🌱
          </h2>
          <p className="text-sm text-[#4a5e55]">
            Select a seed variety below, water your pencil, and watch the biodegradable seed capsule sprout into a living plant in real-time!
          </p>
        </div>

        {/* Interactive Seed Selection Bar */}
        <div className="flex flex-wrap justify-center gap-3">
          {SEED_TYPES.map((seed) => (
            <button
              key={seed.id}
              onClick={() => { setSelectedSeed(seed); handleReset(); }}
              className={`px-5 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2.5 transition-all transform hover:scale-105 shadow-sm ${
                selectedSeed.id === seed.id
                  ? 'bg-[#1b4332] text-white ring-4 ring-[#52b788]/30 shadow-lg'
                  : 'bg-white text-[#1b4332] border border-[#e8e6da] hover:bg-[#f0efe6]'
              }`}
            >
              <span className="text-lg">{seed.icon}</span>
              <span>{seed.name}</span>
            </button>
          ))}
        </div>

        {/* Simulation Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Visual Stage Display Box */}
          <div className="lg:col-span-7 relative min-h-[360px] bg-gradient-to-b from-[#e8f5e9] to-[#d8f3dc]/60 rounded-3xl border border-[#b7e4c7] flex flex-col items-center justify-between p-8 overflow-hidden">
            
            {/* Top Badge Info */}
            <div className="w-full flex justify-between items-center z-10">
              <span className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black text-[#1b4332] border border-[#b7e4c7] shadow-sm flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#52b788]" /> {selectedSeed.name} Seed Capsule
              </span>
              <button
                onClick={handleReset}
                className="p-2 bg-white/80 hover:bg-white text-[#1b4332] rounded-full transition-colors shadow-sm"
                title="Restart Plant Simulation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Central Animated Visuals for Each Growth Stage */}
            <div className="my-auto text-center space-y-4 z-10 transition-all duration-500">
              
              {growthStage === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="w-24 h-48 mx-auto relative flex items-center justify-center">
                    {/* Pencil stuck in soil visual */}
                    <div className="w-6 h-36 bg-gradient-to-b from-amber-800 via-amber-700 to-emerald-600 rounded-t-full shadow-lg border border-amber-900 flex flex-col justify-between items-center py-2">
                      <span className="text-[10px] font-bold text-white uppercase rotate-90 tracking-widest opacity-75">EILA HB</span>
                      <div className="w-4 h-4 rounded-full bg-emerald-400 border border-emerald-200 animate-pulse shadow-sm" title="Seed Capsule" />
                    </div>
                  </div>
                  <span className="inline-block bg-white/80 text-[#0f231c] text-xs font-extrabold px-4 py-1.5 rounded-full border border-[#e8e6da]">
                    Stage 1: Pencil Planted Upside Down in Soil 🪴
                  </span>
                </div>
              )}

              {growthStage === 2 && (
                <div className="space-y-4 animate-bounce">
                  <div className="text-6xl my-4">🌱</div>
                  <span className="inline-block bg-white/80 text-[#0f231c] text-xs font-extrabold px-4 py-1.5 rounded-full border border-[#e8e6da]">
                    Stage 2: Capsule Dissolves & Seed Sprouts! (Day 5)
                  </span>
                </div>
              )}

              {growthStage === 3 && (
                <div className="space-y-4 animate-pulse">
                  <div className="text-7xl my-4">🌿</div>
                  <span className="inline-block bg-white/80 text-[#0f231c] text-xs font-extrabold px-4 py-1.5 rounded-full border border-[#e8e6da]">
                    Stage 3: Stem & Leaves Growing Strong! (Day 14)
                  </span>
                </div>
              )}

              {growthStage === 4 && (
                <div className="space-y-4 animate-bounce">
                  <div className="text-8xl my-2">{selectedSeed.icon}</div>
                  <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-[#52b788] shadow-lg space-y-1">
                    <span className="text-sm font-black text-[#1b4332] block flex items-center justify-center gap-1">
                      <Trophy className="w-4 h-4 text-amber-500" /> Full Bloom Achieved! (Day {selectedSeed.days})
                    </span>
                    <span className="text-xs font-bold text-[#2d6a4f]">{selectedSeed.yield}</span>
                  </div>
                </div>
              )}

            </div>

            {/* Soil Base Visual */}
            <div className="w-full h-12 bg-amber-950/80 rounded-2xl border-t-4 border-amber-800 flex items-center justify-center text-[11px] font-bold text-amber-200 gap-2">
              <span>🪱 Rich Bio-Organic Soil</span>
              <span>•</span>
              <span>Water Status: {waterCount > 0 ? '💧 Moist & Nourished' : '🏜️ Needs Water'}</span>
            </div>

          </div>

          {/* Controls & Nurture Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-[#2d6a4f] tracking-widest">Interactive Nurture Controls</span>
              <h3 className="text-2xl font-extrabold text-[#0f231c]">
                Nurture Your Plant To Bloom!
              </h3>
              <p className="text-xs text-[#4a5e55]">
                Tap the water droplets button below to give your seed pencil water and sunlight to speed up its growth cycle.
              </p>
            </div>

            {/* Growth Progress Slider / Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#0f231c]">
                <span>Growth Progress</span>
                <span className="text-[#1b4332] font-black">{growthStage * 25}%</span>
              </div>
              <div className="w-full h-3 bg-[#faf9f5] border border-[#e8e6da] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#52b788] to-[#1b4332] rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${growthStage * 25}%` }}
                />
              </div>
            </div>

            {/* Action Interactive Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleWaterPlant}
                className="py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#1b4332]/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Droplets className="w-4 h-4 text-[#74c69d] animate-bounce" /> Water Plant ({waterCount})
              </button>

              <button
                onClick={() => setSunlight(!sunlight)}
                className={`py-4 font-extrabold text-xs rounded-2xl border transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm ${
                  sunlight
                    ? 'bg-amber-400 text-[#0f231c] border-amber-500 shadow-amber-300/50'
                    : 'bg-[#faf9f5] text-[#1b4332] border-[#e8e6da] hover:bg-[#f0efe6]'
                }`}
              >
                <Sun className={`w-4 h-4 ${sunlight ? 'text-amber-900 animate-spin' : 'text-amber-500'}`} />
                {sunlight ? 'Sunlight Active ☀️' : 'Add Sunlight 🌤️'}
              </button>
            </div>

            <div className="p-4 bg-[#e8f5e9] rounded-2xl border border-[#b7e4c7] text-xs text-[#1b4332] space-y-1">
              <div className="flex items-center gap-2 font-black">
                <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" /> 100% Biodegradable & Organic
              </div>
              <p className="text-[11px] leading-relaxed text-[#2d4036]">
                Eila seed pencils use zero lead or toxic chemicals. The seed capsule dissolves within 48 hours of contact with moist soil!
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
