'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Building2, GraduationCap, Gift, Sparkles, Award } from 'lucide-react';

export default function BulkOrdersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantityNeeded: '500',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Failed to submit inquiry');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send inquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold border border-[#b7e4c7]">
          <Building2 className="w-4 h-4 text-[#2d6a4f]" />
          <span>Corporate Gifting & Wholesale Supplies</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f231c] leading-tight">
          Custom Seed Pencils for Companies, Schools & Events
        </h1>
        <p className="text-sm sm:text-base text-[#3b5247] leading-relaxed">
          Make an enduring green impression with your brand. Customize our plantable seed pencils with your company logo, event slogan, or school tagline!
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-7 space-y-3 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">Corporate Branding</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Laser engraved or screen printed company logos on plantable pencils and recycled kraft gift boxes for tech expos & annual meets.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-7 space-y-3 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">School & University Kits</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Teach environmental responsibility to students. Bulk student packs with customized school crests and educational seed info cards.
          </p>
        </div>

        <div className="bg-white border border-[#e8e6da] rounded-3xl p-7 space-y-3 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#52b788] flex items-center justify-center">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-[#0f231c]">Wedding Return Favors</h3>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Unique eco-friendly return gifts for wedding guests, eco birthday parties, and green conferences.
          </p>
        </div>

      </div>

      {/* Form & Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-[#0f231c]">Request a Bulk Quote</h2>
            <p className="text-xs text-[#4a5e55]">Our corporate eco team responds within 24 business hours</p>
          </div>

          {submitted ? (
            <div className="p-8 bg-[#e8f5e9] border border-[#b7e4c7] rounded-2xl text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#2d6a4f] mx-auto" />
              <h3 className="text-xl font-extrabold text-[#0f231c]">Enquiry Received!</h3>
              <p className="text-xs text-[#2d6a4f]">
                Thank you for contacting Eila Eco Pencils. We will email you our custom catalog and wholesale price list shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-[#0f231c] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Mehta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0f231c] mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0f231c] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0f231c] mb-1">Company / Institution Name</label>
                  <input
                    type="text"
                    placeholder="Acme Tech Pvt. Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0f231c] mb-1">Estimated Quantity Needed *</label>
                  <select
                    value={formData.quantityNeeded}
                    onChange={(e) => setFormData({ ...formData, quantityNeeded: e.target.value })}
                    className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] font-semibold focus:outline-none focus:border-[#52b788]"
                  >
                    <option value="100">100 - 500 Pencils</option>
                    <option value="500">500 - 1,000 Pencils</option>
                    <option value="2500">2,500 - 5,000 Pencils</option>
                    <option value="10000">10,000+ Pencils (Distributor tier)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f231c] mb-1">Additional Requirements / Custom Branding Notes</label>
                <textarea
                  rows={3}
                  placeholder="Mention seed preferences, logo customization, deadline dates..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-sm rounded-full shadow-xl shadow-[#1b4332]/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Submitting Quote Request...' : 'Submit Bulk Quote Request →'}
              </button>

            </form>
          )}

        </div>

        {/* Pricing Tiers */}
        <div className="lg:col-span-5 bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          <h3 className="font-extrabold text-lg text-[#0f231c]">Wholesale Discount Tiers</h3>

          <div className="space-y-3 text-xs">
            
            <div className="p-4 bg-[#faf9f5] border border-[#e8e6da] rounded-2xl flex justify-between items-center">
              <div>
                <span className="font-bold text-[#0f231c] block">Starter Tier</span>
                <span className="text-[#4a5e55]">100 to 500 Pencils</span>
              </div>
              <span className="font-black text-[#1b4332] text-sm">15% OFF</span>
            </div>

            <div className="p-4 bg-[#faf9f5] border border-[#e8e6da] rounded-2xl flex justify-between items-center">
              <div>
                <span className="font-bold text-[#0f231c] block">Corporate Tier</span>
                <span className="text-[#4a5e55]">500 to 2,500 Pencils</span>
              </div>
              <span className="font-black text-[#1b4332] text-sm">30% OFF</span>
            </div>

            <div className="p-4 bg-[#faf9f5] border border-[#e8e6da] rounded-2xl flex justify-between items-center">
              <div>
                <span className="font-bold text-[#0f231c] block">Enterprise / Distributor</span>
                <span className="text-[#4a5e55]">5,000+ Pencils</span>
              </div>
              <span className="font-black text-[#2d6a4f] text-sm">45% OFF + Free Branding</span>
            </div>

          </div>

          <div className="p-4 bg-[#e8f5e9] rounded-2xl border border-[#b7e4c7] text-xs text-[#1b4332] space-y-1.5">
            <h4 className="font-extrabold text-[#0f231c] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#2d6a4f]" /> Guaranteed Quality & Fast Lead Time
            </h4>
            <p className="leading-relaxed text-[11px]">
              All bulk orders undergo strict quality control. Lead times range from 3 to 7 business days depending on custom logo printing requirements.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
