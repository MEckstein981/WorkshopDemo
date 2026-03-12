import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/Todo';

const API_BASE = 'http://localhost:5062/api/todos';

export async function fetchTodos(isDone?: boolean): Promise<Todo[]> {
  const url = isDone !== undefined
    ? `${API_BASE}?isDone=${isDone}`
    : API_BASE;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Fehler beim Laden der Todos');
  return response.json();
}

export async function fetchTodoById(id: number): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error('Todo nicht gefunden');
  return response.json();
}

export async function createTodo(request: CreateTodoRequest): Promise<Todo> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error('Fehler beim Erstellen');
  return response.json();
}

export async function updateTodo(id: number, request: UpdateTodoRequest): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error('Fehler beim Aktualisieren');
  return response.json();
}

export async function markTodoDone(id: number): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}/done`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Fehler beim Markieren');
  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Fehler beim Löschen');
}
