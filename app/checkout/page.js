'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, ArrowLeft, CheckCircle2, MessageSquare, LogIn, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, shippingFee, grandTotal, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();

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

  // Auto-fill user email and name if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.username || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // STRICT CHECK: User MUST be signed in before confirming order!
    if (!user) {
      alert('Authentication Required: Please Sign In or Create an Account to confirm your order.');
      openAuthModal('login');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill in all shipping details before proceeding to payment.');
      return;
    }

    setIsProcessing(true);

    try {
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
            color: '#1b4332'
          },
          handler: async function (response) {
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
          customerDetails: { ...formData, userId: user?.id },
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

  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#e8f5e9] text-[#1b4332] border-2 border-[#52b788] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black text-[#2d6a4f] tracking-widest uppercase">Order Confirmed</span>
          <h1 className="text-3xl font-extrabold text-[#0f231c]">Thank You For Choosing Sustainability!</h1>
          <p className="text-sm text-[#3b5247]">
            Your order <strong>#{orderConfirmed.order_number}</strong> has been received and is being packed.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#e8e6da] rounded-3xl space-y-4 max-w-md mx-auto shadow-md">
          <h3 className="font-bold text-[#0f231c] text-base flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#2d6a4f]" /> WhatsApp Order Confirmation
          </h3>
          <p className="text-xs text-[#4a5e55]">
            Click below to open WhatsApp with your pre-filled order receipt to receive direct delivery tracking updates from our support team!
          </p>
          <a
            href={orderConfirmed.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#52b788] hover:bg-[#40916c] text-white font-extrabold text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-105"
          >
            Confirm via WhatsApp Now →
          </a>
        </div>

        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332]"
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
        <h2 className="text-2xl font-bold text-[#0f231c]">Your cart is empty</h2>
        <p className="text-xs text-[#4a5e55]">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1b4332] text-white rounded-full text-xs font-bold"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e8e6da] pb-4">
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6a4f] hover:text-[#1b4332]">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#2d6a4f]">
          <Lock className="w-4 h-4 text-[#52b788]" />
          <span>256-Bit SSL Encrypted Razorpay Checkout</span>
        </div>
      </div>

      {/* Login Required Notice Banner if Guest */}
      {!user && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-3xl flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-amber-800 font-semibold">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Sign In Required: Please sign in or create an account to complete your order checkout.</span>
          </div>
          <button
            onClick={() => openAuthModal('login')}
            className="px-4 py-2 bg-[#1b4332] text-white font-bold rounded-full text-xs hover:bg-[#2d6a4f] transition-all shrink-0 flex items-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Sign In / Register
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-[#0f231c]">Shipping Details</h2>
            <p className="text-xs text-[#4a5e55]">Enter delivery address for Pan-India dispatch</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-[#0f231c] mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ananya Sharma"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0f231c] mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ananya@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f231c] mb-1">Phone Number (For WhatsApp) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f231c] mb-1">Shipping Address *</label>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="House/Flat No., Building, Street Area"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0f231c] mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Bengaluru"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f231c] mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="Karnataka"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f231c] mb-1">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="560001"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl px-4 py-3 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                />
              </div>
            </div>

            <div className="pt-4">
              {!user ? (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="w-full py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-base rounded-full shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" /> Sign In to Confirm & Pay ₹{grandTotal.toFixed(2)}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-base rounded-full shadow-xl shadow-[#1b4332]/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? 'Connecting to Razorpay...' : `Pay ₹${grandTotal.toFixed(2)} via Razorpay (UPI, Card, NetBanking)`}
                </button>
              )}
            </div>

          </form>

        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white border border-[#e8e6da] rounded-3xl p-6 sm:p-8 space-y-6 h-fit shadow-sm">
          
          <h3 className="font-extrabold text-lg text-[#0f231c] border-b border-[#e8e6da] pb-3">Order Summary</h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#f4f3ed] overflow-hidden shrink-0 border border-[#e8e6da]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f231c]">{item.name}</h4>
                    <span className="text-[#2d6a4f]">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-black text-[#0f231c]">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e8e6da] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#4a5e55]">
              <span>Subtotal</span>
              <span className="font-bold text-[#0f231c]">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#4a5e55]">
              <span>Delivery Fee</span>
              <span className="font-bold text-[#2d6a4f]">
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-[#0f231c] pt-2 border-t border-[#e8e6da]">
              <span>Total Payable</span>
              <span className="text-[#1b4332] text-lg">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-4 bg-[#e8f5e9] rounded-2xl border border-[#b7e4c7] text-xs text-[#1b4332] space-y-1">
            <div className="flex items-center gap-2 font-extrabold">
              <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
              <span>Razorpay Buyer Security Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">Your payment details are securely processed via Razorpay’s PCI-DSS compliant payment gateway.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
