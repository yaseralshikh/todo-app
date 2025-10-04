import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { AuthProvider } from '@/components/AuthProvider';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "قائمة المهام - Todo App",
  description: "تطبيق ويب لإدارة المهام اليومية مع واجهة عصرية وتصميم متجاوب",
  keywords: ["todo", "tasks", "productivity", "arabic", "مهام", "إنتاجية"],
  authors: [{ name: "Todo App" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${inter.variable} ${cairo.variable} font-sans antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
