'use client';

import React, { useState, useEffect } from 'react';
import { Sprout, Heart, Award, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const CARDS = [
  {
    id: 1,
    tag: 'Visionary Founder',
    title: 'Rooted in Purpose',
    subtitle: 'Pioneering eco-stationery to replace wood with recycled paper across India.',
    image: '/hero_founder.png',
    icon: Sparkles,
    badgeColor: 'bg-[#1b4332] text-amber-300',
  },
  {
    id: 2,
    tag: 'Social Empowerment',
    title: 'Women-Led Craftsmanship',
    subtitle: 'Handcrafted by rural women artisans, creating fair wages & dignified livelihoods.',
    image: '/hero_women_crafting.jpg',
    icon: Heart,
    badgeColor: 'bg-[#2d6a4f] text-[#e8f5e9]',
  },
  {
    id: 3,
    tag: 'Plantable Seeds',
    title: 'Write Today, Plant Tomorrow',
    subtitle: 'Embedded non-GMO seed capsules sprout into fresh herbs, vegetables & flowers.',
    image: '/hero_plant_sprouting.png',
    icon: Sprout,
    badgeColor: 'bg-emerald-700 text-emerald-100',
  },
  {
    id: 4,
    tag: 'Finished Eco Product',
    title: '100% Tree-Free Pencils',
    subtitle: 'Tightly rolled recycled newsprint with dark 2B lead & decorative seed ribbons.',
    image: '/hero_finished_pencils.png',
    icon: Award,
    badgeColor: 'bg-amber-600 text-amber-50',
  },
];

export default function HeroStoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CARDS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CARDS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  const activeCard = CARDS[currentIndex];
  const IconComponent = activeCard.icon;

  return (
    <div
      className="relative bg-white p-4 sm:p-5 rounded-[2.5rem] border border-[#e8e6da] shadow-2xl overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Step Indicator Pill & Controls Header */}
      <div className="flex items-center justify-between px-2 pb-3.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-black text-[#1b4332] text-sm">
            0{currentIndex + 1}
          </span>
          <span className="text-[#a3b18a] font-bold">/ 0{CARDS.length}</span>
        </div>

        {/* Progress Bar Track */}
        <div className="flex-1 mx-4 h-1.5 bg-[#f0efe6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2d6a4f] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentIndex + 1) / CARDS.length) * 100}%` }}
          />
        </div>

        {/* Prev/Next Manual Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full bg-[#faf9f5] hover:bg-[#e8f5e9] text-[#1b4332] border border-[#e8e6da] transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full bg-[#faf9f5] hover:bg-[#e8f5e9] text-[#1b4332] border border-[#e8e6da] transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Container — using inline style for reliable aspect ratio */}
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-md bg-[#1b4332]"
        style={{ paddingBottom: '75%' /* 4:3 aspect ratio via padding hack */ }}
      >
        {CARDS.map((card, index) => (
          <div
            key={card.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={card.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: card.id === 1 ? 'top' : 'center',
              }}
            />

            {/* Subtle Gradient Overlay for Text Readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)',
              }}
            />

            {/* Overlay Story Card Info */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#e8e6da] shadow-xl space-y-1.5 transition-all">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${card.badgeColor}`}>
                  {card.tag}
                </span>
              </div>
              <h5 className="font-extrabold text-[#0f231c] text-sm leading-tight flex items-center gap-1.5">
                <IconComponent className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>{card.title}</span>
              </h5>
              <p className="text-[11px] text-[#3b5247] leading-relaxed">
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Dot Navigators */}
      <div className="flex justify-center items-center gap-2 pt-3">
        {CARDS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-6 bg-[#1b4332]'
                : 'w-2 bg-[#d8f3dc] hover:bg-[#b7e4c7]'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
