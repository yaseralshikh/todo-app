'use client';

import { AppLayout } from '@/components/AppLayout';
import { useTodos } from '@/hooks/useTodos';

export default function Home() {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    setFilter,
  } = useTodos();

  return (
    <AppLayout
      todos={todos}
      filter={filter}
      onAddTodo={addTodo}
      onToggleTodo={toggleTodo}
      onEditTodo={editTodo}
      onDeleteTodo={deleteTodo}
      onFilterChange={setFilter}
    />
  );
}
