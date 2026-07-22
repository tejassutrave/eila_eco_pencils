'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How do plantable seed pencils work?',
    a: 'Each pencil has a biodegradable seed capsule at the end containing non-GMO organic seeds. Write and sharpen your pencil like normal. When it becomes too short to write with, insert the seed capsule end upside down into a pot of soil, water daily, and give it sunlight. The capsule dissolves within 48 hours and seeds germinate in 5-10 days!'
  },
  {
    q: 'Are these pencils made from wood?',
    a: 'No! 100% of our pencils are tree-free. They are handcrafted from upcycled post-consumer newsprint paper rolled tightly around dark graphite lead. No trees are cut down to make Eila pencils.'
  },
  {
    q: 'Can these pencils be sharpened using normal sharpeners?',
    a: 'Yes! They sharpen smoothly using any standard pencil sharpener. The recycled paper layers create a beautiful rainbow peel effect when sharpened.'
  },
  {
    q: 'What seed varieties are available in the pencil packs?',
    a: 'Our seed packs contain 5 organic seed varieties: Tomato 🍅, Sweet Basil 🌿, Green Chilli 🌶️, French Marigold 🌼, and Golden Sunflower 🌻.'
  },
  {
    q: 'What is the shipping cost across India?',
    a: 'Shipping is FREE across India on all orders above ₹499. For orders below ₹499, a flat shipping fee of ₹49 applies.'
  },
  {
    q: 'Do you offer custom branding for corporate bulk orders?',
    a: 'Yes! We offer custom logo printing, eco-kraft gift boxes, and bulk discounts for schools, corporate events, and wedding return gifts. Visit our Corporate & Bulk page to request a quote.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5e9] border border-[#b7e4c7] text-[#1b4332] text-xs font-extrabold">
          <HelpCircle className="w-4 h-4 text-[#52b788]" />
          <span>Got Questions? We Have Answers!</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0f231c] tracking-tight">
          Frequently Asked Questions ❓
        </h1>
        <p className="text-sm text-[#4a5e55]">
          Everything you need to know about Eila Eco Pencils, planting instructions, and orders.
        </p>
      </div>

      {/* Interactive FAQ Accordion List */}
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 shadow-sm ${
                isOpen ? 'border-[#52b788] ring-4 ring-[#52b788]/10' : 'border-[#e8e6da] hover:border-[#b7e4c7]'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="font-extrabold text-base text-[#0f231c] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center text-xs font-black shrink-0">
                    Q{idx + 1}
                  </span>
                  {item.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-[#2d6a4f] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#1b4332]' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-[#3b5247] leading-relaxed border-t border-[#f0efe6] mt-1 pt-4 pl-16">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Card */}
      <div className="p-8 bg-[#1b4332] text-white rounded-3xl border border-[#2d6a4f] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-extrabold text-lg text-white">Still Have Questions?</h3>
          <p className="text-xs text-[#d8f3dc]">Our eco team is here to help you via WhatsApp or Email 7 days a week!</p>
        </div>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 bg-[#52b788] hover:bg-[#40916c] text-white font-black text-xs rounded-full inline-flex items-center gap-2 shadow-lg shrink-0 transition-transform hover:scale-105"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp Us Now
        </a>
      </div>

    </div>
  );
}
