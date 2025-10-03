'use client';

import { useReducer, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Todo, TodoState, TodoAction, FilterType } from '@/lib/types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: Math.random().toString(36).substr(2, 9),
        text: action.payload.text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        todos: [newTodo, ...state.todos],
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        ),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, updatedAt: new Date() }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter,
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload.todos,
      };

    default:
      return state;
  }
}

export function useTodos() {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>('todos', []);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from localStorage on mount
  useEffect(() => {
    if (storedTodos.length > 0) {
      dispatch({ type: 'LOAD_TODOS', payload: { todos: storedTodos } });
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (state.todos.length > 0 || storedTodos.length > 0) {
      setStoredTodos(state.todos);
    }
  }, [state.todos, setStoredTodos]);

  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: { text } });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  const editTodo = (id: string, text: string) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: { filter } });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return {
    todos: state.todos,
    filter: state.filter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
  };
}
