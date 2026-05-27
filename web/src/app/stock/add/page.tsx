'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, IndianRupee, Package, Calendar, Loader2 } from 'lucide-react';
import { productsApi } from '@/lib/api';

export default function AddProductPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'grocery',
    barcode: '',
    purchase_price: 0,
    selling_price: 0,
    current_stock: 0,
    min_stock_alert: 5,
    expiry_date: '',
    unit: 'pcs',
  });

  const [margin, setMargin] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    if (formData.purchase_price > 0) {
      const p = formData.selling_price - formData.purchase_price;
      const m = (p / formData.purchase_price) * 100;
      setProfit(p);
      setMargin(m);
    } else {
      setProfit(0);
      setMargin(0);
    }
  }, [formData.purchase_price, formData.selling_price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // In a real app, get owner_id from auth
      const owner_id = '1'; 
      
      await productsApi.create({
        ...formData,
        owner_id,
        barcode: formData.barcode || null,
        expiry_date: formData.expiry_date || null,
      });
      
      router.push('/stock');
    } catch (err: any) {
      console.error('Error adding product:', err);
      alert('Failed to add product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all";
  const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block px-1";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 active:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg text-slate-900 leading-none">{t('common.add_new_product')}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Product Info Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary/10 pb-1">
            Product Info
          </h2>
          
          <div>
            <label className={labelClass}>Product Name</label>
            <input 
              type="text" 
              required
              className={inputClass}
              placeholder="e.g. Amul Milk (1L)"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select 
                className={inputClass}
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="grocery">Grocery</option>
                <option value="dairy">Dairy</option>
                <option value="snacks">Snacks</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Barcode</label>
              <input 
                type="text" 
                className={inputClass}
                placeholder="Scan or Enter"
                value={formData.barcode}
                onChange={(e) => setFormData({...formData, barcode: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary/10 pb-1">
            Pricing
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Purchase Price</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="number" 
                  required
                  className={`${inputClass} pl-8`}
                  value={formData.purchase_price || ''}
                  onChange={(e) => setFormData({...formData, purchase_price: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Selling Price</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="number" 
                  required
                  className={`${inputClass} pl-8`}
                  value={formData.selling_price || ''}
                  onChange={(e) => setFormData({...formData, selling_price: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Calculation Card */}
          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">Profit per Unit</span>
              <span className="text-lg font-bold text-slate-900">₹{profit.toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">Margin %</span>
              <span className={`text-lg font-bold ${margin >= 0 ? 'text-secondary' : 'text-alert-foreground'}`}>
                {margin.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Stock Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary/10 pb-1">
            Stock
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Current Stock</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="number" 
                  required
                  className={`${inputClass} pl-8`}
                  value={formData.current_stock || ''}
                  onChange={(e) => setFormData({...formData, current_stock: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Min Alert</label>
              <input 
                type="number" 
                required
                className={inputClass}
                value={formData.min_stock_alert || ''}
                onChange={(e) => setFormData({...formData, min_stock_alert: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Expiry Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="date" 
                className={`${inputClass} pl-8`}
                value={formData.expiry_date}
                onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          <span>Save Product</span>
        </button>
      </form>
      
      <div className="h-4" /> {/* Spacer */}
    </div>
  );
}
