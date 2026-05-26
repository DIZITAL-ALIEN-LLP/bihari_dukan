import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  activeFilter: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter, activeFilter }) => {
  const { t } = useTranslation();

  const filters = [
    { id: 'all', label: 'all', hi: 'all_hi' },
    { id: 'low_stock', label: 'low_stock', hi: 'low_stock_hi' },
    { id: 'grocery', label: 'grocery', hi: 'grocery_hi' },
    { id: 'dairy', label: 'dairy', hi: 'dairy_hi' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder={t('common.search_products')}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl border transition-all flex flex-col items-center min-w-[70px] ${
                isActive 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-white border-slate-200 text-slate-600 active:bg-slate-50'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-tight leading-none">
                {t(`common.${filter.label}`)}
              </span>
              <span className={`text-[9px] font-medium leading-none mt-0.5 ${isActive ? 'opacity-80' : 'text-slate-400'}`}>
                {t(`common.${filter.hi}`)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFilter;
