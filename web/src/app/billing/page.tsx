'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/shared/types';
import { Search, ScanBarcode, Minus, Plus, Trash2, Banknote, QrCode, Loader2 } from 'lucide-react';
import { productsApi, salesApi } from '@/lib/api';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function BillingPage() {
  const { t } = useTranslation();
  const { items, addItem, removeItem, clearCart, total } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let data: Product[] = [];
      if (isSupabaseConfigured) {
        data = await productsApi.getAll();
      }

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        console.log(isSupabaseConfigured ? 'No products found, using mock data...' : 'Supabase not configured, using mock data...');
        setProducts(MOCK_PRODUCTS);
      }
    } catch (err: any) {
      if (isSupabaseConfigured) {
        console.error('Error fetching products:', err?.message || err);
      }
      // Fallback to mock data for demo
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompleteSale = async () => {
    if (!paymentMethod || items.length === 0) return;
    
    try {
      // In a real app, get owner_id from auth
      const owner_id = '1'; 
      
      await salesApi.create({
        owner_id,
        cashier_id: null,
        total_amount: total,
        payment_method: paymentMethod,
      }, items);

      clearCart();
      setPaymentMethod(null);
      alert('Sale Completed Successfully!');
    } catch (err: any) {
      console.error('Error completing sale:', err);
      alert('Failed to complete sale: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Search & Scan */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder={t('common.search_products')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
          />
        </div>
        <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-primary shadow-sm active:bg-slate-50 transition-colors">
          <ScanBarcode size={24} />
        </button>
      </div>

      {/* Frequently Sold / Search Results */}
      {searchQuery ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs italic">No items found</div>
          ) : (
            filteredProducts.map((product) => (
              <button 
                key={product.id}
                onClick={() => {
                  addItem(product, 1);
                  setSearchQuery('');
                }}
                className="w-full p-4 flex items-center justify-between active:bg-slate-50 transition-colors"
              >
                <div className="flex flex-col items-start min-w-0">
                  <span className="font-bold text-slate-900 text-sm truncate">{product.name}</span>
                </div>
                <span className="font-bold text-primary">₹{product.selling_price}</span>
              </button>
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span>Fast Select</span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {loading ? (
              <div className="col-span-2 py-8 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
            ) : (
              products.slice(0, 4).map((product) => (
                <button
                  key={product.id}
                  onClick={() => addItem(product, 1)}
                  className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
                >
                  <span className="text-xs font-bold text-slate-800 text-center leading-tight truncate w-full">{product.name}</span>
                  <span className="font-black text-primary text-sm">₹{product.selling_price}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Cart Summary */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-0">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span>Cart</span>
        </h2>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2 border-2 border-dashed border-slate-200 rounded-3xl p-8">
            <span className="text-sm font-medium italic">Your cart is empty</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => {
              const product = products.find(p => p.id === item.product_id) || MOCK_PRODUCTS.find(p => p.id === item.product_id);
              if (!product) return null;
              return (
                <div key={item.product_id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="flex-1 flex flex-col min-w-0">
                    <span className="font-bold text-slate-900 text-sm truncate">{product.name}</span>
                    <span className="text-xs font-bold text-primary">₹{item.price_at_sale}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1">
                    <button 
                      onClick={() => item.quantity > 1 ? addItem(product, -1) : removeItem(product.id)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 active:scale-90 transition-transform"
                    >
                      {item.quantity > 1 ? <Minus size={16} /> : <Trash2 size={16} className="text-alert-foreground" />}
                    </button>
                    <span className="font-bold text-slate-900 min-w-[20px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => addItem(product, 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-primary active:scale-90 transition-transform"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment Footer */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-between items-end px-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Amount</span>
          </div>
          <span className="text-3xl font-black text-slate-900 leading-none">₹{total}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setPaymentMethod('cash')}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
              paymentMethod === 'cash' 
                ? 'bg-primary border-primary text-white shadow-lg scale-[1.02]' 
                : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            <Banknote size={24} />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-tight">{t('common.cash')}</span>
            </div>
          </button>
          
          <button 
            onClick={() => setPaymentMethod('upi')}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
              paymentMethod === 'upi' 
                ? 'bg-primary border-primary text-white shadow-lg scale-[1.02]' 
                : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            <QrCode size={24} />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-tight">{t('common.upi')}</span>
            </div>
          </button>
        </div>

        <button 
          disabled={!paymentMethod || items.length === 0}
          onClick={handleCompleteSale}
          className="w-full bg-secondary text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all uppercase tracking-wide"
        >
          <span>{t('common.complete_sale')}</span>
        </button>
      </div>
    </div>
  );
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    owner_id: '1',
    name: 'Amul Milk (1L)',
    category: 'dairy',
    purchase_price: 60,
    selling_price: 64,
    current_stock: 42,
    min_stock_alert: 10,
    unit: 'pcs',
    barcode: null,
    expiry_date: null
  },
];
