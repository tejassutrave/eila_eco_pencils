'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'admin_signup'
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
          const userRole = session.user.user_metadata?.role || (session.user.email.startsWith('admin') ? 'admin' : 'customer');
          setUser({
            id: session.user.id,
            email: session.user.email,
            username: session.user.user_metadata?.username || session.user.email.split('@')[0],
            role: userRole
          });
        } else {
          const savedUser = localStorage.getItem('eila_logged_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (e) {
        console.warn('Auth check notice:', e.message);
      } font-medium;
      setLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const userRole = session.user.user_metadata?.role || (session.user.email.startsWith('admin') ? 'admin' : 'customer');
        setUser({
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email.split('@')[0],
          role: userRole
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Create Account (Customer or Admin) with Role-Based & Secret Access Token Validation (1234)
  const signUp = async ({ username, email, password, adminToken, isAdminMode = false }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();
    const registeredUsers = getRegisteredUsers();

    // Verify Admin Token if registering as Admin
    if (isAdminMode || adminToken) {
      if (adminToken !== '1234') {
        return {
          success: false,
          error: 'Invalid Secret Admin Access Token! Only authorized admins can use token 1234.'
        };
      }
    }

    const assignedRole = (isAdminMode || adminToken === '1234' || cleanEmail.startsWith('admin') || cleanUsername.startsWith('admin')) ? 'admin' : 'customer';

    // Duplicate check
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
            full_name: cleanUsername,
            role: assignedRole
          }
        }
      });

      if (authData?.user?.id) {
        userId = authData.user.id;
      }
    } catch (e) {}

    // Insert into appropriate table in Supabase
    try {
      if (assignedRole === 'admin') {
        await supabase.from('admin_profiles').insert({
          admin_code: 'ADM-' + Math.floor(1000 + Math.random() * 9000),
          full_name: cleanUsername,
          email: cleanEmail,
          password_hash: passwordHash,
          role: 'admin',
          department: 'Executive Operations'
        });
      } else {
        await supabase.from('profiles').insert({
          id: userId.startsWith('usr_') ? undefined : userId,
          username: cleanUsername,
          full_name: cleanUsername,
          email: cleanEmail,
          password_hash: passwordHash,
          role: 'customer'
        });
      }
    } catch (e) {}

    const newUserObj = {
      id: userId,
      username: cleanUsername,
      email: cleanEmail,
      passwordHash,
      role: assignedRole
    };

    saveRegisteredUsers([...registeredUsers, newUserObj]);

    const activeUser = {
      id: newUserObj.id,
      email: newUserObj.email,
      username: newUserObj.username,
      role: assignedRole
    };

    setUser(activeUser);
    localStorage.setItem('eila_logged_user', JSON.stringify(activeUser));
    setIsAuthModalOpen(false);
    return { success: true, user: activeUser, role: assignedRole };
  };

  // Sign In with Optional Admin Token Verification (1234)
  const signIn = async ({ email, password, adminToken }) => {
    const cleanEmail = email.trim().toLowerCase();
    const registeredUsers = getRegisteredUsers();

    const isAdminLoginAttempt = cleanEmail.startsWith('admin') || (adminToken && adminToken.trim() !== '');

    if (isAdminLoginAttempt) {
      if (adminToken !== '1234') {
        return {
          success: false,
          error: 'Invalid Admin Access Token! Enter "1234" to sign in to Admin Portal.'
        };
      }
    }

    const assignedRole = (adminToken === '1234' || cleanEmail.startsWith('admin')) ? 'admin' : 'customer';

    // 1. Try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (!error && data?.user) {
        const loggedUser = {
          id: data.user.id,
          email: data.user.email,
          username: data.user.user_metadata?.username || cleanEmail.split('@')[0],
          role: assignedRole
        };
        setUser(loggedUser);
        localStorage.setItem('eila_logged_user', JSON.stringify(loggedUser));
        setIsAuthModalOpen(false);
        return { success: true, user: loggedUser, role: assignedRole };
      }
    } catch (e) {}

    // 2. Try direct Supabase DB check (admin_profiles or profiles)
    try {
      const targetTable = assignedRole === 'admin' ? 'admin_profiles' : 'profiles';
      const { data: profileData } = await supabase
        .from(targetTable)
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
            username: profileData.username || profileData.full_name || cleanEmail.split('@')[0],
            role: assignedRole
          };
          setUser(activeUser);
          localStorage.setItem('eila_logged_user', JSON.stringify(activeUser));
          setIsAuthModalOpen(false);
          return { success: true, user: activeUser, role: assignedRole };
        } else {
          return {
            success: false,
            error: 'Incorrect Password. Please check your password and try again.'
          };
        }
      }
    } catch (e) {}

    // 3. Local Registry Lookup
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
      username: existingUser.username,
      role: existingUser.role || assignedRole
    };

    setUser(activeUser);
    localStorage.setItem('eila_logged_user', JSON.stringify(activeUser));
    setIsAuthModalOpen(false);
    return { success: true, user: activeUser, role: activeUser.role };
  };

  // Sign Out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}

    setUser(null);

    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('eila_cart_') || key === 'eila_logged_user') {
          localStorage.removeItem(key);
        }
      });
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
