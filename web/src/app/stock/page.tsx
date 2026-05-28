'use client';

import React, { useState, useEffect } from 'react';
import SearchFilter from '@/components/SearchFilter';
import ProductCard from '@/components/ProductCard';
import { Plus, Loader2 } from 'lucide-react';
import { Product } from '@/shared/types';
import Link from 'next/link';
import { productsApi } from '@/lib/api';
import { isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: Product[] = [];
      if (isSupabaseConfigured) {
        data = await productsApi.getAll();
      }
      
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(MOCK_PRODUCTS);
      }
    } catch (err: any) {
      if (isSupabaseConfigured) {
        console.error('Detailed fetch error:', err?.message || err);
        setError(err.message || 'Unknown connection error');
      }
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'low_stock' && product.current_stock <= product.min_stock_alert) ||
      product.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  if (loading && products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SearchFilter 
        onSearch={setSearchQuery} 
        onFilter={setActiveFilter} 
        activeFilter={activeFilter} 
      />

      {error && !products.length && (
        <div className="bg-alert p-4 rounded-2xl text-alert-foreground text-sm font-bold flex flex-col gap-2">
          <span>{error}</span>
          <button onClick={fetchProducts} className="underline text-left">Try Again</button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {filteredProducts.length === 0 && !loading && (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
            <span className="text-sm font-medium italic">No products found</span>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link 
        href="/stock/add"
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <Plus size={28} />
      </Link>
    </div>
  );
}
