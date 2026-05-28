'use client';

import React, { useState, useEffect } from 'react';
import { Home, Receipt, Package, BarChart3, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';

const BottomNavBar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [role, setRole] = useState<'owner' | 'staff' | 'cashier'>('owner');

  useEffect(() => {
    const fetchRole = async () => {
      const user = await getCurrentUser();
      if (user?.profile?.role) {
        setRole(user.profile.role as any);
      }
    };
    fetchRole();
  }, []);

  const navItems = [
    { icon: Home, label: 'home', path: '/' },
    { icon: Receipt, label: 'billing', path: '/billing' },
    { icon: Package, label: 'stock', path: '/stock' },
    { icon: BarChart3, label: 'reports', path: '/reports', ownerOnly: true },
    { icon: Users, label: 'staff', path: '/staff', ownerOnly: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around px-2 pb-safe z-50">
      {navItems.filter(item => !item.ownerOnly || role === 'owner').map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-slate-500'
            }`}
          >
            <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-blue-50' : ''}`}>
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold leading-none uppercase tracking-tighter">
              {t(`common.${item.label}`)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
