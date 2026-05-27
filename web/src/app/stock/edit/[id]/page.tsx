'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Save, IndianRupee, Package, Calendar, Trash2, Loader2 } from 'lucide-react';
import { productsApi } from '@/lib/api';

export default function EditProductPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getById(productId);
      if (data) {
        setFormData({
          name: data.name,
          category: data.category,
          barcode: data.barcode || '',
          purchase_price: data.purchase_price,
          selling_price: data.selling_price,
          current_stock: data.current_stock,
          min_stock_alert: data.min_stock_alert,
          expiry_date: data.expiry_date || '',
          unit: data.unit,
        });
      } else {
        throw new Error('Product not found');
      }
    } catch (err: any) {
      console.error('Error fetching product:', err);
      // Fallback to mock data for demo
      const mockProduct = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
      if (mockProduct) {
        setFormData({
          name: mockProduct.name,
          category: mockProduct.category,
          barcode: mockProduct.barcode || '',
          purchase_price: mockProduct.purchase_price,
          selling_price: mockProduct.selling_price,
          current_stock: mockProduct.current_stock,
          min_stock_alert: mockProduct.min_stock_alert,
          expiry_date: mockProduct.expiry_date || '',
          unit: mockProduct.unit,
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
      setSaving(true);
      await productsApi.update(productId, {
        ...formData,
        barcode: formData.barcode || null,
        expiry_date: formData.expiry_date || null,
      });
      router.push('/stock');
    } catch (err: any) {
      console.error('Error updating product:', err);
      alert('Failed to update product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setSaving(true);
        await productsApi.delete(productId);
        router.push('/stock');
      } catch (err: any) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product: ' + err.message);
        setSaving(false);
      }
    }
  };

  const inputClass = "w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all";
  const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block px-1";

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

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
          </div>
        </div>
        <button 
          onClick={handleDelete}
          disabled={saving}
          className="w-10 h-10 rounded-full bg-alert text-alert-foreground flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50"
        >
          <Trash2 size={20} />
        </button>
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
          disabled={saving}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          <span>Update Product</span>
        </button>
      </form>
      
      <div className="h-4" /> {/* Spacer */}
    </div>
  );
}

const MOCK_PRODUCTS: any[] = [
  {
    id: '1',
    name: 'Amul Milk (1L)',
    category: 'dairy',
    purchase_price: 60,
    selling_price: 64,
    current_stock: 42,
    min_stock_alert: 10,
    expiry_date: '2026-06-01',
    unit: 'pcs',
    barcode: '123456789'
  },
  {
    id: '2',
    name: 'Fortune Oil (1L)',
    category: 'grocery',
    purchase_price: 140,
    selling_price: 155,
    current_stock: 5,
    min_stock_alert: 10,
    unit: 'pcs',
    expiry_date: null,
    barcode: null
  },
];
