'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Sprout, Sparkles, Send, ArrowRight, HelpCircle, Droplets } from 'lucide-react';

const ECO_FAQ_RESPONSES = [
  {
    id: 1,
    q: '🌱 How do I plant my seed pencil?',
    a: 'Use your pencil until it becomes short to write with. Push the green seed capsule end upside down into a pot of moist soil at a 45° angle. Water daily and place under indirect sunlight!'
  },
  {
    id: 2,
    q: '💧 How often should I water the soil?',
    a: 'Water lightly once a day so the soil stays moist (not soggy). The biodegradable seed capsule will dissolve within 48 hours, and roots will sprout in 5-10 days!'
  },
  {
    id: 3,
    q: '🚚 How do I track my active order?',
    a: 'Sign in to your account and click "Track Order" in the top menu to view your live courier dispatch timeline & Delhivery AWB number!',
    link: '/track-order',
    linkText: 'Go to Order Tracker →'
  },
  {
    id: 4,
    q: '🏢 How do I request a corporate bulk quote?',
    a: 'Visit our Corporate & Bulk page or message us on WhatsApp with your requested pencil quantity and custom logo requirements for instant wholesale quotes!',
    link: '/bulk-orders',
    linkText: 'Request Bulk Quote →'
  }
];

export default function EcoAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2.5 font-extrabold text-xs border border-[#74c69d]/40 group"
          aria-label="Open Eco Assistant"
          suppressHydrationWarning
        >
          <div className="w-8 h-8 rounded-full bg-[#52b788] text-[#0f231c] flex items-center justify-center font-bold shrink-0">
            <Sprout className="w-4 h-4 animate-bounce" />
          </div>
          <span className="hidden sm:inline">Ask Eco Assistant</span>
          <span className="bg-amber-400 text-[#0f231c] text-[10px] font-black px-2 py-0.5 rounded-full">
            Help
          </span>
        </button>
      )}

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white text-[#1a2e26] rounded-3xl shadow-2xl border border-[#e8e6da] overflow-hidden flex flex-col z-50 animate-fadeIn">
          
          {/* Header */}
          <div className="bg-[#1b4332] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#52b788] text-[#0f231c] flex items-center justify-center font-black">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Eco Care Assistant</h4>
                <p className="text-[10px] text-[#74c69d] font-bold">Planting Advice & Order Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#a3b18a] hover:text-white hover:bg-[#2d6a4f] rounded-full transition-colors"
              suppressHydrationWarning
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content Body */}
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto text-xs bg-[#faf9f5]">
            
            <div className="bg-white p-3.5 rounded-2xl border border-[#e8e6da] space-y-1 shadow-sm">
              <span className="font-bold text-[#1b4332] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Welcome to Eila Eco Support!
              </span>
              <p className="text-[#4a5e55] leading-relaxed">
                How can we assist your green journey today? Select a topic below for instant answers:
              </p>
            </div>

            {/* Quick Answer Buttons */}
            <div className="space-y-2">
              {ECO_FAQ_RESPONSES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedFaq(item)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedFaq?.id === item.id
                      ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
                      : 'bg-white text-[#2d4036] border-[#e8e6da] hover:bg-[#f0efe6]'
                  }`}
                  suppressHydrationWarning
                >
                  {item.q}
                </button>
              ))}
            </div>

            {/* Selected Response Answer Box */}
            {selectedFaq && (
              <div className="p-4 bg-[#e8f5e9] border border-[#b7e4c7] rounded-2xl space-y-2 animate-fadeIn text-[#1b4332]">
                <strong className="block font-black text-[#0f231c]">{selectedFaq.q}</strong>
                <p className="leading-relaxed text-[11px]">{selectedFaq.a}</p>
                {selectedFaq.link && (
                  <Link
                    href={selectedFaq.link}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 font-black text-xs text-[#2d6a4f] hover:underline pt-1"
                  >
                    {selectedFaq.linkText}
                  </Link>
                )}
              </div>
            )}

          </div>

          {/* Footer Contact Direct Action */}
          <div className="p-3 bg-white border-t border-[#e8e6da] flex items-center justify-between text-xs">
            <span className="text-[#4a5e55] text-[11px]">Need custom help?</span>
            <a
              href="https://wa.me/919980004585"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#52b788] hover:bg-[#40916c] text-white font-extrabold rounded-full text-[11px] inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
