'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchFilter from '@/components/SearchFilter';
import ProductCard from '@/components/ProductCard';
import { Plus } from 'lucide-react';
import { Product } from '@/shared/types';
import Link from 'next/link';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Amul Milk (1L)',
    name_hi: 'अमूल दूध (1ली)',
    category: 'dairy',
    purchase_price: 60,
    selling_price: 64,
    current_stock: 42,
    min_stock_alert: 10,
    expiry_date: '2026-06-01',
    unit: 'pcs',
  },
  {
    id: '2',
    name: 'Fortune Oil (1L)',
    name_hi: 'फॉर्च्यून तेल (1ली)',
    category: 'grocery',
    purchase_price: 140,
    selling_price: 155,
    current_stock: 5,
    min_stock_alert: 10,
    unit: 'pcs',
  },
  {
    id: '3',
    name: 'Aashirvaad Atta (5kg)',
    name_hi: 'आशीर्वाद आटा (5किग्रा)',
    category: 'grocery',
    purchase_price: 240,
    selling_price: 265,
    current_stock: 15,
    min_stock_alert: 5,
    unit: 'pcs',
  },
  {
    id: '4',
    name: 'Britannia Bread',
    name_hi: 'ब्रिटानिया ब्रेड',
    category: 'dairy',
    purchase_price: 35,
    selling_price: 40,
    current_stock: 8,
    min_stock_alert: 15,
    expiry_date: '2026-05-28',
    unit: 'pcs',
  },
];

export default function StockPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name_hi.includes(searchQuery);
    
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'low_stock' && product.current_stock <= product.min_stock_alert) ||
      product.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      <SearchFilter 
        onSearch={setSearchQuery} 
        onFilter={setActiveFilter} 
        activeFilter={activeFilter} 
      />

      <div className="flex flex-col gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {filteredProducts.length === 0 && (
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
