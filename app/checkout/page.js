'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Lock, Truck, ArrowLeft, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, shippingFee, grandTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill in all shipping details before proceeding to payment.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Call serverless route to create Razorpay Order
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          customerName: formData.name,
          customerEmail: formData.email
        })
      });

      const orderData = await res.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment');
      }

      // If Razorpay SDK is loaded on window
      if (typeof window !== 'undefined' && window.Razorpay && !orderData.is_mock) {
        const options = {
          key: orderData.key_id,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Eila Eco Pencils',
          description: 'Payment for Sustainable Eco Stationery',
          order_id: orderData.order_id,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#059669'
          },
          handler: async function (response) {
            // Verify payment on backend
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              is_mock: false
            });
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setIsProcessing(false);
      } else {
        // Fallback Test Payment Verification for immediate testing
        await verifyPayment({
          razorpay_order_id: orderData.order_id,
          razorpay_payment_id: 'pay_test_' + Math.random().toString(36).substring(2, 8),
          razorpay_signature: 'sig_test_mock',
          is_mock: true
        });
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      alert(error.message || 'Payment initiation failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const verifyPayment = async (paymentPayload) => {
    try {
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...paymentPayload,
          customerDetails: formData,
          cartItems: cart,
          totalAmount: grandTotal
        })
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        setOrderConfirmed(verifyData);
        clearCart();
      } else {
        alert('Payment verification failed: ' + verifyData.error);
      }
    } catch (err) {
      console.error('Verification Error:', err);
      alert('Verification server error');
    } finally {
      setIsProcessing(false);
    }
  };

  // SUCCESSFUL ORDER CONFIRMATION SCREEN
  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-800/80 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-2xl animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">Order Confirmed</span>
          <h1 className="text-3xl font-extrabold text-white">Thank You For Choosing Sustainability!</h1>
          <p className="text-sm text-emerald-200">
            Your order <strong>#{orderConfirmed.order_number}</strong> has been received and is being packed.
          </p>
        </div>

        {/* WhatsApp Link Box */}
        <div className="p-6 bg-emerald-900/60 border border-emerald-700/60 rounded-3xl space-y-4 max-w-md mx-auto">
          <h3 className="font-bold text-white text-base flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" /> WhatsApp Order Confirmation
          </h3>
          <p className="text-xs text-emerald-300">
            Click below to open WhatsApp with your pre-filled order receipt to receive direct delivery tracking updates from our support team!
          </p>
          <a
            href={orderConfirmed.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            Confirm via WhatsApp Now →
          </a>
        </div>

        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-emerald-300">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>256-Bit SSL Encrypted Razorpay Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Shipping Form (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 sm:p-8 space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white">Shipping Details</h2>
            <p className="text-xs text-emerald-300">Enter delivery address for Pan-India dispatch</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ananya Sharma"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ananya@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Phone Number (For WhatsApp) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1">Shipping Street Address *</label>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="House/Flat No., Building, Street Area"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Bengaluru"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="Karnataka"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="560001"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full bg-emerald-950 border border-emerald-700/60 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-extrabold text-base rounded-xl shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? 'Connecting to Razorpay...' : `Pay ₹${grandTotal.toFixed(2)} via Razorpay (UPI, Card, NetBanking)`}
              </button>
            </div>

          </form>

        </div>

        {/* Order Summary Sidebar (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-emerald-900/40 border border-emerald-800 rounded-3xl p-6 sm:p-8 space-y-6 h-fit">
          
          <h3 className="font-extrabold text-lg text-white border-b border-emerald-800 pb-3">Order Summary</h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-emerald-900 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.name}</h4>
                    <span className="text-emerald-400">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-emerald-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-emerald-200">
              <span>Subtotal</span>
              <span className="font-semibold text-white">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-200">
              <span>Delivery Fee</span>
              <span className="font-semibold text-amber-400">
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-emerald-800">
              <span>Total Payable</span>
              <span className="text-amber-300 text-lg">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-950/60 rounded-2xl border border-emerald-800 text-[11px] text-emerald-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Razorpay Buyer Security Guarantee</span>
            </div>
            <p>Your payment details are securely processed via Razorpay’s PCI-DSS compliant payment gateway.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
