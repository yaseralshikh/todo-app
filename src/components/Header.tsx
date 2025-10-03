'use client';

import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto px-4 py-6"
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
            <CheckSquare className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              قائمة المهام
            </h1>
            <p className="text-sm text-muted-foreground">
              نظم مهامك اليومية بسهولة
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
}
