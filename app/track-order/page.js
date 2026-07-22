'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, CheckCircle2, Clock, MapPin, Package, ArrowLeft, LogIn, Search, AlertCircle, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function TrackOrderPage() {
  const { user, openAuthModal } = useAuth();
  const [orderQuery, setOrderQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Sample order tracking data
  const sampleOrders = [
    {
      orderNumber: 'EILA-849201',
      customerName: 'Ananya Sharma',
      items: 'Velvet Plantable Seed Pencils (Pack of 10)',
      amount: '₹249.00',
      currentStage: 3, // 1: Confirmed, 2: Packaged, 3: Shipped, 4: Delivered
      courierName: 'Delhivery Express',
      trackingAwb: 'DLHV948201948',
      estimatedDelivery: 'Tomorrow by 4:00 PM',
      timeline: [
        { title: 'Order Confirmed', date: 'July 21, 10:30 AM', completed: true, location: 'Online Payment Verified' },
        { title: 'Zero-Plastic Packaging', date: 'July 21, 02:15 PM', completed: true, location: 'Bengaluru Warehouse' },
        { title: 'Handed to Courier', date: 'July 22, 09:00 AM', completed: true, location: 'In Transit to Hub' },
        { title: 'Out for Delivery', date: 'Expected July 23', completed: false, location: 'Destination City Hub' }
      ]
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const found = sampleOrders.find(
      (o) => o.orderNumber.toLowerCase() === orderQuery.trim().toLowerCase()
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMsg('No order found with number "' + orderQuery + '". Default sample: try "EILA-849201"');
    }
  };

  // Require user authentication to view tracking portal
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center mx-auto shadow-inner">
          <Truck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black text-amber-700 tracking-widest uppercase">Authentication Required</span>
          <h1 className="text-3xl font-extrabold text-[#0f231c]">Sign In To Track Your Orders</h1>
          <p className="text-xs text-[#4a5e55] leading-relaxed">
            Order tracking and live courier dispatch timelines are strictly accessible to registered account holders. Please sign in to view your active shipments!
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => openAuthModal('login')}
            className="px-8 py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs rounded-full shadow-xl transition-transform hover:scale-105 inline-flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In To Access Order Tracker →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>

      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5e9] border border-[#b7e4c7] text-[#1b4332] text-xs font-extrabold">
          <Truck className="w-4 h-4 text-[#52b788]" />
          <span>Real-time Dispatch Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0f231c] tracking-tight">
          Track Your Eco Order 🚚
        </h1>
        <p className="text-sm text-[#4a5e55]">
          Logged in as <strong>{user.email}</strong>. Enter your Order Number below to check live shipment status.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-2xl bg-white border border-[#e8e6da] rounded-3xl p-3 flex items-center gap-3 shadow-sm">
        <Search className="w-5 h-5 text-[#2d6a4f] ml-3 shrink-0" />
        <input
          type="text"
          placeholder="Enter Order # (e.g. EILA-849201)"
          value={orderQuery}
          onChange={(e) => setOrderQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-[#0f231c] font-bold placeholder-[#6c8075] focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs rounded-2xl transition-all shrink-0"
        >
          Track Shipment
        </button>
      </form>

      {errorMsg && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs font-bold flex items-center gap-2 max-w-2xl">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Default Order Display */}
      {searchedOrder ? (
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-10 space-y-8 shadow-md">
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[#e8e6da] pb-6 gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#2d6a4f] tracking-widest">Active Shipment</span>
              <h2 className="text-2xl font-black text-[#0f231c]">{searchedOrder.orderNumber}</h2>
              <span className="text-xs text-[#4a5e55]">{searchedOrder.items} • {searchedOrder.amount}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-[#1b4332] block">Courier: {searchedOrder.courierName}</span>
              <span className="text-[11px] font-mono text-[#2d6a4f] block">AWB: {searchedOrder.trackingAwb}</span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block mt-1">
                Estimated Delivery: {searchedOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Interactive Timeline Progress Bar */}
          <div className="space-y-6">
            <h3 className="font-extrabold text-lg text-[#0f231c]">Fulfillment Status</h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {searchedOrder.timeline.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    step.completed
                      ? 'bg-[#e8f5e9] border-[#b7e4c7] text-[#1b4332]'
                      : 'bg-[#faf9f5] border-[#e8e6da] text-[#6c8075] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className={`w-5 h-5 ${step.completed ? 'text-[#52b788]' : 'text-gray-300'}`} />
                    <span className="font-extrabold text-xs">{step.title}</span>
                  </div>
                  <span className="text-[11px] font-bold block">{step.date}</span>
                  <span className="text-[10px] opacity-80 block">{step.location}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white border border-[#e8e6da] rounded-3xl p-8 space-y-6 text-center shadow-sm max-w-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center mx-auto font-bold">
            <Package className="w-6 h-6 text-[#52b788]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg text-[#0f231c]">No Active Search</h3>
            <p className="text-xs text-[#4a5e55]">
              Type your order receipt number above (e.g. <strong>EILA-849201</strong>) to view your live shipment status.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
