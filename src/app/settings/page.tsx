'use client';

import { motion } from 'framer-motion';
import { ArrowRight, User, Bell, Shield, Palette, Globe } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function SettingsPage() {
  const { user } = useAuth();

  const settingsSections = [
    {
      title: 'الملف الشخصي',
      icon: User,
      description: 'إدارة معلوماتك الشخصية',
      items: [
        { name: 'الاسم', value: user?.name || 'غير محدد' },
        { name: 'البريد الإلكتروني', value: user?.email || 'غير محدد' },
      ]
    },
    {
      title: 'الإشعارات',
      icon: Bell,
      description: 'تخصيص الإشعارات والإعلانات',
      items: [
        { name: 'إشعارات البريد الإلكتروني', value: 'مفعلة' },
        { name: 'تذكيرات المهام', value: 'مفعلة' },
      ]
    },
    {
      title: 'الأمان',
      icon: Shield,
      description: 'إدارة الأمان والخصوصية',
      items: [
        { name: 'تغيير كلمة المرور', value: 'آمنة' },
        { name: 'جلسات نشطة', value: '1 جلسة' },
      ]
    },
    {
      title: 'المظهر',
      icon: Palette,
      description: 'تخصيص مظهر التطبيق',
      items: [
        { name: 'الوضع', value: 'ليلي/نهاري' },
        { name: 'اللغة', value: 'العربية' },
      ]
    },
    {
      title: 'عام',
      icon: Globe,
      description: 'الإعدادات العامة للتطبيق',
      items: [
        { name: 'إصدار التطبيق', value: '1.0.0' },
        { name: 'تاريخ آخر تحديث', value: 'ديسمبر 2024' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto px-4 py-6"
      >
        <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/">
                <motion.button
                  className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="العودة للصفحة الرئيسية"
                >
                  <ArrowRight className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">الإعدادات</h1>
                <p className="text-sm text-gray-300">إدارة إعدادات حسابك وتفضيلاتك</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="space-y-8">
              {settingsSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border border-white/10 rounded-xl p-6 bg-black/10"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500">
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                      <p className="text-sm text-gray-300">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center py-2 px-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
                      >
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-cyan-400 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 pt-6 border-t border-white/10 text-center"
            >
              <p className="text-gray-400 text-sm">
                تم تطوير هذا التطبيق باستخدام Next.js و React و Tailwind CSS
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
