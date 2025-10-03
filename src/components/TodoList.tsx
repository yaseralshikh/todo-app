'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Todo, FilterType } from '@/lib/types';
import { TodoItem } from './TodoItem';
import { CheckSquare, ListTodo } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList({ todos, filter, onToggleTodo, onEditTodo, onDeleteTodo }: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4"
          >
            <ListTodo className="h-8 w-8 text-muted-foreground" />
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            لا توجد مهام بعد
          </h3>
          <p className="text-muted-foreground">
            ابدأ بإضافة مهمة جديدة لتنظيم يومك
          </p>
        </div>
      </motion.div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4"
          >
            <CheckSquare className="h-8 w-8 text-muted-foreground" />
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {filter === 'active' ? 'لا توجد مهام نشطة' : 'لا توجد مهام مكتملة'}
          </h3>
          <p className="text-muted-foreground">
            {filter === 'active' 
              ? 'جميع مهامك مكتملة! 🎉' 
              : 'ابدأ بإضافة مهام جديدة'}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onEdit={onEditTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
