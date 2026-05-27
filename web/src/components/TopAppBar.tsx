'use client';

import React from 'react';
import { Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TopAppBar = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-2">
        <Store className="text-primary w-6 h-6" />
        <h1 className="font-bold text-lg flex items-center gap-2">
          <span className="text-primary">{t('common.brand_name')}</span>
        </h1>
      </div>
      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
        JD
      </div>
    </header>
  );
};

export default TopAppBar;
