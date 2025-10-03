'use client';

import { motion } from 'framer-motion';
import { Header } from './Header';
import { TodoInput } from './TodoInput';
import { FilterTabs } from './FilterTabs';
import { TodoList } from './TodoList';
import { Todo, FilterType } from '@/lib/types';

interface AppLayoutProps {
  todos: Todo[];
  filter: FilterType;
  onAddTodo: (todo: Todo) => void;
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
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto py-8">
        <Header />
        
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
  );
}
