'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Store, Phone, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP send
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verify and login
    router.push('/');
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
            <span className="text-sm font-bold text-slate-400">किराना स्मार्ट मैनेजर</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span>{t('common.login')}</span>
            <span className="text-slate-300 font-normal">|</span>
            <span className="text-sm font-medium text-slate-400">{t('common.login_hi')}</span>
          </h2>

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>{t('common.phone_number')} | {t('common.phone_number_hi')}</label>
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
                <span>{t('common.send_otp')} | {t('common.send_otp_hi')}</span>
                <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className={labelClass}>{t('common.enter_otp')} | {t('common.enter_otp_hi')}</label>
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
                <span>{t('common.verify_otp')} | {t('common.verify_otp_hi')}</span>
                <ArrowRight size={20} />
              </button>
              <button 
                type="button"
                onClick={() => setStep('phone')}
                className="text-xs font-bold text-primary text-center mt-2 hover:underline"
              >
                Change Phone Number | नंबर बदलें
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-400 font-medium px-8 leading-relaxed">
          By logging in, you agree to our Terms of Service and Privacy Policy. 
          लॉगिन करके आप हमारी सेवा की शर्तों से सहमत होते हैं।
        </p>
      </div>
    </div>
  );
}
