import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from './types/Todo';
import * as todoApi from './services/todoApi';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoFilter } from './components/TodoFilter';
import './App.css';

export type FilterStatus = 'all' | 'open' | 'done';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const isDone = filter === 'all' ? undefined : filter === 'done';
      const data = await todoApi.fetchTodos(isDone);
      setTodos(data);
    } catch {
      setError('Fehler beim Laden der Todos.');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleCreate = async (request: CreateTodoRequest) => {
    try {
      await todoApi.createTodo(request);
      await loadTodos();
    } catch {
      setError('Fehler beim Erstellen des Todos.');
    }
  };

  const handleUpdate = async (id: number, request: UpdateTodoRequest) => {
    try {
      await todoApi.updateTodo(id, request);
      setEditingTodo(null);
      await loadTodos();
    } catch {
      setError('Fehler beim Aktualisieren des Todos.');
    }
  };

  const handleMarkDone = async (id: number) => {
    try {
      await todoApi.markTodoDone(id);
      await loadTodos();
    } catch {
      setError('Fehler beim Markieren als erledigt.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      await loadTodos();
    } catch {
      setError('Fehler beim Löschen des Todos.');
    }
  };

  return (
    <div className="app">
      <h1>📝 Todo App</h1>

      <TodoForm
        onSubmit={editingTodo
          ? (req) => handleUpdate(editingTodo.id, req)
          : handleCreate}
        editingTodo={editingTodo}
        onCancelEdit={() => setEditingTodo(null)}
      />

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Laden...</div>}

      {!loading && (
        <TodoList
          todos={todos}
          onMarkDone={handleMarkDone}
          onDelete={handleDelete}
          onEdit={setEditingTodo}
        />
      )}
    </div>
  );
}

export default App;
