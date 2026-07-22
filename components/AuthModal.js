'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, UserPlus, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, signUp, signIn } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Automatically reset form inputs whenever modal opens or mode changes
  useEffect(() => {
    if (isAuthModalOpen) {
      setUsername('');
      setEmail('');
      setPassword('');
      setErrorMsg('');
    }
  }, [isAuthModalOpen, authMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (authMode === 'signup') {
        if (!username || !email || !password) {
          setErrorMsg('Please fill in all required fields (Username, Email ID, Password).');
          setLoading(false);
          return;
        }
        const res = await signUp({ username, email, password });
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to create account.');
        }
      } else {
        if (!email || !password) {
          setErrorMsg('Please enter both your Email ID and Password.');
          setLoading(false);
          return;
        }
        const res = await signIn({ email, password });
        if (!res.success) {
          setErrorMsg(res.error || 'Invalid credentials. Account does not exist or password is incorrect.');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-[#0f231c]/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white text-[#1a2e26] rounded-3xl shadow-2xl border border-[#e8e6da] overflow-hidden z-10 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-[#4a5e55] hover:text-[#0f231c] hover:bg-[#f0efe6] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center mx-auto shadow-inner">
            {authMode === 'signup' ? <UserPlus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
          </div>
          <h3 className="font-extrabold text-2xl text-[#0f231c]">
            {authMode === 'signup' ? 'Create New Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-[#4a5e55]">
            {authMode === 'signup'
              ? 'Create your account to save items to your personal shopping cart!'
              : 'Sign in to access your saved cart items & account settings.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-[#faf9f5] border border-[#e8e6da] p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'login' ? 'bg-[#1b4332] text-white shadow-sm' : 'text-[#4a5e55] hover:text-[#0f231c]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'signup' ? 'bg-[#1b4332] text-white shadow-sm' : 'text-[#4a5e55] hover:text-[#0f231c]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Feedback Message */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#0f231c] mb-1">Username *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#2d6a4f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="e.g. eco_lover"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#0f231c] mb-1">Email ID *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#2d6a4f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                autoComplete="off"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0f231c] mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#2d6a4f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#faf9f5] border border-[#e8e6da] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0f231c] placeholder-[#6c8075] focus:outline-none focus:border-[#52b788]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-extrabold text-xs rounded-full shadow-lg shadow-[#1b4332]/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Verifying Credentials...' : authMode === 'signup' ? 'Create My Account →' : 'Sign In Now →'}
          </button>

        </form>

        <div className="text-center text-xs text-[#4a5e55]">
          {authMode === 'signup' ? (
            <p>Already have an account? <button onClick={() => { setAuthMode('login'); setErrorMsg(''); }} className="text-[#1b4332] font-bold hover:underline">Sign In</button></p>
          ) : (
            <p>New to Eila Eco Pencils? <button onClick={() => { setAuthMode('signup'); setErrorMsg(''); }} className="text-[#1b4332] font-bold hover:underline">Create Account</button></p>
          )}
        </div>

      </div>
    </div>
  );
}
