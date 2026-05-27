'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../shared/types';
import { Package, Plus, Edit2 } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onAddStock?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddStock }) => {
  const { t } = useTranslation();
  const isLowStock = product.current_stock <= product.min_stock_alert;

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLowStock ? 'bg-alert text-alert-foreground' : 'bg-blue-50 text-primary'}`}>
        <Package size={24} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex flex-col -gap-1">
          <span className="font-bold text-slate-900 truncate">{product.name}</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isLowStock ? 'bg-alert text-alert-foreground' : 'bg-secondary/10 text-secondary'}`}>
            {product.current_stock} {t(`common.${product.unit}`)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/stock/edit/${product.id}`}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 active:bg-slate-50 transition-colors"
        >
          <Edit2 size={16} />
        </Link>
        <button
          onClick={() => onAddStock?.(product.id)}
          className="w-9 h-9 rounded-full border border-slate-100 bg-blue-50/50 flex items-center justify-center text-primary active:bg-blue-100 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
