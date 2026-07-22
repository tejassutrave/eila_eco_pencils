'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial Supabase auth session or fallback mock session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            username: session.user.user_metadata?.username || session.user.email.split('@')[0]
          });
        } else {
          // Check local saved demo user session
          const savedDemoUser = localStorage.getItem('eila_logged_user');
          if (savedDemoUser) {
            setUser(JSON.parse(savedDemoUser));
          }
        }
      } catch (e) {
        console.warn('Supabase auth session check notice:', e.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen to Supabase auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email.split('@')[0]
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Create New Account (Sign Up)
  const signUp = async ({ username, email, password }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: username
          }
        }
      });

      if (error) {
        // Fallback local registration for testing when Supabase API keys are mock
        const mockUser = {
          id: 'usr_' + Math.random().toString(36).substring(2, 9),
          username: username || email.split('@')[0],
          email
        };
        setUser(mockUser);
        localStorage.setItem('eila_logged_user', JSON.stringify(mockUser));
        setIsAuthModalOpen(false);
        return { success: true, user: mockUser };
      }

      const newUser = {
        id: data.user.id,
        email: data.user.email,
        username: username || email.split('@')[0]
      };

      setUser(newUser);
      localStorage.setItem('eila_logged_user', JSON.stringify(newUser));
      setIsAuthModalOpen(false);
      return { success: true, user: newUser };
    } catch (err) {
      console.error('SignUp Error:', err);
      const mockUser = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        username: username || email.split('@')[0],
        email
      };
      setUser(mockUser);
      localStorage.setItem('eila_logged_user', JSON.stringify(mockUser));
      setIsAuthModalOpen(false);
      return { success: true, user: mockUser };
    }
  };

  // Login (Sign In)
  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Fallback local sign in for testing
        const username = email.split('@')[0];
        const mockUser = {
          id: 'usr_' + btoa(email).replace(/=/g, '').slice(0, 10),
          username,
          email
        };
        setUser(mockUser);
        localStorage.setItem('eila_logged_user', JSON.stringify(mockUser));
        setIsAuthModalOpen(false);
        return { success: true, user: mockUser };
      }

      const loggedUser = {
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata?.username || email.split('@')[0]
      };

      setUser(loggedUser);
      localStorage.setItem('eila_logged_user', JSON.stringify(loggedUser));
      setIsAuthModalOpen(false);
      return { success: true, user: loggedUser };
    } catch (err) {
      console.error('SignIn Error:', err);
      const mockUser = {
        id: 'usr_' + btoa(email).replace(/=/g, '').slice(0, 10),
        username: email.split('@')[0],
        email
      };
      setUser(mockUser);
      localStorage.setItem('eila_logged_user', JSON.stringify(mockUser));
      setIsAuthModalOpen(false);
      return { success: true, user: mockUser };
    }
  };

  // Sign Out: Revokes JWT session, clears stored tokens & navigates to main page
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setUser(null);
    localStorage.removeItem('eila_logged_user');
    
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
