'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Contact Us</h1>
        <p className="text-xs text-emerald-300">Have questions about our eco pencils or your order? We’d love to hear from you!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 space-y-4 text-xs text-emerald-200">
          <h3 className="font-bold text-sm text-white">Get in Touch</h3>
          
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white">Address</strong>
              <span>Eila Eco Pencils Pvt. Ltd.<br />Bengaluru, Karnataka 560001, India</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <strong className="block text-white">WhatsApp & Support</strong>
              <span>+91 89714 56552</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <strong className="block text-white">Email</strong>
              <span>hello@eilaecopencils.com</span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-white">Send Us a Message</h3>

          {submitted ? (
            <div className="p-6 text-center space-y-2 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white">Message Sent!</h4>
              <p className="text-emerald-300">We will respond to your email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-emerald-200 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-200 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-200 mb-1">Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we help you?"
                  className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-3 py-2 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold rounded-xl"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
