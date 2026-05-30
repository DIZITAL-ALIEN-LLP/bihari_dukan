'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Store, Phone, Lock, ArrowRight, Languages, ShieldCheck, Fingerprint, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Robust Input Cleaning
    const input = phone.trim();
    const cleanPassword = password.trim();

    // 2. Frontend Validation
    if (!input || !cleanPassword) {
      setError(isHindi ? 'कृपया विवरण और पासवर्ड दर्ज करें' : 'Please enter details and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured. Please add environment variables.');
      }

      // 3. Detect Input Type (Email vs Phone)
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
      let authPayload: any = { password: cleanPassword };

      if (isEmail) {
        authPayload.email = input;
      } else {
        const cleanPhone = input.replace(/\s+/g, '');
        authPayload.phone = cleanPhone.startsWith('+') ? cleanPhone : `+91${cleanPhone}`;
      }

      console.log('Attempting login with:', isEmail ? 'Email' : 'Phone', input);

      const { data, error: authError } = await supabase.auth.signInWithPassword(authPayload);

      if (authError) {
        if (authError.status === 422) {
          throw new Error(isHindi ? 'अमान्य डेटा। कृपया विवरण जांचें।' : 'Invalid data format. Please check your entry.');
        }
        throw authError;
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');

      // Demo Bypass
      if (!isSupabaseConfigured && input === '9876543210') {
        setTimeout(() => router.push('/'), 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPLogin = async () => {
    setLoading(true);
    setError('');
    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured.');
      }
      const { error: otpError } = await supabase.auth.signInWithOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone.replace(/\s+/g, '')}`,
      });
      if (otpError) throw otpError;
      alert('OTP sent to your phone!');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const isHindi = i18n.language === 'hi';

  return (
    <div className="min-h-screen bg-[#faf8ff] font-sans selection:bg-[#1e3a8a]/10 flex flex-col">
      {/* Language Switcher Floating Button */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-lg transition-all hover:bg-white active:scale-95 group"
        >
          <Languages size={18} className="text-[#1e3a8a] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">
            {isHindi ? 'English' : 'हिंदी'}
          </span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="h-[40vh] w-full bg-[#1e3a8a] relative overflow-hidden flex flex-col items-center justify-center p-6 shrink-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/10 blur-[100px] animate-pulse delay-700"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="relative z-1 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] flex items-center justify-center shadow-2xl ring-1 ring-white/30">
            <Store size={48} className="text-white drop-shadow-md" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
              Kirana Pro
            </h1>
            <p className="text-blue-100/80 text-xl font-medium">
              किराना प्रो
            </p>
          </div>
        </div>

        {/* Diagonal Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#faf8ff] clip-path-wave"></div>
      </div>

      {/* Login Card Container */}
      <div className="px-6 -mt-20 relative z-10 max-w-md mx-auto w-full pb-12 flex-1">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(30,58,138,0.12)] border border-slate-100 animate-in slide-in-from-bottom-12 duration-700">
          
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1e3a8a] text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100/50">
              <ShieldCheck size={12} />
              <span>{isHindi ? 'मैनेजर पोर्टल' : 'Manager Portal'}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {t('common.login')} {t('Shopkeeper')}
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            {/* Input Field (Phone or Email) */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                <span>{isHindi ? 'मोबाइल या ईमेल' : 'Mobile or Email'}</span>
                <span className="text-slate-300 font-medium">फ़ोन / ईमेल</span>
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a] transition-colors">
                  <Phone size={20} />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder={isHindi ? 'नंबर या ईमेल दर्ज करें' : 'Enter number or email'}
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1e3a8a]/5 focus:bg-white focus:border-[#1e3a8a] transition-all text-slate-900 font-semibold placeholder:text-slate-300 text-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                <span>Password</span>
                <span className="text-slate-300 font-medium">पासवर्ड</span>
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1e3a8a] transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1e3a8a]/5 focus:bg-white focus:border-[#1e3a8a] transition-all text-slate-900 font-semibold placeholder:text-slate-300 text-lg tracking-widest"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end -mt-2">
              <button type="button" className="text-xs font-bold text-[#1e3a8a] hover:opacity-70 transition-opacity">
                {isHindi ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-[#1e3a8a] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(30,58,138,0.25)] active:scale-[0.97] hover:bg-[#1e3a8a]/95 transition-all disabled:opacity-70 disabled:active:scale-100 relative overflow-hidden group"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10">{isHindi ? 'लॉगिन करें' : 'Sign In'}</span>
                    <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 py-2">
                <div className="h-px flex-1 bg-slate-100"></div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{isHindi ? 'या' : 'OR'}</span>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>

              <button 
                type="button"
                onClick={handleOTPLogin}
                className="w-full h-14 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-[0.97] transition-all shadow-sm"
              >
                <Fingerprint size={20} className="text-[#1e3a8a]" />
                <span>{isHindi ? 'ओटीपी से लॉगिन' : 'Login with OTP'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Navigation / Help */}
        <div className="mt-10 flex flex-col items-center gap-6 animate-in fade-in duration-1000 delay-300">
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-400 text-xs font-medium">
              {isHindi ? 'अकाउंट नहीं है?' : "Don't have an account?"}
            </p>
            <button className="text-[#1e3a8a] font-bold text-sm hover:underline">
              {isHindi ? 'नया स्टोर रजिस्टर करें' : 'Register New Store'}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200/50 w-full flex justify-center gap-6">
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600">Help | मदद</button>
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600">Privacy | गोपनीयता</button>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <style jsx>{`
        .clip-path-wave {
          clip-path: polygon(0 40%, 100% 0, 100% 100%, 0% 100%);
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
