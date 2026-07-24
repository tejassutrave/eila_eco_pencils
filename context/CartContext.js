'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Compute storage key based on active user state
  const cartStorageKey = user?.id ? `eila_cart_${user.id}` : 'eila_cart_guest';

  // Synchronize cart whenever user logs in or out
  useEffect(() => {
    const loadCart = async () => {
      if (!user?.id) {
        // If guest, load from localStorage
        try {
          const savedCart = localStorage.getItem('eila_cart_guest');
          setCart(savedCart ? JSON.parse(savedCart) : []);
        } catch (e) {
          setCart([]);
        }
        return;
      }

      // If logged in, fetch from Supabase
      try {
        // 1. Get or create cart record
        let { data: dbCart, error: cartErr } = await supabase
          .from('user_carts')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (cartErr && cartErr.code === 'PGRST116') {
          const { data: newCart } = await supabase
            .from('user_carts')
            .insert({ user_id: user.id })
            .select('id')
            .single();
          dbCart = newCart;
        }

        if (dbCart?.id) {
          // 2. Fetch cart items
          const { data: items, error: itemsErr } = await supabase
            .from('user_cart_items')
            .select('quantity, product_id, products(*)')
            .eq('cart_id', dbCart.id);

          if (!itemsErr && items) {
            const mappedCart = items.map(item => ({
              ...item.products,
              quantity: item.quantity
            }));
            
            // 3. Merge guest cart items if they exist
            const guestCartStr = localStorage.getItem('eila_cart_guest');
            if (guestCartStr) {
              const guestCart = JSON.parse(guestCartStr);
              if (guestCart.length > 0) {
                for (const guestItem of guestCart) {
                  const existingItem = mappedCart.find(i => i.id === guestItem.id);
                  if (existingItem) {
                    existingItem.quantity += guestItem.quantity;
                    await supabase
                      .from('user_cart_items')
                      .update({ quantity: existingItem.quantity })
                      .eq('cart_id', dbCart.id)
                      .eq('product_id', guestItem.id);
                  } else {
                    mappedCart.push(guestItem);
                    await supabase
                      .from('user_cart_items')
                      .insert({
                        cart_id: dbCart.id,
                        product_id: guestItem.id,
                        quantity: guestItem.quantity
                      });
                  }
                }
                localStorage.removeItem('eila_cart_guest');
              }
            }

            setCart(mappedCart);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to sync DB cart:', err);
      }

      // Fallback
      try {
        const savedCart = localStorage.getItem(`eila_cart_${user.id}`);
        setCart(savedCart ? JSON.parse(savedCart) : []);
      } catch (e) {
        setCart([]);
      }
    };

    loadCart();
  }, [user]);

  // Persist active cart to localStorage & Supabase DB
  useEffect(() => {
    const syncCart = async () => {
      try {
        localStorage.setItem(cartStorageKey, JSON.stringify(cart));
      } catch (e) {}

      if (!user?.id) return;

      try {
        const { data: dbCart } = await supabase
          .from('user_carts')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (dbCart?.id) {
          await supabase
            .from('user_cart_items')
            .delete()
            .eq('cart_id', dbCart.id);

          if (cart.length > 0) {
            const inserts = cart.map(item => ({
              cart_id: dbCart.id,
              product_id: item.id,
              quantity: item.quantity
            }));
            await supabase
              .from('user_cart_items')
              .insert(inserts);
          }
        }
      } catch (e) {}
    };

    const debounceTimer = setTimeout(() => {
      syncCart();
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [cart, user, cartStorageKey]);

  const addToCart = (product, quantity = 1) => {
    const minQty = product.moq || 1;
    const addQty = quantity >= minQty ? quantity : minQty;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        // If already exists, increment the quantity
        updatedCart[existingItemIndex].quantity += (quantity === 1 && minQty > 1) ? minQty : quantity;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: addQty }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (!item) return prevCart;
      
      if (newQuantity <= 0) {
        return prevCart.filter((i) => i.id !== productId);
      }

      const minQty = item.moq || 1;
      const targetQty = newQuantity < minQty ? minQty : newQuantity;

      return prevCart.map((i) =>
        i.id === productId ? { ...i, quantity: targetQty } : i
      );
    });
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
