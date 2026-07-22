'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loading, setLoading] = useState(true);

  // Helper to retrieve local registered users registry
  const getRegisteredUsers = () => {
    try {
      const usersJson = localStorage.getItem('eila_registered_users');
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (e) {
      return [];
    }
  };

  const saveRegisteredUsers = (users) => {
    try {
      localStorage.setItem('eila_registered_users', JSON.stringify(users));
    } catch (e) {}
  };

  useEffect(() => {
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
          const savedUser = localStorage.getItem('eila_logged_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (e) {
        console.warn('Auth check notice:', e.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

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

  // Create New Account (Sign Up) with Bcrypt Password Hashing & Strict Duplicate Check
  const signUp = async ({ username, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();
    const registeredUsers = getRegisteredUsers();

    // Check if account already exists with this Email ID or Username
    const existingUser = registeredUsers.find(
      (u) => u.email === cleanEmail || u.username.toLowerCase() === cleanUsername.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        error: 'An account with this Email ID or Username already exists! Please Sign In.'
      };
    }

    // Hash password with bcrypt
    const passwordHash = bcrypt.hashSync(password, 10);

    const newUserObj = {
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      username: cleanUsername,
      email: cleanEmail,
      passwordHash
    };

    // Attempt Supabase Auth signup
    try {
      await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            username: cleanUsername,
            full_name: cleanUsername
          }
        }
      });
    } catch (e) {}

    // Register user in local registry
    saveRegisteredUsers([...registeredUsers, newUserObj]);

    const activeUser = {
      id: newUserObj.id,
      email: newUserObj.email,
      username: newUserObj.username
    };

    setUser(activeUser);
    localStorage.setItem('eila_logged_user', JSON.stringify(activeUser));
    setIsAuthModalOpen(false);
    return { success: true, user: activeUser };
  };

  // Sign In with Strict Credentials & Password Hash Verification
  const signIn = async ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const registeredUsers = getRegisteredUsers();

    // 1. Try Supabase Auth verification
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (!error && data?.user) {
        const loggedUser = {
          id: data.user.id,
          email: data.user.email,
          username: data.user.user_metadata?.username || cleanEmail.split('@')[0]
        };
        setUser(loggedUser);
        localStorage.setItem('eila_logged_user', JSON.stringify(loggedUser));
        setIsAuthModalOpen(false);
        return { success: true, user: loggedUser };
      }
    } catch (e) {}

    // 2. Strict Local Registered Registry Lookup
    const existingUser = registeredUsers.find((u) => u.email === cleanEmail);

    if (!existingUser) {
      return {
        success: false,
        error: 'No account found with this Email ID. Please check your email or click "Create Account".'
      };
    }

    // Verify bcrypt password hash
    const isPasswordValid = bcrypt.compareSync(password, existingUser.passwordHash);

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Incorrect Password. Please check your password and try again.'
      };
    }

    const activeUser = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username
    };

    setUser(activeUser);
    localStorage.setItem('eila_logged_user', JSON.stringify(activeUser));
    setIsAuthModalOpen(false);
    return { success: true, user: activeUser };
  };

  // Sign Out
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
