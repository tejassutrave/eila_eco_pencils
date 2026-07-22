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

  // Sign Up with direct profiles database insert
  const signUp = async ({ username, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();
    const registeredUsers = getRegisteredUsers();

    const existingUser = registeredUsers.find(
      (u) => u.email === cleanEmail || u.username.toLowerCase() === cleanUsername.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        error: 'An account with this Email ID or Username already exists! Please Sign In.'
      };
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    let userId = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);

    try {
      const { data: authData } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            username: cleanUsername,
            full_name: cleanUsername
          }
        }
      });

      if (authData?.user?.id) {
        userId = authData.user.id;
      }
    } catch (e) {}

    try {
      await supabase.from('profiles').insert({
        id: userId.startsWith('usr_') ? undefined : userId,
        username: cleanUsername,
        full_name: cleanUsername,
        email: cleanEmail,
        password_hash: passwordHash,
        role: 'customer'
      });
    } catch (e) {}

    const newUserObj = {
      id: userId,
      username: cleanUsername,
      email: cleanEmail,
      passwordHash
    };

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

  // Sign In with Strict Credentials
  const signIn = async ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const registeredUsers = getRegisteredUsers();

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

    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', cleanEmail)
        .single();

      if (profileData) {
        const isMatch = profileData.password_hash
          ? bcrypt.compareSync(password, profileData.password_hash)
          : false;

        if (isMatch) {
          const activeUser = {
            id: profileData.id,
            email: profileData.email,
            username: profileData.username
          };
          setUser(activeUser);
          localStorage.setItem('eila_logged_user', JSON.stringify(activeUser));
          setIsAuthModalOpen(false);
          return { success: true, user: activeUser };
        } else {
          return {
            success: false,
            error: 'Incorrect Password. Please check your password and try again.'
          };
        }
      }
    } catch (e) {}

    const existingUser = registeredUsers.find((u) => u.email === cleanEmail);

    if (!existingUser) {
      return {
        success: false,
        error: 'No account found with this Email ID. Please check your email or click "Create Account".'
      };
    }

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

  // Sign Out: Clears all local memory, user session & guest cart completely
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}

    setUser(null);

    if (typeof window !== 'undefined') {
      // Clear all guest and user carts from localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('eila_cart_') || key === 'eila_logged_user') {
          localStorage.removeItem(key);
        }
      });
      // Redirect to main page for fresh start
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
