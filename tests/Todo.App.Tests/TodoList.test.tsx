import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TodoList } from '@app/components/TodoList';
import { Todo } from '@app/types/Todo';

const mockTodos: Todo[] = [
  {
    id: 1,
    title: 'Test Todo 1',
    description: 'Beschreibung 1',
    isDone: false,
    priority: 'High',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Test Todo 2',
    isDone: true,
    priority: 'Low',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

describe('TodoList', () => {
  it('renders all todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        onMarkDone={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('shows empty state when no todos', () => {
    render(
      <TodoList
        todos={[]}
        onMarkDone={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );

    expect(screen.getByText('Keine Todos vorhanden.')).toBeInTheDocument();
  });

  it('renders todo descriptions', () => {
    render(
      <TodoList
        todos={mockTodos}
        onMarkDone={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );

    expect(screen.getByText('Beschreibung 1')).toBeInTheDocument();
  });
});
