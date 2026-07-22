'use client';

import React from 'react';
import Image from 'next/image';
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
      {/* Dark Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-emerald-950/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-emerald-950 text-white shadow-2xl border-l border-emerald-800 flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 bg-emerald-900/60 border-b border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-lg text-white">Your Shopping Cart</h3>
              <span className="bg-emerald-800 text-emerald-200 text-xs px-2 py-0.5 rounded-full font-semibold">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-emerald-400 hover:text-white hover:bg-emerald-800/80 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-emerald-900/40 p-3.5 border-b border-emerald-800/60 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-emerald-200 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-400" />
                {amountNeededForFreeShipping === 0 ? (
                  <strong className="text-amber-300">You unlocked FREE Shipping! 🎉</strong>
                ) : (
                  <span>Add <strong>₹{amountNeededForFreeShipping.toFixed(2)}</strong> more for FREE Shipping!</span>
                )}
              </span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-emerald-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-white text-base">Your cart is empty</h4>
                <p className="text-xs text-emerald-300 max-w-xs mx-auto">
                  Explore our sustainable plantable seed pencils and eco gift sets!
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Shop Eco Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-emerald-900/40 border border-emerald-800/80 rounded-xl p-3.5 flex gap-3.5 items-center hover:border-emerald-700 transition-colors"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 bg-emerald-900 rounded-lg overflow-hidden shrink-0 border border-emerald-700/50">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1585336261026-8f5786372966?auto=format&fit=crop&q=80&w=400'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-semibold text-xs text-white truncate">{item.name}</h4>
                    <p className="text-xs font-bold text-emerald-300">₹{item.price.toFixed(2)}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-emerald-700 bg-emerald-950 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-emerald-300 text-emerald-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-emerald-300 text-emerald-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <span className="text-xs font-bold text-white">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Totals */}
          {cart.length > 0 && (
            <div className="p-5 bg-emerald-900/80 border-t border-emerald-800 space-y-3">
              <div className="space-y-1 text-xs text-emerald-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-amber-400 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-emerald-800">
                  <span>Total Amount</span>
                  <span className="text-emerald-300">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-emerald-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all duration-300"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
