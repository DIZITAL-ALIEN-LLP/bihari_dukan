'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Save, IndianRupee, Package, Calendar, Trash2 } from 'lucide-react';

export default function EditProductPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [formData, setFormData] = useState({
    name: '',
    name_hi: '',
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
    // In a real app, fetch product by ID from Supabase
    // For MVP, we'll simulate fetching mock data
    if (productId === '1') {
      setFormData({
        name: 'Amul Milk (1L)',
        name_hi: 'अमूल दूध (1ली)',
        category: 'dairy',
        barcode: '123456789',
        purchase_price: 60,
        selling_price: 64,
        current_stock: 42,
        min_stock_alert: 10,
        expiry_date: '2026-06-01',
        unit: 'pcs',
      });
    }
  }, [productId]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating product:', productId, formData);
    router.back();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product:', productId);
      router.back();
    }
  };

  const inputClass = "w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all";
  const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block px-1";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 active:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg text-slate-900 leading-none">Edit Product</h1>
            <span className="text-xs font-medium text-slate-400">सामान की जानकारी बदलें</span>
          </div>
        </div>
        <button 
          onClick={handleDelete}
          className="w-10 h-10 rounded-full bg-alert text-alert-foreground flex items-center justify-center active:scale-95 transition-transform"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Product Info Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary/10 pb-1">
            Product Info | सामान की जानकारी
          </h2>
          
          <div>
            <label className={labelClass}>Product Name | नाम</label>
            <input 
              type="text" 
              required
              className={inputClass}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className={labelClass}>Hindi Name | हिंदी नाम</label>
            <input 
              type="text" 
              className={inputClass}
              value={formData.name_hi}
              onChange={(e) => setFormData({...formData, name_hi: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category | श्रेणी</label>
              <select 
                className={inputClass}
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="grocery">Grocery | किराना</option>
                <option value="dairy">Dairy | डेयरी</option>
                <option value="snacks">Snacks | स्नैक्स</option>
                <option value="other">Other | अन्य</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Barcode | बारकोड</label>
              <input 
                type="text" 
                className={inputClass}
                value={formData.barcode}
                onChange={(e) => setFormData({...formData, barcode: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary/10 pb-1">
            Pricing | कीमत
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Purchase | खरीद मूल्य</label>
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
              <label className={labelClass}>Selling | बिक्री मूल्य</label>
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
            Stock | स्टॉक
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Current | वर्तमान स्टॉक</label>
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
              <label className={labelClass}>Min Alert | कम स्टॉक अलर्ट</label>
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
            <label className={labelClass}>Expiry Date | समाप्ति तिथि</label>
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
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all mt-4"
        >
          <Save size={20} />
          <span>Update Product | जानकारी अपडेट करें</span>
        </button>
      </form>
      
      <div className="h-4" /> {/* Spacer */}
    </div>
  );
}
