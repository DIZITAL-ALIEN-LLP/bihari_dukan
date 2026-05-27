'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, DollarSign, Calendar, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import MetricCard from '@/components/MetricCard';

export default function ReportsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'reports' | 'expenses'>('reports');

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Page Header & Tab Switcher */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-slate-900 leading-tight">Reports & Expenses</h1>
          </div>
          <button className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm active:bg-slate-50 transition-colors">
            <Calendar size={20} />
          </button>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-2xl">
          <button 
            onClick={() => setActiveTab('reports')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'reports' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'
            }`}
          >
            REPORTS
          </button>
          <button 
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'expenses' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'
            }`}
          >
            EXPENSES
          </button>
        </div>
      </div>

      {activeTab === 'reports' ? (
        <div className="flex flex-col gap-6">
          {/* Monthly Summary Card */}
          <div className="bg-primary text-white p-6 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Net Profit This Month</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black">₹42,850</span>
                <div className="flex items-center text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                  <ArrowUpRight size={10} />
                  <span>14%</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10">
              <TrendingUp size={120} />
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Total Sales</span>
                <span className="text-lg font-black text-slate-900">₹1.2L</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <TrendingDown size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Total Cost</span>
                <span className="text-lg font-black text-slate-900">₹78.2K</span>
              </div>
            </div>
          </div>

          {/* Sales Breakdown Chart Placeholder */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <span>Category Wise Sales</span>
            </h2>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-center py-4">
                {/* Simulated Pie Chart with CSS */}
                <div className="relative w-32 h-32 rounded-full border-[16px] border-slate-100 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-r-transparent rotate-45"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-secondary border-t-transparent border-l-transparent -rotate-45"></div>
                  <PieChart className="text-slate-300" size={24} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-900">Grocery</span>
                    <span className="text-[8px] font-medium text-slate-400">₹64,200 (52%)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-900">Dairy</span>
                    <span className="text-[8px] font-medium text-slate-400">₹32,100 (26%)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-300" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-900">Snacks</span>
                    <span className="text-[8px] font-medium text-slate-400">₹14,500 (12%)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-900">Other</span>
                    <span className="text-[8px] font-medium text-slate-400">₹12,200 (10%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Expenses List */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span>Recent Expenses</span>
              </h2>
              <button className="text-[10px] font-bold text-primary uppercase underline">Add New</button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { title: 'Rent', date: 'May 10, 2026', amount: '₹15,000', icon: 'Home' },
                { title: 'Electricity', date: 'May 12, 2026', amount: '₹3,200', icon: 'Zap' },
                { title: 'Staff Salary', date: 'May 05, 2026', amount: '₹12,000', icon: 'Users' },
                { title: 'Maintenance', date: 'May 15, 2026', amount: '₹1,500', icon: 'Settings' },
              ].map((expense, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                      <DollarSign size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{expense.title}</span>
                      <span className="text-[10px] font-medium text-slate-400">{expense.date}</span>
                    </div>
                  </div>
                  <span className="font-black text-alert-foreground">{expense.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Summary Chart Placeholder */}
          <div className="bg-slate-900 text-white p-6 rounded-[2rem] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Monthly Expenses</span>
              <span className="text-2xl font-black">₹31,700</span>
            </div>
            
            <div className="flex items-end gap-2 h-20">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm transition-all ${i === 3 ? 'bg-secondary' : 'bg-slate-700'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase tracking-tighter">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="h-4" />
    </div>
  );
}
