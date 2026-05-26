'use client';

import React, { useEffect, useState } from 'react';
import '../i18n/config';
import TopAppBar from '@/components/TopAppBar';
import BottomNavBar from '@/components/BottomNavBar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <div className={`${inter.variable} font-sans min-h-screen bg-background`}>
        {children}
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div className={`${inter.variable} font-sans min-h-screen bg-background`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`${inter.variable} font-sans min-h-screen bg-background pb-20 pt-16`}>
      <TopAppBar />
      <main className="p-4 max-w-lg mx-auto">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
}
