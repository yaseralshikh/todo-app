'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Send } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { Todo } from '@/lib/types';

interface TodoInputProps {
  onAddTodo: (todo: Todo) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const newTodo: Todo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onAddTodo(newTodo);
      setText('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto px-4 mb-6"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="أضف مهمة جديدة..."
            className="w-full px-4 py-3 pr-12 pl-4 text-right bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
            dir="rtl"
          />
          <motion.button
            type="submit"
            disabled={!text.trim()}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
        
        {text.trim() && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-2 flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground"
          >
            <Plus className="h-4 w-4" />
            <span>اضغط Enter أو انقر على الأيقونة لإضافة المهمة</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
