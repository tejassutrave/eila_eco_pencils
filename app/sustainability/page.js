'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Sprout, Trees, Recycle, ArrowRight, Users, BookOpen, Eye, ShoppingBag } from 'lucide-react';

export default function SustainabilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold border border-[#b7e4c7]">
          <Leaf className="w-4 h-4 text-[#2d6a4f]" />
          <span>Our Environmental Commitment</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f231c] leading-tight">
          Turning Waste into Greenery
        </h1>
        <p className="text-base text-[#3b5247] leading-relaxed">
          At Eila Eco Products, we believe we don&apos;t need to damage or destroy the environment to live a healthy, happy, and sustained life. We are changing the narrative from consumption to conservation.
        </p>

        {/* Why Us? Deforestation Alert Card */}
        <div className="bg-[#fff3cd] border-l-4 border-amber-500 rounded-2xl p-5 text-left text-xs text-[#664d03] max-w-2xl mx-auto space-y-2 mt-4 shadow-sm">
          <strong className="font-extrabold text-sm block">⚠️ Why Eila? The Cost of Traditional Pencils</strong>
          <p className="leading-relaxed">
            Nearly <strong>82,000 mature trees</strong> are cut down daily to produce the 14 billion traditional wood-based pencils used globally every year. Wooden pencils are a major cause of global deforestation, contributing to climate damage and disturbing vital natural ecosystems.
          </p>
          <p className="font-bold text-[#1b4332]">
            Eila&apos;s response: &quot;Planting the Future&quot; — swapping timber for upcycled waste paper and embedding seed capsules that grow back into greenery!
          </p>
        </div>
      </div>

      {/* Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center mx-auto shadow-inner">
            <Recycle className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-[#0f231c] block">12+ Tons</span>
          <h3 className="font-bold text-[#1b4332] text-xs">Newspaper Repurposed</h3>
          <p className="text-[10px] text-[#4a5e55] leading-relaxed">
            Waste post-consumer newspapers upcycled directly into pencils, bags, and pouches, keeping them out of landfills.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-amber-600 block">2,00,000+</span>
          <h3 className="font-bold text-[#1b4332] text-xs">Eco-Products Sold</h3>
          <p className="text-[10px] text-[#4a5e55] leading-relaxed">
            Green products sold since inception, replacement-proofing everyday routines against traditional plastic/wood stationery.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#52b788] flex items-center justify-center mx-auto shadow-inner">
            <Users className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-[#2d6a4f] block">12+</span>
          <h3 className="font-bold text-[#1b4332] text-xs">Women Empowered</h3>
          <p className="text-[10px] text-[#4a5e55] leading-relaxed">
            Local and rural women trained and employed in crafting Eila supplies, securing active financial self-reliance.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-blue-700 block">50+</span>
          <h3 className="font-bold text-[#1b4332] text-xs">Institutions Reached</h3>
          <p className="text-[10px] text-[#4a5e55] leading-relaxed">
            Schools and colleges reached to promote environmental education and distribute free samples.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-inner">
            <Eye className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-purple-700 block">10,000+</span>
          <h3 className="font-bold text-[#1b4332] text-xs">Citizens Aware</h3>
          <p className="text-[10px] text-[#4a5e55] leading-relaxed">
            Individuals reached directly through environmental campaigns, fairs, roadshows, and webinars.
          </p>
        </div>

      </div>

      {/* Principles */}
      <div className="bg-[#1b4332] text-white rounded-[2.5rem] p-8 sm:p-14 border border-[#2d6a4f] space-y-8 shadow-2xl">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Our Zero-Waste Principles</h2>
          <p className="text-xs text-[#d8f3dc]">How we ensure 100% circular eco-friendly production</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#0f231c]/60 p-6 rounded-2xl border border-[#2d6a4f]/80 space-y-2">
            <span className="text-[#74c69d] font-extrabold text-sm">01. Non-Toxic Dyes</span>
            <p className="text-xs text-[#b7e4c7] leading-relaxed">
              We use organic, non-toxic food-grade dyes to color our newspaper layers, making them 100% safe for children.
            </p>
          </div>

          <div className="bg-[#0f231c]/60 p-6 rounded-2xl border border-[#2d6a4f]/80 space-y-2">
            <span className="text-[#74c69d] font-extrabold text-sm">02. Non-GMO Seeds</span>
            <p className="text-xs text-[#b7e4c7] leading-relaxed">
              Our seed capsules contain high-germination non-GMO organic seeds sourced from certified Indian agricultural cooperatives.
            </p>
          </div>

          <div className="bg-[#0f231c]/60 p-6 rounded-2xl border border-[#2d6a4f]/80 space-y-2">
            <span className="text-[#74c69d] font-extrabold text-sm">03. Plastic-Free Boxes</span>
            <p className="text-xs text-[#b7e4c7] leading-relaxed">
              All retail packaging is made from 100% unbleached recyclable kraft paper without plastic window film.
            </p>
          </div>

          <div className="bg-[#0f231c]/60 p-6 rounded-2xl border border-[#2d6a4f]/80 space-y-2">
            <span className="text-[#74c69d] font-extrabold text-sm">04. Local Empowerment</span>
            <p className="text-xs text-[#b7e4c7] leading-relaxed">
              Our manufacturing unit empowers local rural women artisans through fair wage employment and skill training.
            </p>
          </div>

        </div>

      </div>

      {/* The Mathematics of Recycling */}
      <section className="space-y-8 border-t border-[#e8e6da] pt-16">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="bg-[#e8f5e9] text-[#1b4332] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-[#b7e4c7]">
            🌱 Environmental Benefits
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f231c]">The Mathematics of Recycling</h2>
          <p className="text-xs text-[#4a5e55]">
            &quot;There is a new generational worldwide wave occurring, moving in an environmentally conscious direction... Don&apos;t get left behind.&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-2xl">⚡</span>
            <h4 className="font-extrabold text-[#0f231c] text-xs">4,000 KWh Electricity Saved</h4>
            <p className="text-[11px] text-[#4a5e55] leading-relaxed">
              Recycling just 1 ton of newspaper saves ~4,000 KWh of electricity. This is enough power to support a standard 3-bedroom Indian home for an entire year!
            </p>
          </div>

          <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-2xl">🌲</span>
            <h4 className="font-extrabold text-[#0f231c] text-xs">1 Ton of Wood Preserved</h4>
            <p className="text-[11px] text-[#4a5e55] leading-relaxed">
              Every ton of newspaper upcycled saves approximately 1 ton of raw wood. Upcycling half the world&apos;s paper would protect over 20 million acres of forests.
            </p>
          </div>

          <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-2xl">🗑️</span>
            <h4 className="font-extrabold text-[#0f231c] text-xs">3 Cubic Meters Landfill Void</h4>
            <p className="text-[11px] text-[#4a5e55] leading-relaxed">
              Recycling 1 ton of newspaper intercepts 3 cubic meters of waste from filling up local municipal landfills, reducing disposal logjams.
            </p>
          </div>

          <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-2 shadow-sm md:col-span-3">
            <h4 className="font-extrabold text-[#0f231c] text-xs flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#2d6a4f]" /> Reduced Manufacturing Footprint
            </h4>
            <p className="text-[11px] text-[#4a5e55] leading-relaxed">
              By using post-consumer recycled paper instead of harvesting virgin pulp, we drastically reduce air emissions and wastewater pollution associated with primary chemical pulping. The world&apos;s ecosystem is suffering; Eila provides a simple, daily adjustment to protect environmental health.
            </p>
          </div>
        </div>
      </section>

      {/* Scaling Capacity: Machine Automation & Handcrafted Integrity */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[#e8e6da] pt-16">
        
        {/* Machine Automation roadmap */}
        <div className="lg:col-span-7 bg-white border border-[#e8e6da] rounded-[2rem] p-8 space-y-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">Upcoming Development</span>
            <h3 className="font-extrabold text-lg text-[#0f231c]">Next-Gen Machine Automation Roadmap</h3>
          </div>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            We are currently developing an <strong>automated version of our pencil production machine</strong>. This mechanical innovation is designed to solve operational constraints and scale Eila globally:
          </p>
          <ul className="text-xs text-[#4a5e55] space-y-2.5 list-disc pl-5">
            <li><strong>Scaling Production:</strong> Significantly increases daily manufacturing capacity to meet wholesale corporate demands.</li>
            <li><strong>Reducing Physical Labor:</strong> Automates repetitive manual rolling processes to reduce strain on our women artisans.</li>
            <li><strong>Handcrafted Eco Integrity:</strong> Speeds up the core rolling while maintaining our strict handcrafted checking and 100% tree-free material integrity.</li>
          </ul>
        </div>

        {/* Expanded Product Portfolio */}
        <div className="lg:col-span-5 bg-white border border-[#e8e6da] rounded-[2rem] p-8 space-y-4 shadow-sm">
          <h3 className="font-extrabold text-lg text-[#0f231c] flex items-center gap-2">
            <span>✨</span> Expanded Zero-Waste Crafts
          </h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Eila&apos;s design ecosystem transforms several categories of post-consumer waste into valuable everyday craft items:
          </p>
          <div className="space-y-3 pt-1">
            <div className="flex gap-3 text-xs bg-[#faf9f5] border border-[#e8e6da] p-3 rounded-2xl">
              <span className="text-xl shrink-0">🥥</span>
              <div>
                <strong className="text-[#0f231c] block">Coconut Shell Bowls</strong>
                <span className="text-[10px] text-[#4a5e55]">Polished, food-safe bowls upcycled from discarded coconut shells.</span>
              </div>
            </div>
            <div className="flex gap-3 text-xs bg-[#faf9f5] border border-[#e8e6da] p-3 rounded-2xl">
              <span className="text-xl shrink-0">🧵</span>
              <div>
                <strong className="text-[#0f231c] block">Patchwork Cloth Blankets</strong>
                <span className="text-[10px] text-[#4a5e55]">Comfortable blankets stitched together entirely from local textile scrap pieces.</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      <div className="text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs rounded-full shadow-lg transition-transform hover:scale-105"
        >
          Join the Green Revolution — Shop Now <ArrowRight className="w-4 h-4 text-[#74c69d]" />
        </Link>
      </div>

    </div>
  );
}
