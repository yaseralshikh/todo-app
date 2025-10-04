'use client';

import { motion } from 'framer-motion';
import { CheckSquare, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

export function Header() {
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4 py-6"
    >
      {/* Glass morphism header */}
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg">
            <CheckSquare className="h-8 w-8 text-white" />
          </div>
          <div className="pr-3">
            <h1 className="text-2xl font-bold text-white">
              قائمة المهام
            </h1>
            <p className="text-sm text-gray-300">
              نظم مهامك اليومية بسهولة
            </p>
          </div>
        </motion.div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {user ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* User Info */}
              <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="pr-3 text-sm">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-gray-300">{user.email}</p>
                </div>
              </div>

              {/* Settings Button */}
              <Link href="/settings">
                <motion.button
                  className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="الإعدادات"
                >
                  <Settings className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                </motion.button>
              </Link>

              {/* Sign Out Button */}
              <motion.button
                onClick={handleSignOut}
                className="p-2 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-red-500/20 hover:border-red-400/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="تسجيل الخروج"
              >
                <LogOut className="h-5 w-5 text-gray-400 hover:text-red-400 transition-colors" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <motion.a
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تسجيل الدخول
              </motion.a>
              <motion.a
                href="/auth/signup"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                إنشاء حساب
              </motion.a>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
      </div>
    </motion.header>
  );
}
