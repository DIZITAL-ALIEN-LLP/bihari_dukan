'use client';

import React, { useEffect, useState } from 'react';
import '../i18n/config';
import TopAppBar from '@/components/TopAppBar';
import BottomNavBar from '@/components/BottomNavBar';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoginPage = pathname === '/login';

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background font-sans">
        {children}
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-background font-sans">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-16 font-sans">
      <TopAppBar />
      <main className="p-4 max-w-lg mx-auto">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
}
