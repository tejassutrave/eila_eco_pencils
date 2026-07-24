'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Compute storage key based on active user state
  const cartStorageKey = user?.id ? `eila_cart_${user.id}` : 'eila_cart_guest';

  // Synchronize cart whenever user logs in or out (waits for AuthContext loading to be false)
  useEffect(() => {
    if (authLoading) {
      console.log('[Cart Lifecycle] Waiting for AuthContext session restoration...');
      return;
    }

    const loadCart = async () => {
      setIsLoaded(false);
      console.log(`[Cart Lifecycle] Auth session restored. User ID: ${user?.id || 'GUEST'}`);

      // 1. Restore local cached cart immediately before any network request
      let cachedCart = [];
      try {
        const savedCart = localStorage.getItem(cartStorageKey);
        cachedCart = savedCart ? JSON.parse(savedCart) : [];
        console.log('[Cart Lifecycle] Cached cart loaded:', cachedCart);
        setCart(cachedCart);
      } catch (e) {
        console.warn('[Cart Lifecycle] Failed to parse cached cart:', e);
      }

      if (!user?.id) {
        // Guest user loading complete using local cache
        setIsLoaded(true);
        console.log('[Cart Lifecycle] Final React cart state (Guest):', cachedCart);
        return;
      }

      // 2. Fetch from Supabase after auth session is ready
      try {
        console.log('[Cart Lifecycle] Fetching cart from Supabase database for user:', user.id);
        
        let { data: dbCart, error: cartErr } = await supabase
          .from('user_carts')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (cartErr && cartErr.code === 'PGRST116') {
          console.log('[Cart Lifecycle] Database cart not found. Creating a new cart for user...');
          const { data: newCart, error: createErr } = await supabase
            .from('user_carts')
            .insert({ user_id: user.id })
            .select('id')
            .single();
          if (createErr) throw createErr;
          dbCart = newCart;
        } else if (cartErr) {
          throw cartErr;
        }

        if (dbCart?.id) {
          const { data: items, error: itemsErr } = await supabase
            .from('user_cart_items')
            .select('quantity, product_id, products(*)')
            .eq('cart_id', dbCart.id);

          if (itemsErr) throw itemsErr;

          if (items) {
            const mappedCart = items.map(item => ({
              ...item.products,
              quantity: item.quantity
            }));
            console.log('[Cart Lifecycle] Database cart loaded:', mappedCart);

            // Merge guest cart items if they exist in localStorage (login event)
            const guestCartStr = localStorage.getItem('eila_cart_guest');
            if (guestCartStr) {
              try {
                const guestCart = JSON.parse(guestCartStr);
                if (guestCart.length > 0) {
                  console.log('[Cart Lifecycle] Merging guest cart items into database:', guestCart);
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
                  console.log('[Cart Lifecycle] Guest cart merged successfully.');
                }
              } catch (mergeErr) {
                console.warn('[Cart Lifecycle] Guest cart merge warning:', mergeErr);
              }
            }

            // Only overwrite cached cart if database query was fully successful
            setCart(mappedCart);
            setIsLoaded(true);
            console.log('[Cart Lifecycle] Final React cart state (Database):', mappedCart);
            return;
          }
        }
      } catch (err) {
        console.error('[Cart Lifecycle] Supabase fetch error (operating in graceful offline cache mode):', err);
      }

      // Mark as loaded with the cached local version if database fetch failed
      setIsLoaded(true);
      console.log('[Cart Lifecycle] Final React cart state (Offline Cache):', cachedCart);
    };

    loadCart();
  }, [user, authLoading, cartStorageKey]);

  // Persist active cart to localStorage & Supabase DB
  useEffect(() => {
    // Only synchronize if the cart has finished loading from the database/storage!
    if (!isLoaded || authLoading) return;

    const syncCart = async () => {
      try {
        localStorage.setItem(cartStorageKey, JSON.stringify(cart));
      } catch (e) {}

      if (!user?.id) return;

      try {
        console.log('[Cart Lifecycle] Synchronizing cart state to Supabase database...', cart);
        const { data: dbCart } = await supabase
          .from('user_carts')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (dbCart?.id) {
          // Sync database items
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
            const { error: insertErr } = await supabase
              .from('user_cart_items')
              .insert(inserts);
            if (insertErr) throw insertErr;
          }
          console.log('[Cart Lifecycle] Cart synchronization complete.');
        }
      } catch (e) {
        console.warn('[Cart Lifecycle] Supabase cart synchronization warning:', e.message);
      }
    };

    const debounceTimer = setTimeout(() => {
      syncCart();
    }, 450);

    return () => clearTimeout(debounceTimer);
  }, [cart, user, cartStorageKey, isLoaded, authLoading]);

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
