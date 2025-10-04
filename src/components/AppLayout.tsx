'use client';

import { motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodoInput } from './TodoInput';
import { FilterTabs } from './FilterTabs';
import { TodoList } from './TodoList';
import { Todo, FilterType } from '@/lib/types';

interface AppLayoutProps {
  todos: Todo[];
  filter: FilterType;
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
  onFilterChange: (filter: FilterType) => void;
}

export function AppLayout({
  todos,
  filter,
  onAddTodo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  onFilterChange,
}: AppLayoutProps) {
  const todoCounts = {
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 flex flex-col"
    >
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Glass morphism main container */}
          <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              <TodoInput onAddTodo={onAddTodo} />
              
              {todos.length > 0 && (
                <FilterTabs
                  activeFilter={filter}
                  onFilterChange={onFilterChange}
                  todoCounts={todoCounts}
                />
              )}
              
              <TodoList
                todos={todos}
                filter={filter}
                onToggleTodo={onToggleTodo}
                onEditTodo={onEditTodo}
                onDeleteTodo={onDeleteTodo}
              />
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </motion.div>
  );
}
