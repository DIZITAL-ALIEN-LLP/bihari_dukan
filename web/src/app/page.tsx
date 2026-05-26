'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import MetricCard from '@/components/MetricCard';
import { TrendingUp, AlertTriangle, Clock, PlusCircle } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <section>
        <MetricCard
          title={t('common.today_sales')}
          titleHi={t('common.today_sales_hi')}
          value="₹12,450"
          indicator={
            <div className="flex items-center gap-1 text-secondary text-xs font-bold">
              <TrendingUp size={14} />
              <span>+12% from yesterday</span>
            </div>
          }
        />
      </section>

      {/* Secondary Metrics */}
      <section className="grid grid-cols-2 gap-4">
        <MetricCard
          title={t('common.today_profit')}
          titleHi={t('common.today_profit_hi')}
          value="₹2,100"
          variant="success"
        />
        <MetricCard
          title={t('common.cash_balance')}
          titleHi={t('common.cash_balance_hi')}
          value="₹8,320"
        />
      </section>

      {/* Alerts Row */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span>Alerts</span>
          <span className="text-slate-300 font-normal">|</span>
          <span className="font-medium text-[10px]">चेतावनी</span>
        </h2>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex-shrink-0 w-40 p-3 bg-alert border border-alert-foreground/10 rounded-xl flex flex-col gap-1">
            <div className="flex items-center gap-2 text-alert-foreground">
              <AlertTriangle size={16} />
              <span className="text-xs font-bold uppercase tracking-tight">{t('common.low_stock')}</span>
            </div>
            <span className="text-lg font-bold text-slate-900">12 Items</span>
          </div>
          
          <div className="flex-shrink-0 w-40 p-3 bg-orange-50 border border-orange-200 rounded-xl flex flex-col gap-1">
            <div className="flex items-center gap-2 text-orange-600">
              <Clock size={16} />
              <span className="text-xs font-bold uppercase tracking-tight">{t('common.expiry_alert')}</span>
            </div>
            <span className="text-lg font-bold text-slate-900">4 Items</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span>Quick Actions</span>
          <span className="text-slate-300 font-normal">|</span>
          <span className="font-medium text-[10px]">त्वरित कार्रवाई</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center gap-2 p-4 bg-primary text-white rounded-2xl shadow-lg active:scale-95 transition-transform">
            <PlusCircle size={24} />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-tight">{t('common.new_bill')}</span>
              <span className="text-[10px] font-medium opacity-80">{t('common.new_bill_hi')}</span>
            </div>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 text-primary rounded-2xl shadow-sm active:scale-95 transition-transform">
            <PlusCircle size={24} className="text-secondary" />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-tight text-slate-700">{t('common.add_stock')}</span>
              <span className="text-[10px] font-medium text-slate-400">{t('common.add_stock_hi')}</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
