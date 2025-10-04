'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Todo, TodoState, TodoAction, FilterType } from '@/lib/types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
        case 'ADD_TODO':
          const newTodo: Todo = action.payload.todo || {
            id: action.payload.text.replace(/\s+/g, '_') + '_' + Math.random().toString(36).substr(2, 9),
            text: action.payload.text,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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
                ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
                : todo
            ),
          };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, updatedAt: new Date().toISOString() }
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
  const { user, token } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchTodos = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await fetch('/api/todos', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const todos = await response.json();
        dispatch({ type: 'LOAD_TODOS', payload: { todos } });
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [token]);

  // Load todos from API when user is logged in
  useEffect(() => {
    if (user && token) {
      fetchTodos();
    }
  }, [user, token, fetchTodos]);

  const addTodo = async (text: string) => {
    if (!token) return;
    
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      
      if (response.ok) {
        const newTodo = await response.json();
        dispatch({ type: 'ADD_TODO', payload: { text: newTodo.text, todo: newTodo } });
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    if (!token) return;
    
    const todo = state.todos.find(t => t.id === id);
    if (!todo) return;
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          text: todo.text, 
          completed: !todo.completed 
        }),
      });
      
      if (response.ok) {
        dispatch({ type: 'TOGGLE_TODO', payload: { id } });
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const editTodo = async (id: string, text: string) => {
    if (!token) return;
    
    const todo = state.todos.find(t => t.id === id);
    if (!todo) return;
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          text, 
          completed: todo.completed 
        }),
      });
      
      if (response.ok) {
        dispatch({ type: 'EDIT_TODO', payload: { id, text } });
      }
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!token) return;
    
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        dispatch({ type: 'DELETE_TODO', payload: { id } });
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: { filter } });
  };

  const clearCompleted = async () => {
    if (!token) return;
    
    const completedTodos = state.todos.filter(todo => todo.completed);
    
    try {
      // Delete all completed todos
      await Promise.all(
        completedTodos.map(todo => 
          fetch(`/api/todos/${todo.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
        )
      );
      
      dispatch({ type: 'CLEAR_COMPLETED' });
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
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
