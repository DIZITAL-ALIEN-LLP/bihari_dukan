import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Kirana Smart Manager",
  description: "Modern Inventory Management and POS for Indian Retail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
