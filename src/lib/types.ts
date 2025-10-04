export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string; todo?: Todo } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: FilterType } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'LOAD_TODOS'; payload: { todos: Todo[] } };
