'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, Shield, User, Phone, MoreVertical, Trash2, Edit2 } from 'lucide-react';

export default function StaffPage() {
  const { t } = useTranslation();

  const mockStaff = [
    { id: '1', name: 'Rahul Kumar', role: 'owner', phone: '+91 98765 43210', initial: 'RK' },
    { id: '2', name: 'Amit Singh', role: 'cashier', phone: '+91 87654 32109', initial: 'AS' },
    { id: '3', name: 'Priya Devi', role: 'staff', phone: '+91 76543 21098', initial: 'PD' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-slate-900 leading-tight">Staff Management</h1>
        </div>
        <button className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-transform">
          <UserPlus size={24} />
        </button>
      </div>

      {/* Role Summary */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex-shrink-0 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3 min-w-[140px]">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Shield size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900">1</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Owner</span>
          </div>
        </div>
        <div className="flex-shrink-0 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3 min-w-[140px]">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900">2</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Staff</span>
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span>Active Team</span>
        </h2>

        <div className="flex flex-col gap-3">
          {mockStaff.map((staff) => (
            <div key={staff.id} className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm ${
                  staff.role === 'owner' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {staff.initial}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{staff.name}</span>
                    {staff.role === 'owner' && (
                      <span className="text-[8px] font-black bg-blue-100 text-primary px-1.5 py-0.5 rounded-full uppercase">Owner</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Phone size={10} />
                    <span className="text-[10px] font-medium">{staff.phone}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-slate-600 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Staff Hint */}
      <div className="bg-blue-50/50 border border-dashed border-blue-200 rounded-3xl p-6 flex flex-col items-center text-center gap-3 mt-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
          <Shield size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-900">Add a Cashier</span>
          <span className="text-xs font-medium text-slate-500 px-4">
            Give your staff access to billing without showing them your total profit.
          </span>
        </div>
        <button className="text-xs font-black text-primary uppercase tracking-wider mt-1">
          Learn More
        </button>
      </div>

      <div className="h-4" />
    </div>
  );
}
