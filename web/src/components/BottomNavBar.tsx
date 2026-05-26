import React from 'react';
import { Home, Receipt, Package, BarChart3, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavBar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'home', hi: 'home_hi', path: '/' },
    { icon: Receipt, label: 'billing', hi: 'billing_hi', path: '/billing' },
    { icon: Package, label: 'stock', hi: 'stock_hi', path: '/stock' },
    { icon: BarChart3, label: 'reports', hi: 'reports_hi', path: '/reports' },
    { icon: Users, label: 'staff', hi: 'staff_hi', path: '/staff' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around px-2 pb-safe z-50">
      {navItems.map((item) => {
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
            <div className="flex flex-col items-center -gap-1">
              <span className="text-[10px] font-bold leading-none uppercase tracking-tighter">
                {t(`common.${item.label}`)}
              </span>
              <span className="text-[9px] font-medium leading-none">
                {t(`common.${item.hi}`)}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
