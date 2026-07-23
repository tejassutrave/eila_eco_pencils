'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    grandTotal,
    totalItemsCount
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 499;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-[#0f231c]/50 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf9f5] text-[#1a2e26] shadow-2xl border-l border-[#e8e6da] flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 bg-white border-b border-[#e8e6da] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#2d6a4f]" />
              <h3 className="font-extrabold text-lg text-[#0f231c]">Your Shopping Cart</h3>
              <span className="bg-[#e8f5e9] text-[#1b4332] text-xs px-2.5 py-0.5 rounded-full font-bold">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#4a5e55] hover:text-[#0f231c] hover:bg-[#f0efe6] rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#f4f3ed] p-4 border-b border-[#e8e6da] text-xs space-y-2">
            <div className="flex items-center justify-between font-semibold text-[#1b4332]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-500" />
                {amountNeededForFreeShipping === 0 ? (
                  <strong className="text-[#1b4332]">You unlocked FREE Shipping! 🎉</strong>
                ) : (
                  <span>Add <strong>₹{amountNeededForFreeShipping.toFixed(2)}</strong> more for FREE Shipping!</span>
                )}
              </span>
              <span className="font-bold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-[#e2dfd2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#52b788] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#e8f5e9] text-[#2d6a4f] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[#0f231c] text-base">Your cart is empty</h4>
                <p className="text-xs text-[#4a5e55] max-w-xs mx-auto">
                  Explore our sustainable plantable seed pencils and eco gift sets!
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1b4332] hover:bg-[#2d6a4f] text-white rounded-full text-xs font-bold transition-all shadow-md"
                >
                  Shop Eco Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#e8e6da] rounded-2xl p-3.5 flex gap-3.5 items-center hover:border-[#52b788] transition-colors shadow-sm"
                >
                  <div className="relative w-16 h-16 bg-[#f4f3ed] rounded-xl overflow-hidden shrink-0 border border-[#e8e6da]">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&q=80&w=400'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-bold text-xs text-[#0f231c] truncate">{item.name}</h4>
                    {item.moq > 1 && (
                      <span className="inline-block text-[9px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        MOQ: {item.moq} units
                      </span>
                    )}
                    <p className="text-xs font-black text-[#1b4332]">₹{item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-[#e8e6da] bg-[#f4f3ed] rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-[#1b4332] text-[#4a5e55]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#0f231c]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-[#1b4332] text-[#4a5e55]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-[#0f231c]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Totals */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#e8e6da] space-y-4 shadow-inner">
              <div className="space-y-1.5 text-xs text-[#4a5e55]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#0f231c]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-[#2d6a4f] font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0f231c] pt-2 border-t border-[#e8e6da]">
                  <span>Total Amount</span>
                  <span className="text-[#1b4332]">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-sm rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#1b4332]/20 transition-all hover:scale-[1.02]"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 text-[#74c69d]" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
