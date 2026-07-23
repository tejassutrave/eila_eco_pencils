'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Users, Award, Sparkles, Star, Camera, Heart, Sprout, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const customerStories = [
    {
      id: 1,
      name: 'Ananya Sharma',
      location: 'Bengaluru, KA',
      plantType: 'Organic Tomato 🍅',
      daysToSprout: '12 Days',
      review: 'Planted the tomato seed pencil end after finishing my final exams. Within 2 weeks I had a healthy green sprout on my balcony garden!',
      stars: 5
    },
    {
      id: 2,
      name: 'Rohan Deshmukh',
      location: 'Pune, MH',
      plantType: 'Golden Sunflower 🌻',
      daysToSprout: '10 Days',
      review: 'My 8-year-old daughter was super excited to water her pencil stub every morning. Now we have a beautiful blooming sunflower!',
      stars: 5
    },
    {
      id: 3,
      name: 'Meera Nair',
      location: 'Kochi, KL',
      plantType: 'Sweet Basil 🌿',
      daysToSprout: '8 Days',
      review: 'The basil seeds sprouted so fast! I use fresh basil leaves from my Eila pencil plant in homemade pasta sauce.',
      stars: 5
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6 flex flex-col items-center">
        <img
          src="/logo_transparent.png"
          alt="Eila Eco Pencils Brand Logo"
          className="w-32 h-auto object-contain mb-2"
        />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold border border-[#b7e4c7]">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f231c] leading-tight">
          Reimagining Everyday Stationery for a Greener Tomorrow
        </h1>
        <p className="text-base text-[#3b5247] leading-relaxed">
          Founded with a passion for environmental conservation, Eila Eco Pencils is dedicated to eliminating wood waste in stationery while inspiring eco-conscious living across India.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-4 text-[#3b5247] text-sm leading-relaxed">
          <h2 className="text-3xl font-extrabold text-[#0f231c]">Why Eila Eco Pencils?</h2>
          <p>
            Millions of students and professionals use pencils every single day. Traditional wooden pencils require felling millions of trees annually, damaging delicate ecosystems and accelerating climate change.
          </p>
          <p>
            We set out to create a better alternative: a pencil that performs impeccably, saves trees by utilizing recycled newspaper waste, and leaves behind a living plant instead of trash!
          </p>
          <div className="p-5 bg-white border border-[#e8e6da] rounded-3xl space-y-2 shadow-sm">
            <h4 className="font-extrabold text-[#0f231c] flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#2d6a4f]" /> Our Promise
            </h4>
            <p className="text-xs text-[#4a5e55]">
              Zero trees cut, 100% biodegradable materials, and non-GMO plant seeds guaranteed to sprout under proper soil and sunlight conditions.
            </p>
          </div>
        </div>

        <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-[#e8e6da] shadow-xl bg-[#faf9f5]">
          <img
            src="/hero_seed_pencils.png"
            alt="Eila Eco Pencils Crafting"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-7 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">Tree-Free Innovation</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Utilizing patented rolling technology to turn recycled paper layers into graphite-tight, easy-to-sharpen pencil barrels.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-7 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">Social Empowerment</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Providing sustainable livelihoods, fair wages, and safe working conditions for local artisan communities.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-7 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#52b788] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">Uncompromised Quality</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Dark 2B graphite lead that writes smoothly without breaking easily or causing paper smudges.
          </p>
        </div>

      </div>

      {/* CUSTOMER GROWING STORIES & COMMUNITY PLANT GALLERY */}
      <section className="space-y-10 border-t border-[#e8e6da] pt-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-[#1b4332] text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-md">
            <Camera className="w-3.5 h-3.5 text-amber-300" /> Customer Plant Growth Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f231c] tracking-tight">
            Real Plants Grown By Our Buyers 🌻
          </h2>
          <p className="text-sm text-[#4a5e55]">
            Check out real photos and plant germination success stories shared by our eco-conscious buyers across India!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customerStories.map((story) => (
            <div key={story.id} className="bg-white border border-[#e8e6da] rounded-3xl p-6 space-y-4 shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-[#e8f5e9] text-[#1b4332] text-xs font-extrabold px-3 py-1 rounded-full border border-[#b7e4c7]">
                    {story.plantType}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(story.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#3b5247] italic leading-relaxed">
                  "{story.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0efe6] flex items-center justify-between text-xs">
                <div>
                  <strong className="block text-[#0f231c] font-extrabold">{story.name}</strong>
                  <span className="text-[#4a5e55] text-[11px]">{story.location}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Sprouted in {story.daysToSprout}
                </span>
              </div>

            </div>
          ))}
        </div>

        <div className="p-8 bg-[#faf9f5] border border-[#e8e6da] rounded-3xl text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <h4 className="font-extrabold text-[#0f231c] text-lg flex items-center justify-center gap-2">
            <Sprout className="w-5 h-5 text-[#2d6a4f]" /> Have a Sprouted Plant Photo?
          </h4>
          <p className="text-xs text-[#4a5e55]">
            Share your pencil plant photos on Instagram tagging <strong>@EilaEcoPencils</strong> or email us to feature on our official community gallery & win a free seed combo box!
          </p>
        </div>

      </section>

    </div>
  );
}
