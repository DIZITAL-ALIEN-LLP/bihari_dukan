'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MetricCard from '@/components/MetricCard';
import { TrendingUp, AlertTriangle, Clock, PlusCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { productsApi } from '@/lib/api';
import { Product } from '@/shared/types';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function Home() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    todaySales: 0,
    todayProfit: 0,
    cashBalance: 0,
    lowStockCount: 0,
    expiryCount: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      let products: Product[] = [];
      if (isSupabaseConfigured) {
        products = await productsApi.getAll();
      }

      const hasProducts = products && products.length > 0;
      const lowStock = hasProducts ? products.filter(p => p.current_stock <= p.min_stock_alert).length : 2;
      
      // Calculate expiry count (mock logic for now)
      const now = new Date();
      const expiryCount = hasProducts 
        ? products.filter(p => p.expiry_date && new Date(p.expiry_date) <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)).length
        : 1;

      // In a real app, these would come from a summary RPC or more complex query
      setMetrics({
        todaySales: 12450, // Placeholder
        todayProfit: 2100, // Placeholder
        cashBalance: 8320, // Placeholder
        lowStockCount: lowStock,
        expiryCount: expiryCount
      });
    } catch (err: any) {
      if (isSupabaseConfigured) {
        console.error('Error fetching dashboard data:', err?.message || err);
      }
      // Fallback metrics for demo
      setMetrics({
        todaySales: 12450,
        todayProfit: 2100,
        cashBalance: 8320,
        lowStockCount: 2,
        expiryCount: 1
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section>
        <MetricCard
          title={t('common.today_sales')}
          value={`₹${metrics.todaySales.toLocaleString()}`}
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
          value={`₹${metrics.todayProfit.toLocaleString()}`}
          variant="success"
        />
        <MetricCard
          title={t('common.cash_balance')}
          value={`₹${metrics.cashBalance.toLocaleString()}`}
        />
      </section>

      {/* Alerts Row */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span>Alerts</span>
        </h2>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Link href="/stock?filter=low_stock" className="flex-shrink-0 w-40 p-3 bg-alert border border-alert-foreground/10 rounded-xl flex flex-col gap-1 active:scale-95 transition-transform">
            <div className="flex items-center gap-2 text-alert-foreground">
              <AlertTriangle size={16} />
              <span className="text-xs font-bold uppercase tracking-tight">{t('common.low_stock')}</span>
            </div>
            <span className="text-lg font-bold text-slate-900">{metrics.lowStockCount} Items</span>
          </Link>
          
          <div className="flex-shrink-0 w-40 p-3 bg-orange-50 border border-orange-200 rounded-xl flex flex-col gap-1">
            <div className="flex items-center gap-2 text-orange-600">
              <Clock size={16} />
              <span className="text-xs font-bold uppercase tracking-tight">{t('common.expiry_alert')}</span>
            </div>
            <span className="text-lg font-bold text-slate-900">{metrics.expiryCount} Items</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span>Quick Actions</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/billing" className="flex flex-col items-center justify-center gap-2 p-4 bg-primary text-white rounded-2xl shadow-lg active:scale-95 transition-transform">
            <PlusCircle size={24} />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-tight">{t('common.new_bill')}</span>
            </div>
          </Link>
          
          <Link href="/stock/add" className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 text-primary rounded-2xl shadow-sm active:scale-95 transition-transform">
            <PlusCircle size={24} className="text-secondary" />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-tight text-slate-700">{t('common.add_stock')}</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
