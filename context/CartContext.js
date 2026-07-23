'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Compute storage key based on active user state
  const cartStorageKey = user?.id ? `eila_cart_${user.id}` : 'eila_cart_guest';

  // Synchronize cart whenever user logs in or out
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(cartStorageKey);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    } catch (e) {
      setCart([]);
    }
  }, [user, cartStorageKey]);

  // Persist active cart to localStorage
  useEffect(() => {
    try {
      if (cartStorageKey) {
        localStorage.setItem(cartStorageKey, JSON.stringify(cart));
      }
    } catch (e) {}
  }, [cart, cartStorageKey]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    try {
      if (cartStorageKey) {
        localStorage.removeItem(cartStorageKey);
      }
    } catch (e) {}
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 499 || subtotal === 0 ? 0 : 49.00;
  const grandTotal = subtotal + shippingFee;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        shippingFee,
        grandTotal,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        cartStorageKey
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
