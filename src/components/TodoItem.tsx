'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Edit2, Trash2, X, Save } from 'lucide-react';
import { Todo } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { ClientOnly } from './ClientOnly';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      transition={{ duration: 0.3 }}
      className="group bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start space-x-3 rtl:space-x-reverse">
        {/* Checkbox */}
        <motion.button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-primary-500 border-primary-500 text-white'
              : 'border-muted-foreground hover:border-primary-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence>
            {todo.completed && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 px-3 py-1 text-right bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  dir="rtl"
                  autoFocus
                />
                <motion.button
                  onClick={handleEdit}
                  className="p-1 text-primary-500 hover:bg-primary-50 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Save className="h-4 w-4" />
                </motion.button>
                <motion.button
                  onClick={handleCancel}
                  className="p-1 text-muted-foreground hover:bg-muted rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p
                  className={`text-right ${
                    todo.completed
                      ? 'line-through text-muted-foreground'
                      : 'text-foreground'
                  }`}
                  dir="rtl"
                >
                  {todo.text}
                </p>
                <ClientOnly fallback={<p className="text-xs text-muted-foreground mt-1">--</p>}>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(todo.updatedAt)}
                  </p>
                </ClientOnly>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <AnimatePresence>
          {!isEditing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-1 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <motion.button
                onClick={() => setIsEditing(true)}
                className="p-1 text-muted-foreground hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit2 className="h-4 w-4" />
              </motion.button>
              <motion.button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
