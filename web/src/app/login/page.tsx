'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Store, Phone, Lock, ArrowRight, Chrome } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone}`,
      });
      if (error) throw error;
      setStep('otp');
    } catch (error: any) {
      console.error('Error sending OTP:', error.message);
      alert('Failed to send OTP: ' + error.message);
      // Fallback for testing/dev if Supabase isn't fully set up for phone
      if (phone === '9876543210') setStep('otp');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone.startsWith('+') ? phone : `+91${phone}`,
        token: otp,
        type: 'sms',
      });
      if (error) throw error;
      router.push('/');
    } catch (error: any) {
      console.error('Error verifying OTP:', error.message);
      alert('Failed to verify OTP: ' + error.message);
      // Fallback for testing/dev
      if (otp === '123456') router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error logging in with Google:', error.message);
      alert('Failed to login with Google: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all pl-12";
  const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block px-1";

  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-3xl flex items-center justify-center shadow-sm border border-blue-100">
            <Store size={32} />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-black text-primary leading-tight">Kirana Smart Manager</h1>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col gap-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>{t('common.login')}</span>
          </h2>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-sm active:bg-slate-50 transition-all disabled:opacity-50"
            >
              <Chrome size={20} className="text-blue-500" />
              <span>Login with Google</span>
            </button>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[10px] font-bold text-slate-300 uppercase">Demo Access</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => router.push('/')}
                className="bg-blue-50 text-primary py-3 rounded-xl text-xs font-bold border border-blue-100 active:bg-blue-100 transition-all"
              >
                Owner Login
              </button>
              <button 
                onClick={() => {
                  // In a real app, this would set a session/cookie
                  router.push('/');
                }}
                className="bg-slate-50 text-slate-600 py-3 rounded-xl text-xs font-bold border border-slate-100 active:bg-slate-100 transition-all"
              >
                Staff Login
              </button>
            </div>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[10px] font-bold text-slate-300 uppercase">OR</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>{t('common.phone_number')}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel" 
                      required
                      placeholder="98765 43210"
                      className={inputClass}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
                >
                  <span>{t('common.send_otp')}</span>
                  <ArrowRight size={20} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 animate-in slide-in-from-right-4 duration-300">
                <div>
                  <label className={labelClass}>{t('common.enter_otp')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="number" 
                      required
                      placeholder="123456"
                      className={inputClass}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-secondary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
                >
                  <span>{t('common.verify_otp')}</span>
                  <ArrowRight size={20} />
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs font-bold text-primary text-center mt-2 hover:underline"
                >
                  Change Phone Number
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-400 font-medium px-8 leading-relaxed">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
