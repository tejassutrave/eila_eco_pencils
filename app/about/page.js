'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, Users, Award, Sparkles, Star, Camera, Heart, Sprout, ArrowRight, X, Briefcase, Trophy, Calendar } from 'lucide-react';

export default function AboutPage() {
  const [showFullStory, setShowFullStory] = useState(false);
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
          <span>Our Story & Mission | Bilva Enterprise</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f231c] leading-tight">
          Bilva Enterprise & Eila Eco Products
        </h1>
        <p className="text-base text-[#3b5247] leading-relaxed">
          Based in Dharwad, Karnataka, Bilva Enterprise is a women-led, eco-conscious initiative behind the brand <strong>Eila Eco Products</strong>. We transform waste newspaper and paper scraps into useful, high-quality, and completely sustainable stationery items.
        </p>

        {/* Sanskrit Eila Name Callout */}
        <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-2xl p-5 max-w-2xl text-center space-y-2 shadow-sm mt-4">
          <span className="text-[10px] font-black text-[#2d6a4f] uppercase tracking-widest block">Eila... What does it mean?</span>
          <p className="text-sm font-semibold text-[#0f231c]">
            The meaning of <span className="font-extrabold text-[#1b4332]">Eila</span> in Sanskrit is <span className="font-black italic">"The Earth"</span> (इला).
          </p>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Our Eila brand focuses on living a life with more natural, biological products. We don't need to damage or destroy the environment to live a healthy, happy, and sustained life.
          </p>
        </div>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-4 text-[#3b5247] text-sm leading-relaxed">
          <h2 className="text-3xl font-extrabold text-[#0f231c]">Empowering Women — Empowering Nation</h2>
          <p>
            Our core mission is to reduce local waste, protect the environment, and create sustainable, dignified livelihoods for local women artisans. We believe in creating wealth from waste to build a truly circular economy.
          </p>
          <p className="italic text-[#1b4332] font-semibold border-l-4 border-[#52b788] pl-4 my-2">
            "We are here to lead society in different aspects of products that will never harm nature."
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 bg-white border border-[#e8e6da] rounded-3xl space-y-2 shadow-sm">
              <h4 className="font-extrabold text-[#0f231c] flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#2d6a4f]" /> Why Choose Eila?
              </h4>
              <ul className="text-xs text-[#4a5e55] space-y-2.5 list-disc pl-5">
                <li><strong>Made from Recycled Waste:</strong> Handcrafted completely from old upcycled newspapers and scrap paper.</li>
                <li><strong>Eco-Friendly & Biodegradable:</strong> Designed to naturally return to the Earth without leaving a trace of waste.</li>
                <li><strong>Zero-Waste Production:</strong> Highly efficient local manufacturing process ensuring zero trash landfills.</li>
                <li><strong>Empowerment:</strong> Creating active fair-wage jobs and financial independence for local women.</li>
                <li><strong>Ideal for Gifting & Branding:</strong> Premium customizable supplies perfect for schools, corporates, and events.</li>
              </ul>
            </div>

            <div className="p-5 bg-white border border-[#e8e6da] rounded-3xl space-y-2 shadow-sm">
              <h4 className="font-extrabold text-[#0f231c] flex items-center gap-2 text-[#2d6a4f]">
                <Sparkles className="w-4 h-4 text-amber-500" /> Vision & Mission
              </h4>
              <ul className="text-xs text-[#4a5e55] space-y-3.5 list-none pl-1 pt-1">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 shrink-0 mt-0.5">🌿</span>
                  <span><strong>Save & Serve:</strong> We produce all eco-friendly products to save and serve nature.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 shrink-0 mt-0.5">🌱</span>
                  <span><strong>A Step Forward:</strong> "A step to save Nature, We are in the way to serve for our nature."</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 shrink-0 mt-0.5">♻️</span>
                  <span><strong>Wealth from Waste:</strong> Wealth from waste in the form of high-quality products.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#e8e6da] shadow-xl bg-[#faf9f5]">
          <img
            src="/hero_women_making_pencils.jpg"
            alt="Eila Eco Pencils Women Crafting"
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
          <h3 className="font-extrabold text-lg text-[#0f231c]">Wealth from Waste</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Eliminating plastic and wood in stationery. We turn discarded local newspapers into clean, high-performance writing tools.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-7 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">Women-Led Growth</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Supporting rural and local women artisans with skills training, fair employment, and safe communal workplaces.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-7 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#52b788] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">Custom Branding</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Offering custom logo printing on pens, pencils, carry bags, and boxed sets for schools, colleges, and corporate programs.
          </p>
        </div>

      </div>

      {/* Social Impact Initiatives */}
      <section className="space-y-8 border-t border-[#e8e6da] pt-16">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="bg-[#e8f5e9] text-[#1b4332] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-[#b7e4c7]">
            <Heart className="w-3.5 h-3.5 text-red-500" /> Community Upliftment
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f231c]">Social Impact Initiatives</h2>
          <p className="text-xs text-[#4a5e55]">We believe everyone can make a difference by taking small steps to become more ecologically aware.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl">🌳</span>
            <h4 className="font-extrabold text-[#0f231c] text-xs">Deforestation Prevention</h4>
            <p className="text-[11px] text-[#4a5e55] leading-relaxed">
              We have directly saved hundreds of mature trees from deforestation by swapping traditional wood barrels with upcycled newspaper waste.
            </p>
          </div>

          <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl">🏫</span>
            <h4 className="font-extrabold text-[#0f231c] text-xs">Educational Outreach</h4>
            <p className="text-[11px] text-[#4a5e55] leading-relaxed">
              Visited various schools & colleges to spread zero-waste awareness, delivering talks, webinars, and joining podcast panels.
            </p>
          </div>

          <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl">🎁</span>
            <h4 className="font-extrabold text-[#0f231c] text-xs">Community Giving</h4>
            <p className="text-[11px] text-[#4a5e55] leading-relaxed">
              Distributed free Eila Eco Product samples to schools and non-profit organizations to help inspire eco-friendly daily routines.
            </p>
          </div>

          <div className="bg-[#faf9f5] border border-[#e8e6da] rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl">👩</span>
            <h4 className="font-extrabold text-[#0f231c] text-xs">Women Empowerment</h4>
            <p className="text-[11px] text-[#4a5e55] leading-relaxed">
              Employed local women artisans to craft Eila products, helping them support their homes financially and joyfully.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Founder */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-[#e8e6da] pt-16">
        
        {/* Photo Container */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#e8e6da] shadow-xl bg-[#faf9f5]">
            <img
              src="/hero_founder.png"
              alt="Mrs. Aparna Pujari, Founder of Eila Eco Products"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay tag */}
            <div className="absolute bottom-4 inset-x-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e8e6da] text-center">
              <h4 className="font-extrabold text-sm text-[#0f231c]">Mrs. Aparna Pujari</h4>
              <span className="text-[10px] font-bold text-[#2d6a4f] uppercase tracking-wider block">Founder & Managing Director</span>
            </div>
          </div>
        </div>

        {/* Text Details & Timeline Overview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="bg-[#e8f5e9] text-[#1b4332] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 border border-[#b7e4c7]">
              <Award className="w-3.5 h-3.5 text-amber-500" /> Leadership & Vision
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f231c]">Meet Our Founder</h2>
          </div>

          <p className="text-sm text-[#3b5247] leading-relaxed font-medium">
            In honour of her exemplary leadership in sustainable entrepreneurship, environmental conservation, and rural women empowerment, Mrs. Aparna Pujari, Founder of Eila, is celebrated for her transformative contribution to society.
          </p>

          <p className="text-xs text-[#4a5e55] leading-relaxed">
            As a first-generation entrepreneur, she has built a pioneering eco-friendly enterprise grounded in the principles of circular economy and zero waste. Through Eila, she has empowered rural women with stable livelihoods, proving that sustainability and social upliftment go hand in hand.
          </p>

          {/* Quick Timeline Icons */}
          <div className="grid grid-cols-2 gap-4 bg-[#faf9f5] border border-[#e8e6da] p-5 rounded-3xl text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#0f231c] block">Why She Started</span>
                <span className="text-[10px] text-[#4a5e55]">Combat newspaper waste & deforestation.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#0f231c] block">Women Empowerment</span>
                <span className="text-[10px] text-[#4a5e55]">Training rural artisans with fair wages.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setShowFullStory(true)}
              className="px-6 py-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs rounded-full shadow-md transition-all hover:translate-x-0.5 inline-flex items-center gap-1.5"
            >
              Read Full Story & Awards <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

      {/* Full Story Modal */}
      {showFullStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-[#e8e6da] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#faf9f5] border-b border-[#e8e6da] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1b4332] text-[#74c69d] flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-[#0f231c] uppercase tracking-wide">The Eila Story</h3>
                  <span className="text-[10px] text-[#4a5e55]">Founder Mrs. Aparna Pujari's Journey</span>
                </div>
              </div>
              <button
                onClick={() => setShowFullStory(false)}
                className="p-1.5 hover:bg-[#e8e6da] rounded-xl text-[#4a5e55] hover:text-[#0f231c] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs text-[#3b5247] leading-relaxed">
              
              {/* Introduction Story */}
              <div className="space-y-4">
                <h4 className="text-lg font-black text-[#0f231c] border-b border-[#e8e6da] pb-1">Our Leadership & Vision</h4>
                <p>
                  Mrs. Aparna Pujari, a first-generation entrepreneur, built Eila on the foundation of circular economy principles. Grounded in a zero-waste philosophy, her initiative addresses the massive environmental footprint of standard wooden pencil manufacturing (which contributes to deforestation) and municipal paper waste. By upcycling newspapers into clean writing products and embedding organic seeds, Eila offers a lifecycle model that replenishes the Earth rather than polluting it.
                </p>
                <p>
                  Under her guidance, Bilva Enterprise has become a beacon of rural women’s leadership in Dharwad. She has successfully combined eco-logical action with direct financial empowerment, creating a secure collective where rural women are trained in craftwork and earn sustainable, fair livelihoods.
                </p>
              </div>

              {/* Chronological Timeline */}
              <div className="space-y-6">
                <h4 className="text-lg font-black text-[#0f231c] border-b border-[#e8e6da] pb-1 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#2d6a4f]" /> The Chronological Journey
                </h4>
                
                <div className="space-y-6 pl-4 border-l-2 border-[#b7e4c7] relative">
                  
                  {/* Timeline Step 1 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#1b4332] border-4 border-white shadow-sm" />
                    <strong className="text-xs font-black text-[#0f231c] uppercase tracking-wide block">1. The Core Motivation & Problem</strong>
                    <p className="text-[11px] text-[#4a5e55]">
                      Observing the massive piles of waste newspaper in Dharwad and recognizing the ecological impact of harvesting virgin wood for commercial pencil bodies, Aparna decided to develop a zero-tree writing tool.
                    </p>
                  </div>

                  {/* Timeline Step 2 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#52b788] border-4 border-white shadow-sm" />
                    <strong className="text-xs font-black text-[#0f231c] uppercase tracking-wide block">2. Three Months of R&D Research</strong>
                    <p className="text-[11px] text-[#4a5e55]">
                      With no prior manufacturing base, she dedicated three months to intensive manual research, experimentation with organic adhesives, rolling tension, and moisture-controlled curing to design a sturdy paper-roll pencil.
                    </p>
                  </div>

                  {/* Timeline Step 3 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#74c69d] border-4 border-white shadow-sm" />
                    <strong className="text-xs font-black text-[#0f231c] uppercase tracking-wide block">3. First Successful Pencil Breakthrough</strong>
                    <p className="text-[11px] text-[#4a5e55]">
                      Developed the first clean, highly sturdy, hand-rolled newspaper pencil that sharpened smoothly, did not snap, and featured a dark graphite core. This success validated the prototype for commercial production.
                    </p>
                  </div>

                  {/* Timeline Step 4 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#95d5b2] border-4 border-white shadow-sm" />
                    <strong className="text-xs font-black text-[#0f231c] uppercase tracking-wide block">4. Rural Women Artisan Training</strong>
                    <p className="text-[11px] text-[#4a5e55]">
                      Established a training framework to teach local and rural women from the Dharwad region the skill of pencil crafting. This created an active, secure workplace helping women attain financial self-reliance.
                    </p>
                  </div>

                  {/* Timeline Step 5 */}
                  <div className="relative space-y-1.5">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#b7e4c7] border-4 border-white shadow-sm" />
                    <strong className="text-xs font-black text-[#0f231c] uppercase tracking-wide block">5. Startup Launch & Expansion</strong>
                    <p className="text-[11px] text-[#4a5e55]">
                      Bilva Enterprise officially launched the brand <strong>Eila Eco Products</strong>. Over the years, the catalog expanded from pencils to plantable pens, seed paper cards, and grease-resistant food-packaging pouches.
                    </p>
                  </div>

                </div>
              </div>

              {/* Honors & Awards List */}
              <div className="space-y-6">
                <h4 className="text-lg font-black text-[#0f231c] border-b border-[#e8e6da] pb-1 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" /> Prestigious Awards & Recognition
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Fox Story India 50 Inspiring Women", desc: "Honoured as one of the 50 Inspiring Women of India for exceptional leadership in green startup initiatives." },
                    { title: "India Trade Award", desc: "Recipient of the esteemed national award celebrating trade excellence, innovation, and sustainable practices." },
                    { title: "Felicitation by Padma Shri Awardees", desc: "Felicitation alongside environmental icon Padma Shri Tulasi Gowda and legendary artist Padma Shri Jogati Manjamma." },
                    { title: "Save the Environment Award (CSIR/Delhi)", desc: "Presented at the International Conference EWASH in collaboration with Hindu College Delhi, CSIR, and RSE London." },
                    { title: "Kamala Power Women Award", desc: "Presented by Smt. Meenakshi Lekhi in New Delhi, representing the state of Karnataka on a national platform." },
                    { title: "Vocational Excellence Award", desc: "Honored by the Rotary Club of Dharwad Central and Rotary Club of Hubli Midtown for social development." },
                    { title: "Women Leadership Award (BCIC)", desc: "Conferred by the Bangalore Chamber of Industry and Commerce in recognition of impact on local communities." },
                    { title: "Indian Bank Amrit Mahotsav Honor", desc: "Recognized during Azadi Ka Amrit Mahotsav for outstanding startup contribution and rural employment generation." },
                    { title: "FKCCI Entrepreneurship Award", desc: "Honoured by the Federation of Karnataka Chambers of Commerce and Industry on International Women’s Entrepreneurship Day." },
                    { title: "CII appreciation (Waste to Worth)", desc: "Recognized by the Confederation of Indian Industry (CII) at the 8th International Conference on Waste to Worth." },
                    { title: "Probus Club Honorary Award 2025", desc: "Felicitated on 26th November 2025 by Probus Club for outstanding achievements in sustainability and rural upliftment." }
                  ].map((award, idx) => (
                    <div key={idx} className="bg-[#faf9f5] border border-[#e8e6da] p-4 rounded-2xl flex gap-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-[#0f231c] block text-xs mb-1 leading-snug">{award.title}</strong>
                        <p className="text-[10px] text-[#4a5e55] leading-relaxed">{award.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* National Advocacy & Institutional Collaboration */}
              <div className="space-y-4">
                <h4 className="text-lg font-black text-[#0f231c] border-b border-[#e8e6da] pb-1">Advocacy & National Coverage</h4>
                <p>
                  Aparna Pujari’s impactful journey has been covered widely across influential channels, including <strong>Red FM 93.5</strong>, <strong>104.8 FM Mumbai</strong>, Spotify podcasts, and popular YouTube channels. Her startup model has been adopted by MBA students at national management forums, featured at the <strong>National Science Congress</strong>, and acknowledged by the <strong>Karnataka Rajya Vijnana Parishat</strong>.
                </p>
                <p>
                  Appreciated by the Chief Justice and Justices of the High Court of Karnataka, her mission continues to expand through signed memorandums of understanding (MoUs) with leading educational institutes and close collaborations with several NGOs to foster environmental consciousness.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#faf9f5] border-t border-[#e8e6da] flex justify-end shrink-0">
              <button
                onClick={() => setShowFullStory(false)}
                className="px-5 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-xs rounded-full shadow-sm"
              >
                Close Story
              </button>
            </div>

          </div>
        </div>
      )}

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
