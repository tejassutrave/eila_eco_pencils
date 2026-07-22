'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How do plantable seed pencils work?',
      a: 'Each pencil has a biodegradable seed capsule at the end containing non-GMO organic seeds. When the pencil becomes too short to write with, insert the seed end upside down into a pot of soil, water daily, and give it sunlight. The capsule dissolves and seeds germinate in 5-10 days!'
    },
    {
      q: 'Are these pencils made from wood?',
      a: 'No! 100% of our pencils are tree-free. They are made from upcycled post-consumer newsprint paper rolled tightly around dark graphite lead.'
    },
    {
      q: 'Can these pencils be sharpened using normal sharpeners?',
      a: 'Yes! They sharpen smoothly using any standard pencil sharpener. The paper layers create a rainbow peel effect when sharpened.'
    },
    {
      q: 'What seeds are available?',
      a: 'We include Tomato, Chilli, Basil, Coriander, Marigold, and Sunflower seeds.'
    },
    {
      q: 'What is the shipping cost?',
      a: 'Shipping is FREE across India for orders above ₹499. For orders under ₹499, shipping is ₹49.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h1>
        <p className="text-xs text-emerald-300">Everything you need to know about Eila Eco Pencils</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-emerald-900/40 border border-emerald-800 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" /> {faq.q}
            </h3>
            <p className="text-xs text-emerald-300 pl-6 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
